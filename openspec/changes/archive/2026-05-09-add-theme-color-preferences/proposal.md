## Why

WalkingCalc currently follows the device light/dark scheme but does not let users personalize the app's accent color. Adding a small set of selectable theme colors makes the app feel more personal while keeping the design controlled and consistent.

The selected color also needs to survive app restarts, so the preference should be stored locally on the device rather than depending on any backend profile change.

## What Changes

- Add a configurable theme color preference with a fixed set of supported color options.
- Persist the selected theme color locally with Expo/React Native storage so the choice is restored on launch.
- Extend the existing theme context so app UI can read the active theme color alongside the current light/dark scheme.
- Add a settings entry that lets users select the theme color and immediately see the selection reflected in themed UI.
- Keep the current device light/dark scheme behavior unchanged.

## Capabilities

### New Capabilities

- `theme-color-preferences`: User-selectable app accent color options and local persistence behavior.

### Modified Capabilities

- None.

## Impact

- Affected code: `feature/theme/*`, `constants/Colors.ts`, `App.tsx`, `screens/settings/index.tsx`, and any themed shared components that currently hard-code `Color.Primary`.
- Storage: use existing `@react-native-async-storage/async-storage`; no new backend API, schema, or SSO/profile dependency.
- UI: settings screen gains a theme color selector; themed controls should consume the active theme color where appropriate.
