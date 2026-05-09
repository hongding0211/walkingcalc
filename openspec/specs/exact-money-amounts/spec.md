# exact-money-amounts Specification

## Purpose

TBD - created by archiving change use-exact-money-amounts. Update Purpose after archive.

## Requirements

### Requirement: Canonical exact money fields

The system SHALL use decimal integer strings in minor units as the canonical representation for Walkcalc money amounts.

#### Scenario: Persisting a new record

- **WHEN** a Walkcalc record is created or updated with a money amount
- **THEN** the system SHALL persist the amount as `paidMinor`
- **AND** the system SHALL NOT use a floating-point field as the canonical persisted amount

#### Scenario: Returning records and groups

- **WHEN** the backend returns Walkcalc records, group members, or temporary users
- **THEN** the response SHALL include exact money fields for paid amounts, debts, and costs
- **AND** those fields SHALL be decimal integer strings in minor units

#### Scenario: Supporting negative balances

- **WHEN** a participant owes money
- **THEN** the participant debt SHALL be represented as a signed decimal integer string in minor units

### Requirement: Reject invalid money input

The system SHALL reject money input that cannot be represented exactly at the current two-decimal currency scale.

#### Scenario: Sub-cent decimal input

- **WHEN** a user or API client submits a value such as `0.0001`
- **THEN** the system SHALL reject the value before persistence
- **AND** the system SHALL NOT round the value silently

#### Scenario: Non-finite numeric input

- **WHEN** a user or API client submits `NaN`, `Infinity`, exponential notation, an empty value, or a non-numeric value for money
- **THEN** the system SHALL reject the value before persistence

#### Scenario: Out-of-range input

- **WHEN** a user or API client submits a money value outside the configured Walkcalc money range
- **THEN** the system SHALL reject the value before persistence

#### Scenario: Zero record amount

- **WHEN** a user or API client creates or updates a normal record with zero paid amount
- **THEN** the system SHALL reject the request

### Requirement: Exact balance arithmetic

The system SHALL apply record balances, costs, and debt resolution with exact integer arithmetic.

#### Scenario: Applying a record

- **WHEN** a record is applied to a group
- **THEN** the payer debt, participant debts, and participant costs SHALL be updated using exact minor-unit integer arithmetic
- **AND** the sum of participant debts SHALL remain exactly zero

#### Scenario: Reversing a record

- **WHEN** a record is deleted or replaced during update
- **THEN** the system SHALL reverse the previous balance impact exactly
- **AND** no sub-cent residual balance SHALL remain

#### Scenario: Uneven split

- **WHEN** a paid amount cannot be divided evenly among the selected participants
- **THEN** the system SHALL split in whole minor units
- **AND** the system SHALL distribute the remainder deterministically using the stable participant order

### Requirement: Exact debt resolution calculation

The WalkingCalc client SHALL calculate displayed settlement transfers from exact participant balances.

#### Scenario: Resolving displayed debts

- **WHEN** the client calculates the debt detail transfer list
- **THEN** every transfer amount SHALL be an exact minor-unit integer string
- **AND** the transfer list SHALL NOT include zero or sub-cent amounts

#### Scenario: Balances already settled

- **WHEN** all participant debts are exactly zero
- **THEN** the client SHALL produce no settlement transfers

### Requirement: Legacy money migration

The system SHALL migrate existing Walkcalc numeric money fields to canonical exact money fields without silently changing values.

#### Scenario: Migrating integer-cent legacy data

- **WHEN** a legacy numeric money field is finite and represents an integer number of minor units
- **THEN** the migration SHALL copy it into the corresponding exact money field as a decimal integer string

#### Scenario: Detecting invalid legacy data

- **WHEN** a legacy numeric money field is non-finite or contains a fractional minor unit
- **THEN** the migration SHALL report the affected group and field
- **AND** the migration SHALL NOT silently round or discard the invalid value

#### Scenario: Reading during migration

- **WHEN** exact money fields exist alongside legacy numeric fields
- **THEN** the system SHALL treat exact money fields as the source of truth
- **AND** any legacy response fields SHALL be derived from exact values
