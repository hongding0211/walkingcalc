# Agent Notes

## Related Local Projects

- `hong97-ltd-next`: sibling/local companion repository
  - This is the companion web/backend project used by WalkingCalc for SSO and profile editing.
  - Frontend dev server: `http://<LAN_IP>:3000`
  - Backend dev server: `http://<LAN_IP>:3500`
  - WalkingCalc SSO login opens `http://<LAN_IP>:3000/sso/login`.
  - WalkingCalc profile editing opens `http://<LAN_IP>:3000/sso/profile`.
  - The old profile route `/sso/my` is obsolete; use `/sso/profile`.
  - For local mobile/WebView access, hong97 frontend API calls should use `/api` so requests stay on the same origin and Next proxies to the backend.

## WalkingCalc Local Dev

- Use `yarn dev:ios` for Expo iOS development.
- The script auto-detects the LAN IP, sets hong97 web to port `3000`, WalkingCalc API to port `3500`, and starts Expo on port `8081`.
