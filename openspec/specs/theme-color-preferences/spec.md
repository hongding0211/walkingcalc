# theme-color-preferences Specification

## Purpose

TBD - created by archiving change add-theme-color-preferences. Update Purpose after archive.

## Requirements

### Requirement: Provide selectable theme colors

The system SHALL provide a fixed list of supported app theme color options and expose the currently selected option to the WalkingCalc UI.

#### Scenario: Default theme color

- **WHEN** the app starts without a stored theme color preference
- **THEN** the system SHALL use the default theme color option
- **AND** the default theme color SHALL match the app's current primary color

#### Scenario: Theme color options are available

- **WHEN** the settings screen renders the theme color selector
- **THEN** the system SHALL display multiple supported theme color options
- **AND** each option SHALL have a stable id, display label, and color value

#### Scenario: Selecting a theme color

- **WHEN** the user selects a supported theme color option
- **THEN** the system SHALL update the active theme color immediately
- **AND** themed UI elements that use the primary accent color SHALL reflect the selected color

### Requirement: Persist theme color locally

The system SHALL persist the selected theme color preference locally on the device and restore it on later app launches.

#### Scenario: Restore stored preference

- **WHEN** the app starts and a supported theme color id is stored locally
- **THEN** the system SHALL restore that theme color as the active theme color

#### Scenario: Ignore unsupported stored preference

- **WHEN** the app starts and the stored theme color id is missing from the supported options
- **THEN** the system SHALL ignore the unsupported value
- **AND** the system SHALL use the default theme color option

#### Scenario: Preference remains local

- **WHEN** the user changes the theme color
- **THEN** the system SHALL store the preference locally on the device
- **AND** the system SHALL NOT require a backend, SSO, or profile update request

### Requirement: Preserve light and dark scheme behavior

The system SHALL keep the existing device-driven light/dark scheme behavior while applying the selected theme color as the app accent color.

#### Scenario: Device scheme changes

- **WHEN** the device light/dark scheme changes
- **THEN** the system SHALL continue to update the app scheme from the device setting
- **AND** the selected theme color SHALL remain unchanged
