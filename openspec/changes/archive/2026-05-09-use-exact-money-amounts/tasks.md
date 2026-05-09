## 1. Exact Money Foundation

- [x] 1.1 Add backend money helpers for validating minor-unit strings, parsing two-decimal display strings, converting legacy integer-cent numbers, formatting display values, and performing `BigInt` arithmetic.
- [x] 1.2 Add WalkingCalc client money helpers with the same scale, range, parsing, formatting, comparison, and split behavior.
- [x] 1.3 Define exact money TypeScript aliases/types for `paidMinor`, `amountMinor`, `debtMinor`, and `costMinor` in backend DTOs and WalkingCalc API types.

## 2. Backend Persistence and Migration

- [x] 2.1 Extend the hong97-ltd-next Walkcalc Mongoose schema with exact money fields for records, members, and temporary users while retaining legacy numeric fields for migration compatibility.
- [x] 2.2 Add a backfill script for existing Walkcalc groups that copies finite integer-cent legacy values into exact money fields and reports fractional or non-finite legacy values.
- [x] 2.3 Update backend response mapping to use exact fields as the source of truth and derive any temporary legacy numeric response fields from exact values.
- [x] 2.4 Add migration/backfill tests for valid integer-cent data, fractional minor-unit data, non-finite values, and exact-field precedence.

## 3. Backend Money Logic

- [x] 3.1 Update record create/update/drop flows to validate exact request fields and apply/reverse balances using `BigInt` minor-unit arithmetic.
- [x] 3.2 Implement deterministic whole-cent split and remainder allocation for multi-participant records.
- [x] 3.3 Update bulk debt resolution DTOs and service logic to accept exact `amountMinor` transfer values and reject zero, negative, sub-cent, malformed, and out-of-range amounts.
- [x] 3.4 Add backend regression tests for `0.0001` rejection, uneven splits, deletion reversal, large values beyond `Number.MAX_SAFE_INTEGER`, and group debt sum invariants.

## 4. WalkingCalc Client Integration

- [x] 4.1 Update WalkingCalc API interfaces and hooks to send and consume exact money fields for records, groups, balances, and bulk debt-resolution transfers.
- [x] 4.2 Replace numeric amount parsing/formatting in the record form, group views, item cards, settings, debt detail, and home summary with exact money helpers.
- [x] 4.3 Rewrite client debt resolution calculation to operate on exact `debtMinor` values and return exact `amountMinor` transfers.
- [x] 4.4 Add client-side validation and user-facing errors for more than two decimal places, empty input, zero record amount, and out-of-range values.

## 5. Verification and Rollout

- [x] 5.1 Run backend unit/regression tests for the Walkcalc module in hong97-ltd-next.
- [x] 5.2 Run WalkingCalc TypeScript/lint checks and targeted tests for money helpers and debt calculation.
- [x] 5.3 Manually verify add record, update record, delete record, resolve single debt, and resolve all debts with normal, large, and uneven-split amounts.
- [x] 5.4 Document the temporary compatibility window and final cleanup step for removing legacy numeric money fields after updated clients are deployed.
