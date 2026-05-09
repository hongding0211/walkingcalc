## ADDED Requirements

### Requirement: Mobile API refreshes expired access tokens

The WalkingCalc mobile client SHALL attempt to refresh the access token when an authenticated API request fails because the access token is expired or unauthorized.

#### Scenario: Refresh succeeds

- **WHEN** an authenticated WalkingCalc API request receives an unauthorized response and `POST /auth/refreshToken` succeeds
- **THEN** the app SHALL persist the returned access token
- **THEN** the app SHALL retry the original API request once with the new access token
- **THEN** the user SHALL remain logged in

#### Scenario: Refresh fails

- **WHEN** an authenticated WalkingCalc API request receives an unauthorized response and `POST /auth/refreshToken` fails
- **THEN** the app SHALL clear the stored access token
- **THEN** the app SHALL clear current user data
- **THEN** the user SHALL be treated as logged out

### Requirement: Refresh requests do not loop indefinitely

The WalkingCalc mobile client MUST NOT repeatedly refresh and retry the same request after a refresh attempt has already been made for that request.

#### Scenario: Retried request remains unauthorized

- **WHEN** the app refreshes an access token and retries the original request
- **THEN** if the retried request is still unauthorized, the app SHALL clear login state instead of attempting another refresh for that request

### Requirement: SSO login enables refreshable mobile sessions

The SSO login flow SHALL leave the mobile client with the credentials needed to call the existing hong97-ltd-next refresh endpoint after the access token expires.

#### Scenario: User signs in through SSO

- **WHEN** a user completes SSO login in WalkingCalc
- **THEN** the app SHALL store the returned access token
- **THEN** the refresh credentials issued by hong97-ltd-next SHALL be available to `POST /auth/refreshToken`
