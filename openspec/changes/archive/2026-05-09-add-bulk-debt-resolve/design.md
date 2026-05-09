## Context

WalkingCalc computes a settlement plan in the client debt detail screen and currently resolves all debts by creating one debt-resolution record per transfer. The companion backend stores records inside the walkcalc group document and updates member/temp-user balances when records are added. Multiple concurrent create-record requests can load the same group state and save competing group snapshots, leaving only one settlement effectively applied.

The existing single-record endpoint remains useful for normal expense records and individual settlement actions, but "resolve all debts" needs backend-owned batch semantics.

## Goals / Non-Goals

**Goals:**

- Provide one authenticated backend endpoint for resolving multiple settlement transfers for a group.
- Persist all settlement records and balance updates through one service operation.
- Preserve the existing debt-resolution record shape so record history stays compatible.
- Update the mobile client so the resolve-all button calls the bulk endpoint once.
- Cover the behavior with backend service/controller tests and client request mapping tests where available.

**Non-Goals:**

- Replace the client settlement algorithm in `utils/debt.ts`.
- Change how normal records or single-debt resolution are created.
- Add a new database collection or alter the group schema.
- Merge multiple settlements into one synthetic record.

## Decisions

1. Add a dedicated endpoint for bulk debt resolution.

Use a route such as `POST /walkcalc/records/resolve-debts` with a body containing `groupCode` and `transfers`. Each transfer includes `from`, `to`, and `amount`. This gives the client one domain-specific operation instead of making it coordinate multiple generic record writes.

Alternative considered: make the client submit existing record-create requests sequentially. That avoids the immediate race but still leaves atomicity, validation, and partial-failure semantics in the wrong layer.

2. Keep settlement entries as regular debt-resolution records.

For each transfer, the backend creates a record equivalent to today's single settlement record: payer in `who`, receiver in `forWhom`, `paid` equal to the amount, type/text set to debt resolve, and `isDebtResolve: true`. This keeps list rendering, delete reversal behavior, and immutable debt-resolution semantics aligned with existing records.

Alternative considered: introduce a parent batch record. That would require new rendering and reversal rules and is unnecessary for fixing the consistency bug.

3. Apply all transfer balance changes before one save.

The service should load the group once inside the existing optional transaction helper, validate membership and positive non-zero transfer amounts, apply `applyRecordBalance` for each generated record, push all records, update `modifiedAt`, and save the group once. If any transfer is invalid, the operation must fail without persisting a partial batch.

Alternative considered: call `addRecord` from inside the new service method. That would keep logic reused but still performs repeated loads/saves and makes partial success harder to reason about.

4. Let the client continue generating the reviewed settlement plan.

The debt detail modal already displays the exact transfers users are confirming. The client should submit that same list to the new endpoint. The backend validates identities and amounts but does not need to recompute the plan from balances for this change.

Alternative considered: backend computes the whole settlement plan from current balances. That is a good future hardening option, but it would require extra API shape decisions and could make the confirmed UI diverge from the executed plan.

## Risks / Trade-offs

- Stale client settlement plans could be submitted after another record changes balances -> Backend still applies valid transfers, so the group may not end exactly at zero if the plan was stale. Mitigation: refresh group data after success, and consider a future server-computed mode or balance version precondition.
- Large batches could create many records in one request -> Settlement plans are naturally bounded by participant count and the existing 5,000-record group limit still applies. Validate that `records.length + transfers.length` does not exceed the limit.
- API now spans two local repos -> Keep the OpenSpec tasks explicit about changes in both `hong97-ltd-next` and `walkingcalc`.

## Migration Plan

1. Implement the backend endpoint and tests in `hong97-ltd-next`.
2. Add the WalkingCalc client API mapping and service hook.
3. Switch resolve-all to call the bulk endpoint once and refresh the group/record list after success.
4. Keep the existing single-record debt resolution flow unchanged for individual settlement taps.
5. Rollback is safe by reverting the client to the existing single-record path while keeping the backend endpoint unused.

## Open Questions

- Should the endpoint reject a stale plan by checking that each transfer still matches current balances, or is accepting reviewed transfers sufficient for the first fix?
