# Environment Variables Setup Guide

## Overview

This project uses environment variables to manage configuration across different deployment environments (development, preview, production).

## Quick Start

### 1. Initial Setup

```bash
# Copy the example environment file
cp .env.example .env

# Install dependencies (if not already done)
npm install
```

### 2. Configure Your Environment

Edit `.env` and replace placeholder values with your actual configuration:

- `EXPO_PUBLIC_API_URL`: Your backend API URL
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `EXPO_PUBLIC_FACEBOOK_APP_ID`: Facebook app ID

### 3. Start Development

```bash
# Start with development profile
npm start

# Or build for device
eas build --profile development
```

## Environment Files

| File | Purpose | Committed to Git |
|------|---------|------------------|
| `.env.example` | Template for team members | Yes ✓ |
| `.env` | Local development (default) | No ✗ |
| `.env.development` | Development builds | No ✗ |
| `.env.preview` | Preview/staging builds | No ✗ |
| `.env.production` | Production builds | No ✗ |

## Available Variables

### API Configuration
- `EXPO_PUBLIC_API_URL`: Backend API base URL
- `EXPO_PUBLIC_API_TIMEOUT`: API request timeout in milliseconds

### App Configuration
- `EXPO_PUBLIC_APP_ENV`: Current environment (development/preview/production)
- `EXPO_PUBLIC_ENABLE_LOGGING`: Enable console logging

### Feature Flags
- `EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN`: Enable social login buttons
- `EXPO_PUBLIC_ENABLE_ANALYTICS`: Enable analytics tracking

### Third-party Services
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `EXPO_PUBLIC_FACEBOOK_APP_ID`: Facebook app ID

## Usage in Code

### Import the env utility

```typescript
import { env } from '@/config/env';
```

### Get environment variables

```typescript
// Get specific variable
const apiUrl = env.get('API_URL');
const timeout = env.get('API_TIMEOUT');

// Get all variables
const config = env.getAll();
```

### Check environment

```typescript
if (env.isDevelopment()) {
  console.log('Running in development mode');
}

if (env.isProduction()) {
  // Production-only code
}
```

### Check feature flags

```typescript
if (env.isFeatureEnabled('ENABLE_ANALYTICS')) {
  // Track analytics
}
```

### Using the API client

```typescript
import api from '@/config/api';

// Make API calls - environment variables are automatically applied
const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password',
});
```

## Building for Different Environments

### Development Build
```bash
eas build --profile development --platform android
```
Uses `.env.development`

### Preview Build
```bash
eas build --profile preview --platform android
```
Uses `.env.preview`

### Production Build
```bash
eas build --profile production --platform android
```
Uses `.env.production` + EAS Secrets

## EAS Secrets (Production Only)

For production, use EAS Secrets to securely manage sensitive data:

### Create a secret
```bash
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.moodnote.com/api --type string
```

### List secrets
```bash
eas secret:list
```

### Delete a secret
```bash
eas secret:delete --name EXPO_PUBLIC_API_URL
```

### Why use secrets?
- Encrypted storage on EAS servers
- Never stored in version control
- Team members can't accidentally expose them
- Easy rotation without code changes

## Important Notes

1. **EXPO_PUBLIC_ Prefix**: All variables accessible in client code must start with `EXPO_PUBLIC_`

2. **Build-Time vs Runtime**: Environment variables are embedded at build time, not runtime. Changing .env requires rebuilding.

3. **Android Emulator**: Use `10.0.2.2` instead of `localhost` for Android emulator to access host machine.

4. **iOS Simulator**: Use `localhost` for iOS simulator.

5. **Never Commit Secrets**: Always keep `.env` files in `.gitignore` except `.env.example`.

## Troubleshooting

### Variables not updating

**Solutions:**
1. Clear Expo cache: `npx expo start --clear`
2. Rebuild the app: `eas build --profile development --clear-cache`
3. Verify .env file is in project root
4. Check variable has EXPO_PUBLIC_ prefix

### API calls failing with localhost

**For Android Emulator:**
- Use `10.0.2.2` instead of `localhost`
- Example: `http://10.0.2.2:3000/api`

**For iOS Simulator:**
- Use `localhost` or your machine's IP
- Example: `http://localhost:3000/api`

**For Physical Device:**
- Use your machine's network IP
- Example: `http://192.168.1.100:3000/api`

### Build fails with dotenv error

**Solutions:**
1. Ensure dotenv is installed: `npm install --save-dev dotenv`
2. Check `app.config.ts` has `import 'dotenv/config';` at top
3. Verify .env file syntax (no spaces around =)

### TypeScript errors with env types

**Solutions:**
1. Restart TypeScript server in your IDE
2. Check `src/types/env.ts` is properly exported
3. Verify `tsconfig.json` includes src directory

## Security Best Practices

1. Never commit `.env` files (except `.env.example`)
2. Use different credentials for each environment
3. Rotate production secrets regularly
4. Use EAS Secrets for production
5. Limit access to production secrets to necessary team members
6. Review `.env.example` before committing to ensure no secrets leaked

## Team Workflow

### New Team Member Setup
1. Clone repository
2. Copy `.env.example` to `.env`
3. Ask team lead for development credentials
4. Install dependencies: `npm install`
5. Start development: `npm start`

### Adding New Environment Variables
1. Add to `.env.example` with placeholder value
2. Add to all environment files (`.env`, `.env.development`, etc.)
3. Update `src/types/env.ts` with new type
4. Update `src/config/env.ts` to parse new variable
5. Update `app.config.ts` to expose in `extra.env`
6. Update this documentation
7. Notify team to update their local `.env` files

## References

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [EAS Secrets](https://docs.expo.dev/build-reference/variables/)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
