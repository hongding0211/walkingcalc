## Context

WalkingCalc already has a `ThemeContext` that exposes the current light/dark scheme, with the provider created in `App.tsx` from React Native's `useColorScheme()`. Color constants live in `constants/Colors.ts`, while primary accent usage is currently spread across shared controls and screens as `Color.Primary`.

The app already depends on `@react-native-async-storage/async-storage`, so local preference persistence can be implemented without adding a new dependency. The settings screen has a commented general section for theme/language, which is the natural place to expose a theme color selector.

## Goals / Non-Goals

**Goals:**

- Provide a fixed list of named theme color choices.
- Persist the selected theme color locally and restore it during app startup.
- Extend `ThemeContext` so components can consume the active theme color and update it.
- Add a settings UI for selecting the theme color with immediate visual feedback.
- Preserve the current device-driven light/dark scheme behavior.

**Non-Goals:**

- Do not sync theme color to the backend or hong97 profile.
- Do not add arbitrary custom color input.
- Do not replace the entire color system in one broad refactor.
- Do not change language, SSO, group, or record behavior.

## Decisions

1. Store a named color id rather than a raw hex value.

   The app should define a typed palette such as `blue`, `green`, `rose`, and `gold` in `constants/Colors.ts` or `feature/theme`. The persisted value should be the color id. This keeps storage stable if a hex value is later tuned and avoids accepting unsupported colors.

   Alternative considered: persist raw hex values. This is more flexible but makes validation and future palette changes messier than needed for a controlled theme feature.

2. Use AsyncStorage for local persistence.

   The existing dependency is the standard Expo/RN choice for simple device-local key/value state. Use a versioned key such as `walkingcalc.themeColor` and fall back to the default theme color if the stored value is missing or no longer supported.

   Alternative considered: Redux persistence. The app does not currently have a persisted Redux setup, and adding one would be heavier than this preference needs.

3. Introduce a real theme provider wrapper.

   Move the provider value assembly out of inline `App.tsx` into a dedicated `ThemeProvider` or hook that:

   - reads `useColorScheme()`;
   - loads the stored theme color on mount;
   - exposes `scheme`, `themeColor`, `primaryColor`, `themeColorOptions`, `setThemeColor`;
   - writes changes back to AsyncStorage.

   This keeps `App.tsx` small and gives shared components one consistent context contract.

4. Update high-signal accent consumers first.

   Shared controls such as `Button`, `Radio`, `Checkbox`, `Tag`, and the settings selector should consume `theme.primaryColor`. Screen-specific `Color.Primary` usages can be converted where they represent primary actions, selected state, or navigational accent. Non-accent semantic colors such as danger/success remain unchanged.

   Alternative considered: mutate `Color.Primary` dynamically. The existing enum-like constants are static TypeScript values, so context-based consumption is clearer and safer.

## Risks / Trade-offs

- Stored value becomes invalid after palette changes -> Validate on load and fall back to the default color id.
- AsyncStorage read is asynchronous -> Render with the default color immediately, then update after hydration; avoid blocking splash longer than necessary for a cosmetic preference.
- Some hard-coded accent usages may remain after the first implementation -> Prioritize shared components and visible settings/home/group actions, then use `rg "Color.Primary"` to identify follow-up replacements.
- Context type changes can break consumers -> Extend the context with backward-compatible `scheme` while adding new fields, then update TypeScript declarations and consumers together.
