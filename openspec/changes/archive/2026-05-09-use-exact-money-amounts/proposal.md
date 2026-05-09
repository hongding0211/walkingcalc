## Why

WalkingCalc currently treats bill amounts, balances, and settlement amounts as JavaScript numbers, which allows binary floating-point drift and sub-cent values such as `0.0001` to enter billing flows. Money needs an exact representation so records, splits, debt resolution, storage, and display all agree without hidden rounding.

## What Changes

- Introduce an exact money amount contract for WalkingCalc: the canonical persisted and wire representation is a base-10 integer string in minor units, using cents for the current currency scale.
- Replace floating-point amount arithmetic in record balance application, debt calculation, debt resolution, formatting, and parsing with exact integer arithmetic.
- Validate user and API inputs before persistence, rejecting non-finite values, more than two fractional digits, zero record amounts, non-positive settlement amounts, and amounts outside the supported range.
- Define deterministic split behavior when a record amount cannot be divided evenly by participants, keeping all balances integer cents and ensuring the group balance sum remains zero.
- Add migration and compatibility handling so existing numeric cent data can be converted into canonical exact fields without losing existing records.
- **BREAKING**: New or updated WalkingCalc API contracts SHALL use exact amount fields instead of accepting float-like decimal numbers for money.

## Capabilities

### New Capabilities

- `exact-money-amounts`: Defines exact money representation, validation, arithmetic, migration, and display behavior for WalkingCalc billing data.

### Modified Capabilities

- `bulk-debt-resolution`: Settlement transfer amounts use the exact money amount contract and must not allow float/sub-cent values.

## Impact

- WalkingCalc client amount parsing/formatting utilities, record forms, group balances, debt detail, and debt resolution submission.
- hong97-ltd-next Walkcalc backend DTOs, Mongoose schema, balance application logic, response DTOs, tests, and data migration/backfill.
- API consumers must use exact minor-unit amount fields for bill, debt, cost, and settlement values.
