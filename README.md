# bookmarq

## Prereqs

```
npm install -g hasura-cli
```

## Initial Setup

> Make sure you don't have any other docker apps running that use port `8080` or Postgres's `5432`

```
docker compose up -d
sleep 3
hasura migrate apply --database-name default
hasura metadata apply
```

### Github Auth

Create a new Github App (not an OAuth App)

```
Profile -> Settings -> Developer Settings -> Github Apps
```

1. Add the following callback uri and check "Request user authorization (OAuth)
   ```
   https://localhost:3000/api/auth-callback
   ```
2. Uncheck the "refresh token" stuff so that the access token won't expire.
   - You don't have to do this, but if you don't you'll have to build your own refresh token logic.
3. Under Webhook, uncheck the "Active"
4. Once the Github App is created, generate a client secret and add `AUTH_CLIENT_ID` and `AUTH_CLIENT_SECRET` to `.env`

```
AUTH_CLIENT_ID=Iv1.3398960ed4796aa7
AUTH_CLIENT_SECRET=SHHHHH
```

## Running Local

Start running app

```
npm run dev
```

To start creating tables, open Hasura console with:

```
hasura console
```

## Environment Variables

- Locally assumes you have a `.env` file setup
- On the server you can access them with `getEnvVar(key)`
- Anything prefixed with `PUBLIC_` will be available on the client with `useEnvVars()` or `useEnvVar(key)`
- Also uses `zod` schemas to validate you environment variables so the app crashes right away with a helpful error message.

## Hasura Migrations

### Squash migrations

```
hasura migrate squash --database-name default --name "<feature-name>" --from <start-migration-version>
```

### Apply Migrations

```
hasura metadata apply --endpoint https://YOUR-APP.up.railway.app --admin-secret YOUR_SECRET
hasura migrate apply --endpoint https://YOUR-APP.up.railway.app --database-name default --admin-secret YOUR_SECRET --version <squashed-migration>
hasura metadata reload --endpoint https://YOUR-APP.up.railway.app --admin-secret YOUR_SECRET
```

## Tech Stack

- Remix
- React
- Styling
  - Tailwind
  - Tailwind Forms
  - Tailwind Typography
  - DaisyUI
- Auth
  - Github authentication
  - Hasura authorization
- GraphQL API
  - Hasura generated API
  - Typesafety w/ GraphQL Codegen
- Utility libraries
  - dayjs
  - zod
