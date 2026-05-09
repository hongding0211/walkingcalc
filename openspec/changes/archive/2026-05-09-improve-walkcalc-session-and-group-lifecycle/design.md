## Context

WalkingCalc signs in through the hong97-ltd-next SSO page and currently keeps only the returned access token in mobile storage. hong97-ltd-next already has refresh-session support through `/auth/refreshToken`, but the mobile request hooks do not use it, so an expired access token becomes an immediate logout.

Walkcalc group codes are currently derived from a monotonically increasing index. That preserves legacy behavior, but it makes codes predictable and ties code generation to a read-latest-index flow. Group dismissal also hard-deletes the group document, including embedded records, which is risky for a ledger-style app where accidental deletion is costly.

## Goals / Non-Goals

**Goals:**

- Refresh mobile access tokens automatically before forcing logout.
- Generate non-enumerable 4-character group codes with collision retry.
- Preserve dismissed group data by soft-deleting owner-dismissed groups.
- Keep existing mobile routes and backend route shapes unless a change is necessary.
- Coordinate changes across WalkingCalc and the hong97-ltd-next Walkcalc/auth modules.

**Non-Goals:**

- Changing exact-money behavior, amount fields, or debt calculation.
- Reworking member invitation, member removal, or archive semantics.
- Changing global guard ordering or rate-limit behavior.
- Building a full trash/recovery UI for deleted groups in this change.
- Migrating historical deterministic group codes to new random codes.

## Decisions

### Reuse the existing refresh endpoint

Decision: the mobile API layer will call hong97-ltd-next `POST /auth/refreshToken` once when an authenticated request receives `401` or `403`, then retry the original request with the returned access token. If refresh fails, the app clears login state.

Rationale: hong97-ltd-next already owns refresh sessions, refresh rotation, and cookie issuance. The mobile app should reuse that contract instead of inventing a WalkingCalc-specific auth endpoint.

Alternative considered: pass a long-lived refresh token in the SSO redirect hash. That would make native refresh independent of cookies, but it exposes a stronger credential to app storage and duplicates the current server auth model.

### Keep refresh credentials cookie-backed

Decision: the SSO WebView and request hooks will be adjusted so the refresh cookie set by hong97-ltd-next can be used by the mobile refresh request. The app still persists the access token because it is needed for bearer auth across API calls.

Rationale: this keeps the refresh token out of JavaScript-managed storage and aligns mobile behavior with the web auth flow. Implementation must verify cookie sharing in the Expo iOS runtime used by `yarn dev:ios`.

Alternative considered: store both access and refresh tokens in AsyncStorage. That is simpler mechanically but increases exposure if device storage is compromised.

### Generate group codes randomly and retry on collision

Decision: replace the index-derived group-code algorithm with a random 4-character uppercase base36 code. The backend will rely on the existing unique `code` index and retry bounded attempts when Mongo reports a duplicate key or when a generated candidate already exists.

Rationale: random codes are less enumerable and remove the latest-index read from the critical path. Four base36 characters provide 1,679,616 possible codes; collision retry is required because random generation cannot guarantee uniqueness.

Alternative considered: increase code length. That would improve entropy but changes the product-facing join code shape. The user explicitly wants random four-character IDs.

### Soft-delete groups on owner dismissal

Decision: owner dismissal marks a group as deleted instead of deleting the document. Normal Walkcalc group and record queries will filter out deleted groups. Deleted groups retain members, temporary users, records, balances, and timestamps for possible future recovery or manual support.

Rationale: hard deletion is risky for financial history. A soft-delete flag gives data safety without adding a visible recovery feature yet.

Alternative considered: archive the group for every member. Archive is a user-level visibility preference, while dismissal is an owner-level lifecycle action; mixing them would make recovery and authorization ambiguous.

### Keep deleted groups inaccessible through normal flows

Decision: joins by code, group detail, record listing, record mutation, invite, temp-user creation, archive/unarchive, rename, and owner dismiss operations all treat deleted groups as unavailable.

Rationale: once dismissed, a group should not quietly keep accepting new records or members. The data remains in storage, but normal app behavior should act as if it is gone.

Alternative considered: allow owners to access deleted groups privately. That implies a recovery/trash UX, which is out of scope for this change.

## Risks / Trade-offs

- Refresh cookie sharing may differ between WebView and native fetch on iOS -> verify on Expo iOS; if cookie sharing is unreliable, add a narrowly scoped app session exchange in a follow-up proposal.
- Random 4-character codes can collide -> enforce a unique index and retry with a clear failure after bounded attempts.
- Existing deterministic `idx` may become obsolete -> keep it only if needed for legacy data compatibility; new code generation should not depend on it.
- Soft-deleted data continues to occupy storage -> acceptable because groups are capped by embedded record limits and recovery value is high.
- Deleted-group filtering must be consistent -> centralize active-group filters in the Walkcalc service and test all read/mutation entry points.

## Migration Plan

1. Add soft-delete fields to Walkcalc group documents with defaults that keep existing groups active.
2. Change group creation to generate random codes and stop depending on the latest `idx` algorithm for new groups.
3. Change owner dismissal to set deletion metadata instead of deleting the group document.
4. Update active-group filters across Walkcalc service methods.
5. Add mobile refresh request support and single retry behavior in the shared fetch/mutation layer.
6. Verify SSO login, token expiry refresh, refresh failure logout, group creation, group dismiss, and deleted-group exclusion.

Rollback: random group code generation can return to the old generator while keeping existing random codes valid. Soft-deleted groups can be made visible again by clearing deletion metadata. Mobile refresh can be disabled by falling back to current logout-on-401 behavior.

## Open Questions

- Should a future recovery UI exist for owners, or should recovery remain an administrative/manual operation?
- Should deleted groups eventually expire after a retention window, or be retained indefinitely?
