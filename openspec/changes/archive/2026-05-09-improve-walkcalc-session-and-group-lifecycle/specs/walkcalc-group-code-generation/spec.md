## ADDED Requirements

### Requirement: Groups receive random four-character codes

The hong97-ltd-next Walkcalc backend SHALL assign each newly created group a random 4-character uppercase base36 code.

#### Scenario: Group is created

- **WHEN** an authenticated user creates a Walkcalc group
- **THEN** the returned group code SHALL contain exactly 4 characters
- **THEN** every character SHALL be an uppercase base36 character
- **THEN** the code SHALL be generated randomly instead of derived from a monotonically increasing group index

### Requirement: Group code collisions are handled safely

The hong97-ltd-next Walkcalc backend SHALL ensure generated group codes are unique before group creation succeeds.

#### Scenario: Random code collides with an existing group

- **WHEN** the generated group code already exists
- **THEN** the backend SHALL retry with a new random code
- **THEN** the backend SHALL NOT create a group with a duplicate code

#### Scenario: Collision retries are exhausted

- **WHEN** the backend cannot generate a unique code within the configured retry limit
- **THEN** group creation SHALL fail with a structured error
- **THEN** no partial group document SHALL be persisted

### Requirement: Existing group codes remain valid

The system SHALL continue to accept existing group codes that were created before random code generation.

#### Scenario: User opens an existing group

- **WHEN** a member opens a group created by the previous code generator
- **THEN** the group SHALL resolve by its existing code
- **THEN** the group code SHALL NOT be regenerated
