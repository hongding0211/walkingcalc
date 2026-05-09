## MODIFIED Requirements

### Requirement: Validate bulk debt-resolution transfers

The system SHALL validate every settlement transfer before persisting a bulk debt-resolution request.

#### Scenario: Invalid participant

- **WHEN** a submitted transfer references a payer or receiver that is not a member or temporary user in the group
- **THEN** the system SHALL reject the request

#### Scenario: Invalid amount

- **WHEN** a submitted transfer has an amount less than or equal to zero
- **THEN** the system SHALL reject the request

#### Scenario: Sub-cent amount

- **WHEN** a submitted transfer amount cannot be represented exactly at the current two-decimal currency scale
- **THEN** the system SHALL reject the request
- **AND** the system SHALL NOT persist any records or balance changes from that request

#### Scenario: Empty transfer list

- **WHEN** a submitted bulk debt-resolution request contains no transfers
- **THEN** the system SHALL reject the request

### Requirement: Client uses backend bulk operation for resolve all

The WalkingCalc client SHALL call the backend bulk debt-resolution operation when the user confirms resolving all displayed debts.

#### Scenario: Resolve all confirmation

- **WHEN** the user confirms resolve all debts from the debt detail view
- **THEN** the client SHALL send the displayed settlement transfers in one bulk debt-resolution request
- **AND** each submitted transfer amount SHALL use the exact money amount contract
- **AND** the client SHALL refresh group and record data after the request succeeds

#### Scenario: Individual debt resolution unchanged

- **WHEN** the user resolves a single displayed debt
- **THEN** the client SHALL keep using the single-record settlement flow
