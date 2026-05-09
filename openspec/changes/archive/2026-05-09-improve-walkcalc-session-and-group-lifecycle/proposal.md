## Why

WalkingCalc mobile sessions currently depend on a short-lived access token without a refresh path, so users can be logged out during normal app usage. Walkcalc groups also use deterministic join codes and hard deletion, which makes group IDs enumerable and leaves no recovery path for accidental group dismissal.

## What Changes

- Add a WalkingCalc client refresh-token flow that retries API requests after refreshing an expired access token.
- Add random 4-character group code generation in the hong97-ltd-next Walkcalc backend, backed by unique indexes and bounded collision retry.
- Replace owner group dismissal with soft deletion in the hong97-ltd-next Walkcalc backend.
- Exclude soft-deleted groups from normal group, record, join, archive, rename, invite, and temp-user flows.
- Preserve existing route shapes where practical so the mobile app can adopt the behavior without a broad navigation rewrite.

## Capabilities

### New Capabilities

- `walkingcalc-session-refresh`: Mobile client session renewal using the existing hong97-ltd-next auth refresh endpoint.
- `walkcalc-group-code-generation`: Non-enumerable random 4-character group code creation with collision handling.
- `walkcalc-group-soft-deletion`: Owner-only group dismissal that hides groups without physically deleting records.

### Modified Capabilities

None.

## Impact

- WalkingCalc app request hooks, token storage, and login/session state.
- hong97-ltd-next auth refresh integration from the mobile client.
- hong97-ltd-next Walkcalc group schema, group creation, group lookup filters, and owner dismissal behavior.
- Backend tests for group code generation, deleted-group exclusion, and soft-delete behavior.
- Client tests or targeted verification for automatic token refresh and logout fallback.
