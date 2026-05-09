## Why

Resolving all debts currently submits one record per settlement from the client. When multiple record writes hit the same group concurrently, later saves can overwrite earlier balance updates, so "resolve all" may only resolve one debt.

This should be a backend-owned operation because "resolve all debts for this group" is a single domain action that needs atomic balance and record persistence.

## What Changes

- Add a backend API for bulk debt resolution that accepts the group identifier and a list of settlement transfers.
- Apply all settlement transfers in one authorized backend operation so balances and created debt-resolution records are persisted together.
- Update WalkingCalc to call the bulk endpoint for "resolve all debts" instead of firing multiple create-record requests.
- Keep single-debt resolution behavior available for individual settlement actions.
- Return the created debt-resolution records so the client can refresh from a consistent backend result.

## Capabilities

### New Capabilities

- `bulk-debt-resolution`: Backend-supported group debt resolution that records multiple settlement transfers atomically and updates the client to use that operation.

### Modified Capabilities

## Impact

- Companion backend project `hong97-ltd-next`: new walkcalc records endpoint, DTOs, service method, and service/controller tests.
- WalkingCalc client: new API constant/type/service hook and `resolve all debts` flow update.
- No database schema change is expected because settlement entries remain regular debt-resolution records.
