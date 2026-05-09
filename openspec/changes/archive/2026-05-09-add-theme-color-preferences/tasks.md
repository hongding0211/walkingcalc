## 1. Theme Model

- [x] 1.1 Define supported theme color ids, labels, and hex values with the current blue primary color as the default option.
- [x] 1.2 Extend the theme TypeScript types to include selected theme color id, active primary color, available options, and a setter function.
- [x] 1.3 Add a validation helper that returns the default option when a stored theme color id is unsupported.

## 2. Persistence And Provider

- [x] 2.1 Create a theme provider or provider hook that combines the device light/dark scheme with theme color state.
- [x] 2.2 Load the stored theme color id from AsyncStorage on startup and apply it when valid.
- [x] 2.3 Persist supported theme color changes to AsyncStorage when the user selects a new option.
- [x] 2.4 Replace the inline `ThemeContext.Provider` value in `App.tsx` with the new provider implementation.

## 3. Settings UI

- [x] 3.1 Add localized settings labels for theme color selection in English and Chinese.
- [x] 3.2 Add a settings section that displays the available theme color options as selectable swatches or rows.
- [x] 3.3 Mark the active theme color visibly and update the provider when the user chooses a different option.

## 4. Accent Color Consumers

- [x] 4.1 Update shared primary controls such as Button, Radio, Checkbox, and Tag to use the active theme primary color.
- [x] 4.2 Replace screen-level `Color.Primary` usages that represent primary actions or selected states with the theme primary color.
- [x] 4.3 Keep semantic colors such as danger, success, and light/dark background tokens unchanged.

## 5. Verification

- [x] 5.1 Verify a first launch uses the default blue theme color.
- [x] 5.2 Verify selecting another theme color updates visible primary accents immediately.
- [x] 5.3 Verify restarting/reloading the app restores the locally stored theme color.
- [x] 5.4 Run TypeScript/lint verification available for the Expo project and fix any type or lint failures.
