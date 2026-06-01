# Evivi Mobile

Expo React Native scaffold for the Evivi mobile frontend.

The temporary Home and Marketplace starter screens have been removed. This app is intentionally a thin shell until the final frontend design and flows are supplied.

## Run

```powershell
npm install
npm run start
```

For web preview:

```powershell
npm run web
```

Use `EXPO_PUBLIC_API_URL` from `.env.example` to point the frontend at the backend API.

## Frontend Foundations

- `src/lib/api-client.ts`: Axios client using `EXPO_PUBLIC_API_URL`.
- `src/store/app-store.ts`: Zustand app/session store.
- `src/lib/secure-storage.ts`: Secure token storage helpers.
- `src/lib/device-storage.ts`: MMKV preference/cache helpers.
- `src/lib/telemetry.ts`: no-op Sentry/Mixpanel wrapper until keys are available.
- `eas.json`: EAS build profiles for development, preview, and production.
