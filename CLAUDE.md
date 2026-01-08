# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MoodNote is a React Native mobile application built with Expo and TypeScript. The app uses file-based routing (Expo Router) and follows a purple-themed design system focused on mood tracking and emotional well-being.

## Environment Setup

Before starting development:

```bash
# Copy environment configuration
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

Environment variables are prefixed with `EXPO_PUBLIC_` to be accessible in client code. Configuration is accessed through `@/config/env` utilities.

## Development Commands

```bash
# Development
npm start              # Start Expo dev server
npm run start:dev      # Same as above
npm run start:clear    # Start with cleared cache
npm run lint           # Run ESLint

# Platform-specific
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS simulator
npm run web            # Run in web browser

# Building (requires EAS CLI)
npm run build:dev              # Development build for Android
npm run build:dev:ios          # Development build for iOS
npm run build:preview          # Preview build (APK) for Android
npm run build:preview:ios      # Preview build for iOS
npm run build:prod             # Production build for Android
npm run build:prod:ios         # Production build for iOS
```

## Architecture

### File-Based Routing

The app uses Expo Router with route groups:

- `src/app/(public)/` - Public screens (splash, onboarding)
- `src/app/(auth)/` - Authentication screens (welcome, login, register)
- `src/app/(tabs)/` - Main app tabs (requires authentication)
- `src/app/_layout.tsx` - Root layout with ThemeProvider and font loading

### Directory Structure

- `src/app/` - File-based routing screens
- `src/components/` - Reusable UI components
  - `common/` - Generic components (Button, TextInput, Typo, IconButton, LoadingSpinner)
  - `layout/` - Layout components (ScreenWrapper)
- `src/contexts/` - React contexts (AuthContext, ThemeContext)
- `src/hooks/` - Custom React hooks (useAuth, useTheme)
- `src/services/` - API and business logic (authService)
- `src/config/` - Environment and API configuration
- `src/constants/` - Design system constants (theme, auth, design)
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions (storage, responsive, colorUtils)

### Path Aliases

TypeScript paths use `@/*` alias pointing to `src/*`:

```typescript
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { TYPOGRAPHY } from "@/constants/theme";
```

### State Management

- **AuthContext** (`src/contexts/AuthContext.tsx`): Manages authentication state, login/register/logout, user data
- **ThemeContext** (referenced in index): Manages light/dark theme mode

### Design System

The app uses a comprehensive design system with responsive scaling:

#### Responsive Utilities (`src/utils/responsive.ts`)

Based on a 375x812 base dimension (iPhone X/11/12/13/14 Pro):

- `scale(size)` - Horizontal scaling for padding, margins, widths
- `verticalScale(size)` - Vertical scaling for heights
- `moderateScale(size, factor)` - Moderate scaling for fonts, border radius, icons (default factor: 0.5)

#### Design Constants (`src/constants/design.ts`)

Centralized sizing with semantic naming:

- `spacingScale` - Horizontal spacing (xxs to xxxxl)
- `verticalSpacing` - Vertical spacing (xxs to xxxl)
- `borderRadius` - Border radius values (xs to full)
- `componentSizes` - Fixed component dimensions (icons, buttons, inputs, etc.)
- `commonSpacing` - Pre-configured spacing for common patterns

Always use design constants instead of hardcoded values.

#### Theme System (`src/constants/theme.ts`)

- `FONTS` - Font family constants (Segoe UI family + Pacifico decorative)
- `TYPOGRAPHY` - Material Design 3-inspired type scale (display, headline, title, body, label)
- `COLORS` - Color palette with primary (purple), secondary (pink-purple), emotions, semantic
- `lightTheme` / `darkTheme` - Complete theme objects with background, text, surface, border, brand, accent, status colors
- `withOpacity(color, opacity)` - Utility for adding opacity to colors

Purple (#A855F7 / COLORS.primary[500]) is the primary brand color.

#### Typography Usage

```typescript
import { TYPOGRAPHY } from "@/constants/theme";

<Text style={{ ...TYPOGRAPHY.titleLarge }}>Title</Text>
<Text style={{ ...TYPOGRAPHY.bodyMedium }}>Body text</Text>
```

### API Configuration

API client is configured in `src/config/api.ts`:

- Axios instance with automatic token injection from SecureStore
- Request/response interceptors for logging (development only)
- Base URL and timeout from environment variables
- Error handling for 401 responses

### Authentication Flow

Authentication is handled via:

1. **AuthService** (`src/services/authService.ts`): API calls for login/register/logout/token refresh
2. **AuthContext**: Provides auth state and methods to components
3. **useAuth hook**: Convenient access to AuthContext
4. **Storage**: Tokens and user data stored securely using expo-secure-store

Access tokens are automatically injected into API requests via interceptor.

### Components

All common components follow the design system:

- **Button**: Primary/secondary variants, supports icons, loading states
- **TextInput**: Labeled inputs with error states, secure text entry, left/right icons
- **Typo**: Typography component with variant prop matching TYPOGRAPHY constants
- **IconButton**: Touchable icon buttons with ripple effect
- **LoadingSpinner**: Custom animated loading indicator
- **ScreenWrapper**: Standard screen container with safe areas

### Custom Fonts

The app loads custom fonts in `src/app/_layout.tsx`:

- Segoe UI (Regular, Italic, Bold, Bold Italic)
- Pacifico (Decorative)

Fonts are loaded via `useFonts` hook before rendering the app.

## Code Style Guidelines

### Spacing and Layout

- Use `spacingScale` for horizontal spacing (paddingHorizontal, marginHorizontal, gap)
- Use `verticalSpacing` for vertical spacing (paddingVertical, marginVertical)
- Use `borderRadius` constants for all rounded corners
- Use `componentSizes` for component dimensions

Example:
```typescript
import { spacingScale, verticalSpacing, borderRadius } from "@/constants/design";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacingScale.xxl,  // 24px scaled
    paddingVertical: verticalSpacing.lg,   // 20px scaled
    borderRadius: borderRadius.md,         // 12px scaled
  }
});
```

### Typography

- Use `TYPOGRAPHY` constants instead of custom font styles
- Use `Typo` component when possible for consistent text rendering
- Font sizes use `moderateScale` for better tablet support

### Colors

- Access theme colors through `useTheme()` hook
- Use semantic color names (primary, secondary, success, error, etc.)
- For emotion-related features, use `colors.emotions` palette
- Ensure proper contrast ratios (dark mode has improved border contrast)

### Environment Variables

- Access via `env.get('KEY')` or `env.getAll()`
- Check environment with `env.isDevelopment()`, `env.isProduction()`, `env.isPreview()`
- Check feature flags with `env.isFeatureEnabled('FEATURE_NAME')`

### Storage

Use utilities from `src/utils/storage.ts`:

```typescript
import { getStorageItem, setStorageItem, removeStorageItem } from "@/utils/storage";

// Secure storage via expo-secure-store
await setStorageItem('key', 'value');
const value = await getStorageItem('key');
await removeStorageItem('key');
```

Storage keys for auth are defined in `src/constants/auth.ts` as `STORAGE_KEYS`.

## Build Profiles

EAS Build profiles (eas.json):

- **development**: Development client with debugging, internal distribution
- **preview**: Preview builds (APK), internal distribution, preview environment
- **production**: Production builds with auto-increment, production environment

Environment variables are injected via the `env` field in each profile.

## Testing

Unit tests are located in `src/utils/__tests__/`. The project uses a standard React Native testing setup.

## Important Notes

- All environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in client code
- Never commit `.env` files or actual API keys to version control
- The design system is responsive and scales based on screen dimensions
- Authentication tokens are stored in expo-secure-store for security
- API client automatically injects auth tokens from storage
- Theme mode (light/dark) can be toggled via ThemeContext
- Font loading is handled in root layout; splash screen stays visible until fonts load
