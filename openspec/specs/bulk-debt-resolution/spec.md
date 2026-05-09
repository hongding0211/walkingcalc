# bulk-debt-resolution Specification

## Purpose

Define the backend-owned bulk debt resolution behavior used by WalkingCalc to resolve all displayed group settlements in one consistent operation.

## Requirements

### Requirement: Resolve multiple group debts in one backend operation

The system SHALL provide an authenticated backend operation that resolves multiple settlement transfers for one walkcalc group in a single request.

#### Scenario: Successful bulk debt resolution

- **WHEN** a group owner or member submits a valid group code and multiple settlement transfers
- **THEN** the system SHALL create one debt-resolution record for each transfer
- **AND** the system SHALL apply all corresponding member and temporary-user balance updates
- **AND** the system SHALL return the created records

#### Scenario: No partial persistence

- **WHEN** any transfer in a bulk debt-resolution request is invalid
- **THEN** the system SHALL reject the request
- **AND** the system SHALL NOT persist any records or balance changes from that request

#### Scenario: Record limit enforcement

- **WHEN** the number of existing records plus requested settlement transfers would exceed the group record limit
- **THEN** the system SHALL reject the request
- **AND** the system SHALL NOT persist any records or balance changes from that request

### Requirement: Validate bulk debt-resolution transfers

The system SHALL validate every settlement transfer before persisting a bulk debt-resolution request.

#### Scenario: Invalid participant

- **WHEN** a submitted transfer references a payer or receiver that is not a member or temporary user in the group
- **THEN** the system SHALL reject the request

#### Scenario: Invalid amount

- **WHEN** a submitted transfer has an amount less than or equal to zero
- **THEN** the system SHALL reject the request

#### Scenario: Empty transfer list

- **WHEN** a submitted bulk debt-resolution request contains no transfers
- **THEN** the system SHALL reject the request

### Requirement: Client uses backend bulk operation for resolve all

The WalkingCalc client SHALL call the backend bulk debt-resolution operation when the user confirms resolving all displayed debts.

#### Scenario: Resolve all confirmation

- **WHEN** the user confirms resolve all debts from the debt detail view
- **THEN** the client SHALL send the displayed settlement transfers in one bulk debt-resolution request
- **AND** the client SHALL refresh group and record data after the request succeeds

#### Scenario: Individual debt resolution unchanged

- **WHEN** the user resolves a single displayed debt
- **THEN** the client SHALL keep using the single-record settlement flow
