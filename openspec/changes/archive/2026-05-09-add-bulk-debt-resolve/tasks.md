## 1. Backend API

- [x] 1.1 Add bulk debt-resolution request DTOs in `hong97-ltd-next` with `groupCode` and transfer items containing `from`, `to`, and positive `amount`.
- [x] 1.2 Add a `POST /walkcalc/records/resolve-debts` controller route protected by the existing walkcalc auth flow.
- [x] 1.3 Implement a walkcalc service method that loads the group once, validates all transfers, enforces the record limit, creates debt-resolution records, applies all balances, and saves once inside the existing optional transaction helper.
- [x] 1.4 Return the created record DTOs from the bulk operation.

## 2. Backend Tests

- [x] 2.1 Add service coverage for successful multi-transfer resolution across members and temporary users.
- [x] 2.2 Add service coverage proving invalid transfer batches do not partially mutate records or balances.
- [x] 2.3 Add coverage for empty transfer lists, non-positive amounts, invalid participants, and record-limit rejection.
- [x] 2.4 Add controller/DTO coverage for the new route shape if the backend test pattern supports it.

## 3. WalkingCalc Client

- [x] 3.1 Add the new API constant, request/response types, request preparation, and response normalization for bulk debt resolution.
- [x] 3.2 Add a record service hook for the bulk debt-resolution endpoint.
- [x] 3.3 Update the debt detail resolve-all flow to submit the displayed settlement transfers through the bulk endpoint once.
- [x] 3.4 Keep individual debt resolution on the existing single-record flow.

## 4. Verification

- [x] 4.1 Run relevant backend tests in `hong97-ltd-next`.
- [x] 4.2 Run WalkingCalc lint or type checks available in this repo.
- [ ] 4.3 Manually verify a group with at least three unsettled participants resolves all displayed debts after one confirm action.
