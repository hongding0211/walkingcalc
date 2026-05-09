## 1. Backend Random Group Codes

- [x] 1.1 Replace the hong97-ltd-next Walkcalc group-code generator with a random 4-character uppercase base36 generator.
- [x] 1.2 Update Walkcalc group creation to use the random generator and bounded collision retry.
- [x] 1.3 Keep existing group codes valid and avoid regenerating codes for persisted groups.
- [x] 1.4 Add backend tests for code format, random generation, collision retry, and exhausted retry failure.

## 2. Backend Soft Group Deletion

- [x] 2.1 Extend the hong97-ltd-next Walkcalc group schema with soft-delete metadata and active defaults for existing groups.
- [x] 2.2 Change owner group dismissal from hard delete to setting soft-delete metadata.
- [x] 2.3 Centralize active-group filtering so normal group reads and lists exclude soft-deleted groups.
- [x] 2.4 Apply active-group filtering to join, archive, unarchive, rename, invite, temp-user creation, record reads, record listing, record create, record update, record drop, and debt resolution.
- [x] 2.5 Add backend tests proving deleted groups retain history but are hidden and reject normal mutations.

## 3. Mobile Session Refresh

- [x] 3.1 Add a WalkingCalc auth refresh API constant and request helper for `POST /auth/refreshToken`.
- [x] 3.2 Update the SSO WebView login flow so hong97 refresh credentials are available to native refresh requests after login.
- [x] 3.3 Update the shared fetch and mutation hooks to refresh once on unauthorized responses before clearing login state.
- [x] 3.4 Persist refreshed access tokens and retry the original request with the refreshed token.
- [x] 3.5 Ensure refresh failure, missing refresh credentials, and retry-after-refresh unauthorized responses clear login state without infinite loops.

## 4. Client Integration

- [x] 4.1 Keep existing WalkingCalc screen-level calls compatible with the refreshed request hooks.
- [x] 4.2 Verify group create, group dismiss, group list, group detail, join by code, and record operations use the backend behavior without route changes.
- [x] 4.3 Surface existing user-facing failure toasts when refresh or deleted-group access fails.

## 5. Verification

- [x] 5.1 Run targeted hong97-ltd-next Walkcalc backend tests.
- [x] 5.2 Run hong97-ltd-next server typecheck or build checks relevant to Walkcalc/auth changes.
- [x] 5.3 Run WalkingCalc TypeScript/lint checks relevant to service hooks and SSO screens.
- [x] 5.4 Manually verify Expo iOS SSO login, access-token refresh, refresh failure logout, random group creation, soft group dismissal, and deleted-group exclusion.
