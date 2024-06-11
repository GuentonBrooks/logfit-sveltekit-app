# logfit-sveltekit-app

Logfit Crossfit Application

## About

This Application was developed free of charge for [Crossfit Willemstad](crossfitwillemstad.com)

## Demo Site

[Live Site](https://logfitwillemstad.netlify.app)

### Tools

- [x] SvelteKit
- [x] TypeScript
- [x] Tailwind CSS
- [x] Firebase - Google Auth Provider
- [x] Firebase - Email Auth Provider
- [x] Firebase - Real-Time Database
- [x] Google Analytics

## Pre-requisites

- Enable **Google Sign-In** in the Firebase console:

  - In the [Firebase console](https://console.firebase.google.com/), open the **Auth** section.
  - On the Sign in method tab, enable the **Google sign-in** method and click **Save**.

- Add the Firebase configuration in the following format in the **.env** file at the root of the project:
- These details are available on the [Firebase console](https://console.firebase.google.com/) -> Project -> Project Settings

```
PUBLIC_API_KEY=<FIREBASE_API_KEY>
PUBLIC_AUTH_DOMAIN=<FIREBASE_AUTH_DOMAIN>
PUBLIC_PROJECT_ID=<FIREBASE_PROJECT_ID>
PUBLIC_STORAGE_BUCKET=<FIREBASE_STORAGE_BUCKET>
PUBLIC_MESSAGING_SENDER_ID=<FIREBASE_MESSAGING_SENDER_ID>
PUBLIC_APP_ID=<FIREBASE_APP_ID>
PUBLIC_MEASUREMENT_ID=<PUBLIC_MEASUREMENT_ID>
PUBLIC_DATABASE_URL=<PUBLIC_DATABASE_URL>
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Known Issues

- Slow auto navigation (cannot handle firebase auth session server-side)
