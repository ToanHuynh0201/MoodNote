# Environment Variables Setup - Completed ✅

## Summary

Environment variables have been successfully set up for your MoodNote project! The system now supports development, preview, and production environments with proper secret management.

## What Was Done

### ✅ Core Setup
1. **Installed dotenv** package for loading environment variables
2. **Created environment files**:
   - `.env` - Local development (default)
   - `.env.development` - Development builds
   - `.env.preview` - Preview/staging builds
   - `.env.production` - Production builds
   - `.env.example` - Template for team (committed to git)

3. **Updated `.gitignore`** to exclude sensitive .env files

### ✅ Configuration
4. **Created `app.config.ts`** - Dynamic Expo configuration that:
   - Loads environment variables at build time
   - Sets different bundle IDs per environment
   - Shows environment name in app title for non-production
   - Exposes env vars through expo-constants

5. **Deleted `app.json`** - Replaced by dynamic app.config.ts

6. **Updated `eas.json`** with environment-specific build configurations

### ✅ Type-Safe Utilities
7. **Created `src/types/env.ts`** - TypeScript type definitions for all env vars
8. **Updated `src/types/index.ts`** - Exports env types
9. **Created `src/config/env.ts`** - Centralized environment utility with methods:
   - `env.get('API_URL')` - Get specific variable
   - `env.getAll()` - Get all variables
   - `env.isDevelopment()` - Check environment
   - `env.isFeatureEnabled('ENABLE_ANALYTICS')` - Check feature flags
   - `env.printConfig()` - Debug configuration

### ✅ API Integration
10. **Created `src/config/api.ts`** - Axios instance with:
    - Automatic environment-based configuration
    - Bearer token injection
    - Request/response logging (in dev)
    - Error handling

11. **Updated `src/constants/index.ts`** - Exports auth constants

### ✅ Validation
12. **Created `src/config/validateEnv.ts`** - Validates environment configuration
13. **Updated `src/app/_layout.tsx`** - Runs validation on app startup (dev only)

### ✅ Documentation
14. **Created `docs/ENVIRONMENT_SETUP.md`** - Comprehensive guide covering:
    - Quick start instructions
    - Available variables
    - Usage examples
    - Building for different environments
    - EAS Secrets setup
    - Troubleshooting

15. **Updated `README.md`** - Added environment setup section

### ✅ Build Scripts
16. **Updated `package.json`** with convenient commands:
    - `npm start` - Start development server
    - `npm run start:clear` - Start with cleared cache
    - `npm run build:dev` - Build for development
    - `npm run build:preview` - Build for preview
    - `npm run build:prod` - Build for production

## Available Environment Variables

All variables use the `EXPO_PUBLIC_` prefix (required by Expo):

### API Configuration
- `EXPO_PUBLIC_API_URL` - Backend API URL
- `EXPO_PUBLIC_API_TIMEOUT` - Request timeout (default: 30000ms)

### App Configuration
- `EXPO_PUBLIC_APP_ENV` - Environment (development/preview/production)
- `EXPO_PUBLIC_ENABLE_LOGGING` - Enable console logging

### Feature Flags
- `EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN` - Enable social login
- `EXPO_PUBLIC_ENABLE_ANALYTICS` - Enable analytics

### OAuth Services
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `EXPO_PUBLIC_FACEBOOK_APP_ID` - Facebook app ID

## Quick Start

1. **Configure your local environment:**
   ```bash
   # The .env file is already created with default values
   # Edit it with your actual configuration
   code .env
   ```

2. **Start development:**
   ```bash
   npm start
   ```

   You should see environment validation output in the console.

3. **Using environment variables in code:**
   ```typescript
   import { env } from '@/config/env';

   // Get API URL
   const apiUrl = env.get('API_URL');

   // Check environment
   if (env.isDevelopment()) {
     console.log('Dev mode');
   }

   // Check feature flag
   if (env.isFeatureEnabled('ENABLE_ANALYTICS')) {
     // Track analytics
   }
   ```

4. **Using the API client:**
   ```typescript
   import api from '@/config/api';

   // API calls automatically use configured URL and add auth tokens
   const response = await api.post('/auth/login', {
     email: 'user@example.com',
     password: 'password',
   });
   ```

## Important Notes

### For Development
- **Android Emulator**: Use `10.0.2.2` instead of `localhost` in `EXPO_PUBLIC_API_URL`
- **iOS Simulator**: Use `localhost` is fine
- **Physical Device**: Use your machine's IP address (e.g., `192.168.1.100`)

### For Production
When ready to deploy:

1. **Set up EAS Secrets** (never commit production credentials):
   ```bash
   eas secret:create --scope project \
     --name EXPO_PUBLIC_API_URL \
     --value https://api.moodnote.com/api \
     --type string
   ```

2. **Build for production:**
   ```bash
   npm run build:prod
   ```

### Environment Variables Are Build-Time
- Changes to `.env` require rebuilding the app
- To clear cache: `npm run start:clear`
- To rebuild: `npm run build:dev` (or appropriate environment)

## File Structure

```
MoodNote/
├── .env                          # Local development (not committed)
├── .env.development              # Development builds (not committed)
├── .env.preview                  # Preview builds (not committed)
├── .env.production               # Production builds (not committed)
├── .env.example                  # Template (committed)
├── app.config.ts                 # Dynamic Expo config
├── eas.json                      # EAS build config (updated)
├── docs/
│   └── ENVIRONMENT_SETUP.md      # Full documentation
└── src/
    ├── config/
    │   ├── env.ts                # Environment utility
    │   ├── api.ts                # API client
    │   └── validateEnv.ts        # Validation utility
    └── types/
        └── env.ts                # TypeScript types
```

## Next Steps

1. ✅ **Environment variables are set up** - You're all done!

2. **Update API URL** in `.env` when you have a backend:
   ```env
   EXPO_PUBLIC_API_URL=http://your-backend-url/api
   ```

3. **Use the API client** in your login/register screens:
   ```typescript
   import api from '@/config/api';

   // In your login handler
   const response = await api.post('/auth/login', { email, password });
   ```

4. **Add OAuth credentials** when you set up social login:
   - Get Google Client ID from Google Cloud Console
   - Get Facebook App ID from Facebook Developers
   - Update `.env` with the IDs

5. **Set up EAS Secrets** before production deployment

## Troubleshooting

If you encounter issues, see the [full troubleshooting guide](./docs/ENVIRONMENT_SETUP.md#troubleshooting).

Common issues:
- **Variables not updating**: Run `npm run start:clear`
- **API connection fails**: Check if using correct IP/hostname for your device
- **TypeScript errors**: Restart TypeScript server in your IDE

## Need Help?

- Read the full guide: [docs/ENVIRONMENT_SETUP.md](./docs/ENVIRONMENT_SETUP.md)
- Check Expo docs: https://docs.expo.dev/guides/environment-variables/
- Check EAS docs: https://docs.expo.dev/build-reference/variables/

---

**Setup completed successfully! Your app is now ready to use environment variables across all deployment environments.** 🎉
