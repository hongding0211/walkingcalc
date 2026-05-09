## ADDED Requirements

### Requirement: Owner dismissal soft-deletes groups

The hong97-ltd-next Walkcalc backend SHALL soft-delete a group when its owner dismisses it.

#### Scenario: Owner dismisses a group

- **WHEN** the group owner dismisses a Walkcalc group
- **THEN** the backend SHALL mark the group as deleted
- **THEN** the backend SHALL retain the group's records, members, temporary users, balances, and historical timestamps
- **THEN** the operation SHALL return success using the existing structured response format

#### Scenario: Non-owner attempts to dismiss a group

- **WHEN** a group member who is not the owner attempts to dismiss the group
- **THEN** the backend SHALL reject the request
- **THEN** the group SHALL remain active

### Requirement: Deleted groups are hidden from normal group flows

The system SHALL exclude soft-deleted groups from normal WalkingCalc group reads and lists.

#### Scenario: User lists groups

- **WHEN** a user requests their Walkcalc groups
- **THEN** soft-deleted groups SHALL NOT appear in the response

#### Scenario: User opens a deleted group

- **WHEN** a user requests group detail for a soft-deleted group
- **THEN** the backend SHALL respond as if the group is unavailable or inaccessible

### Requirement: Deleted groups reject normal mutations

The hong97-ltd-next Walkcalc backend SHALL reject normal member, group, archive, and record mutations for soft-deleted groups.

#### Scenario: User joins a deleted group by code

- **WHEN** a user attempts to join a soft-deleted group by code
- **THEN** the backend SHALL reject the request
- **THEN** the user SHALL NOT be added as a member

#### Scenario: Member mutates a deleted group

- **WHEN** a member attempts to add, update, delete, or resolve records in a soft-deleted group
- **THEN** the backend SHALL reject the request
- **THEN** the retained group history SHALL remain unchanged

#### Scenario: Owner mutates deleted group settings

- **WHEN** the owner attempts to rename, archive, unarchive, invite users, or add temporary users to a soft-deleted group
- **THEN** the backend SHALL reject the request
- **THEN** the retained group history SHALL remain unchanged
