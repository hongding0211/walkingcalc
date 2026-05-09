## Context

WalkingCalc currently stores Walkcalc record amounts and participant balances as `number` values in the hong97-ltd-next Mongo/Mongoose model. The client also parses display input with numeric multiplication and performs debt resolution with floating-point arithmetic. Although most existing values behave like cents, the system still accepts float-shaped values such as `0.0001`, can create sub-cent debt through division, and can lose precision if values exceed JavaScript's safe integer range.

The companion backend owns persistence and balance application. The WalkingCalc app owns user input, display formatting, local debt calculation, and the resolve-all payload. The change must cover both sides or exact storage will be undermined by float payloads at the boundary.

## Goals / Non-Goals

**Goals:**

- Make every persisted Walkcalc money value exact and auditable.
- Reject sub-cent user/API input such as `0.0001` instead of rounding silently.
- Keep group balances, record splits, and debt resolution internally consistent with integer-cent arithmetic.
- Provide a clear migration path from existing numeric cent fields.
- Make frontend display and backend validation use the same scale and range rules.

**Non-Goals:**

- Supporting currencies with non-cent minor units in this change.
- Introducing exchange rates, multi-currency groups, or historical currency metadata.
- Changing non-money numeric fields such as timestamps, pagination, coordinates, and counters.
- Rewriting unrelated group, auth, or SSO flows.

## Decisions

### Canonical amount representation

Persist and exchange Walkcalc money as decimal integer strings in minor units:

- `paidMinor` for record payment amounts.
- `amountMinor` for settlement transfer amounts.
- `debtMinor` and `costMinor` for participant balances.

Examples: `12.34` is `"1234"`, `0.01` is `"1"`, `-5.00` is `"-500"`. The current currency scale is fixed at 2 decimal places.

Rationale: integer minor units prevent decimal fractions from entering storage, while strings avoid JavaScript safe-integer overflow and preserve exact values through JSON and Mongo. Using Mongo `Number` would still be a double. Using Mongo `Decimal128` would preserve decimals but would still require scale validation everywhere and is less convenient in React Native.

### Arithmetic model

Use `BigInt` in domain helpers and backend balance application. Convert to numbers only for UI concerns that are not persisted or used for money arithmetic, and prefer strings for display.

Rationale: `BigInt` gives exact integer operations and makes accidental fractional arithmetic impossible. `decimal.js` is viable, but integer cents plus `BigInt` is simpler and makes sub-cent rejection explicit.

### User input and API validation

The client SHALL parse money from strings only. Valid display input MUST match the current scale: optional sign, digits, and at most two fractional digits. Inputs such as `0.0001`, `NaN`, `Infinity`, exponential notation, empty strings, and values outside the configured maximum SHALL be rejected.

The backend SHALL validate exact money fields independently, even if the client already validated them. Requests that include legacy numeric fields during migration must be accepted only when those numbers are finite integer cents and inside range.

Rationale: the server is the trust boundary. Client validation improves UX, but it cannot protect persisted data.

### Deterministic split behavior

When a paid amount does not divide evenly among `forWhom`, split in whole cents:

1. Calculate `base = paidMinor / participantCount`.
2. Calculate `remainder = paidMinor % participantCount`.
3. Apply `base` to every participant.
4. Distribute one extra cent, preserving the sign of the amount, to the first `abs(remainder)` participants in the stable `forWhom` order.

The payer receives the full `paidMinor`. This keeps the sum of all participant debts at exactly zero and avoids sub-cent balances.

Rationale: current floating division can create repeating decimals. Deterministic remainder allocation is transparent, stable, and easy to test.

### Compatibility shape

During migration, responses can include legacy numeric `paid`, `debt`, and `cost` fields derived from exact fields only for old clients. New client code SHALL consume exact fields. New writes SHALL use `paidMinor` and `amountMinor`.

Rationale: this allows backend and mobile rollout to be staged while ensuring the canonical source of truth is exact.

## Risks / Trade-offs

- Existing records may contain non-integer numeric cent values → Backfill must detect and report these records instead of guessing; remediation can either round manually or reject deployment until fixed.
- Remainder distribution can assign one cent differently than previous float math → The rule is deterministic and should be visible in tests; this is preferable to invisible sub-cent debt.
- API field rename is breaking for old clients → Keep a temporary derived response and optional integer-cent legacy request adapter while the mobile app is updated.
- BigInt is not JSON serializable → Convert `BigInt` to and from decimal strings at every API/storage boundary.
- Mixed old/new fields could drift during rollout → Prefer exact fields as source of truth and derive legacy fields on read; do not write both independently.

## Migration Plan

1. Add shared money helpers on the backend and client for parse, format, validation, comparison, addition, subtraction, split, and legacy conversion.
2. Extend backend schema and DTOs with exact fields while retaining legacy numeric fields for read/backfill compatibility.
3. Backfill all Walkcalc groups:
   - `members[].debt` to `members[].debtMinor`.
   - `members[].cost` to `members[].costMinor`.
   - `tempUsers[].debt` to `tempUsers[].debtMinor`.
   - `tempUsers[].cost` to `tempUsers[].costMinor`.
   - `records[].paid` to `records[].paidMinor`.
   - Abort and report records whose legacy values are not finite integer cents.
4. Update backend write paths to validate exact fields and apply balances with `BigInt`.
5. Update WalkingCalc client types, forms, display, debt calculation, and resolve-all payloads to use exact fields.
6. Add regression tests for `0.0001`, large values beyond safe integer range, uneven splits, debt resolution, deletion reversal, and migration rejection.
7. After all active clients are updated, remove legacy write support and then remove legacy numeric fields from responses.

Rollback: keep legacy numeric fields untouched until the final cleanup. If rollout fails before cleanup, disable exact writes and continue serving legacy fields from the existing data.

## Open Questions

- What practical maximum amount per record should be enforced for product UX? The technical representation supports very large values, but a product cap gives better error messages and prevents accidental huge bills.
- Should the UI display two fixed decimals everywhere, or preserve the existing compact `.0` display style while still storing cents exactly?
