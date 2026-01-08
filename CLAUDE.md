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

-   `src/app/(public)/` - Public screens (splash, onboarding)
-   `src/app/(auth)/` - Authentication screens (welcome, login, register)
-   `src/app/(tabs)/` - Main app tabs (requires authentication)
-   `src/app/_layout.tsx` - Root layout with ThemeProvider and font loading

### Directory Structure

-   `src/app/` - File-based routing screens
-   `src/components/` - Reusable UI components
    -   `common/` - Generic components (Button, TextInput, Typo, IconButton, LoadingSpinner)
    -   `layout/` - Layout components (ScreenWrapper)
-   `src/contexts/` - React contexts (AuthContext, ThemeContext)
-   `src/hooks/` - Custom React hooks (useAuth, useTheme)
-   `src/services/` - API and business logic (authService)
-   `src/config/` - Environment and API configuration
-   `src/constants/` - Design system constants (theme, auth, design)
-   `src/types/` - TypeScript type definitions
-   `src/utils/` - Utility functions (storage, responsive, colorUtils)

### Path Aliases

TypeScript paths use `@/*` alias pointing to `src/*`:

```typescript
import { Button } from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { TYPOGRAPHY } from "@/constants/theme";
```

### State Management

-   **AuthContext** (`src/contexts/AuthContext.tsx`): Manages authentication state, login/register/logout, user data
-   **ThemeContext** (referenced in index): Manages light/dark theme mode

### Design System

The app uses a comprehensive design system with responsive scaling and WCAG AA compliant colors.

#### Color System (`src/constants/colors/`)

**Architecture**: 3-layer token system (Primitives → Semantic → Usage)

1. **Primitives** (`primitives.ts`) - Raw color values with WCAG-compliant variants
2. **Semantic** (`semantic.ts`) - Mode-based tokens (light/dark) with guaranteed accessibility
3. **Usage** - Components access colors via `useTheme()` hook

**WCAG Compliance**: All color combinations meet WCAG 2.1 AA standards:
- Text colors: ≥4.5:1 contrast ratio
- UI components: ≥3.0:1 contrast ratio
- Dark mode: Many colors exceed AAA (7:1) standards

**Using Colors**:

```typescript
import { useTheme } from "@/hooks/useTheme";

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.surface.base }}>
      {/* Surface colors */}
      backgroundColor: theme.surface.base      // Main background
      backgroundColor: theme.surface.raised    // Slightly elevated
      backgroundColor: theme.surface.elevated  // Cards, modals

      {/* Text colors */}
      color: theme.text.primary     // Main text (19:1 contrast)
      color: theme.text.secondary   // Secondary text (11:1)
      color: theme.text.onPrimary   // Text on colored backgrounds

      {/* Brand colors */}
      backgroundColor: theme.primary.default   // Primary buttons
      backgroundColor: theme.primary.subtle    // Light backgrounds
      borderColor: theme.border.strong         // Borders (5:1 contrast)

      {/* Status & Emotions */}
      color: theme.status.success
      color: theme.emotions.happy

      {/* Feature-specific */}
      color: theme.stats.purple   // Stats cards
      shadowColor: theme.shadow.color
    </View>
  );
};
```

**Color Token Reference**:

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `theme.surface.base` | White | Purple-950 | Main backgrounds |
| `theme.surface.raised` | Purple-50 | Purple-900 | Slightly elevated |
| `theme.surface.elevated` | Purple-100 | Purple-800 | Cards, modals |
| `theme.text.primary` | Neutral-900 | Neutral-50 | Main text |
| `theme.text.onPrimary` | White | White | Text on colored bg |
| `theme.primary.default` | Purple-600 | Purple-400 | Primary actions |
| `theme.border.default` | Purple-400 | Purple-600 | Standard borders (4.2:1) |
| `theme.status.error` | Red-600 | Red-400 | Error states |
| `theme.emotions.happy` | Amber-600 | Amber-300 | Mood tracking |

#### Responsive Scaling (`src/utils/scaling.ts`)

**Universal Scaling Function**: Single `s()` function replaces the old 3-function system.

Based on 375x812 base dimension (iPhone X/11/12/13/14 Pro):

```typescript
import { s, fontSize, spacing, vSpacing } from "@/utils/scaling";

// Font sizes (moderate scaling - default)
fontSize: s(16)
fontSize: fontSize(16)  // Same, more semantic

// Horizontal spacing (full x-axis scaling)
paddingHorizontal: s(24, { axis: 'x' })
paddingHorizontal: spacing(24)  // Same, more semantic

// Vertical spacing (full y-axis scaling)
paddingVertical: s(20, { axis: 'y' })
paddingVertical: vSpacing(20)  // Same, more semantic

// Icons, border radius (moderate scaling)
width: s(24)
borderRadius: s(12)

// Exact sizes (no scaling)
width: s(48, { factor: 0 })
```

**Semantic Helpers** (recommended for better code readability):
- `fontSize(size)` - For font sizes
- `spacing(size)` - For horizontal padding/margins
- `vSpacing(size)` - For vertical padding/margins

#### Spacing & Layout (`src/constants/spacing.ts`)

**Spacing Scales**: Numeric keys (0-10) for predictable sizing.

```typescript
import { space, vSpace, radius, sizes } from "@/constants/spacing";

// Horizontal spacing
paddingHorizontal: space[7]   // 24px scaled
marginHorizontal: space[5]    // 16px scaled
gap: space[3]                 // 8px scaled

// Vertical spacing
paddingVertical: vSpace[5]    // 20px scaled
marginVertical: vSpace[4]     // 16px scaled

// Border radius
borderRadius: radius.lg       // 12px scaled
borderRadius: radius.full     // Fully rounded (pills, circles)

// Component sizes
width: sizes.icon.lg          // 24px scaled
height: sizes.button.height   // 60px scaled
width: sizes.avatar.lg        // 48px scaled
```

**Spacing Scale Reference**:

| Key | Horizontal (space) | Vertical (vSpace) | Common Usage |
|-----|-------------------|-------------------|--------------|
| 0 | 0px | 0px | No spacing |
| 1 | 2px | 2px | Fine adjustments |
| 2 | 4px | 4px | Tight spacing |
| 3 | 8px | 8px | Small gaps |
| 4 | 12px | 16px | Medium spacing |
| 5 | 16px | 20px | Standard spacing |
| 6 | 20px | 24px | Large spacing |
| 7 | 24px | 32px | Screen padding |
| 8 | 32px | 40px | Major sections |

**Pre-defined Sizes**:

```typescript
sizes.icon.lg      // 24px - Standard icons
sizes.button.height // 60px - Button height
sizes.input.height  // 52px - Input height
sizes.avatar.lg     // 48px - Avatar size
```

**Shadow Presets**:

```typescript
import { shadows } from "@/constants/spacing";

// Apply pre-configured shadows
...shadows.sm   // Subtle elevation
...shadows.md   // Standard (buttons, cards)
...shadows.lg   // Strong (modals, dialogs)
```

#### Typography (`src/constants/typography.ts`)

```typescript
import { fontSizes, FONTS, TYPOGRAPHY } from "@/constants/typography";

// Font sizes (responsive)
fontSize: fontSizes.base    // 14px
fontSize: fontSizes.lg      // 16px
fontSize: fontSizes['5xl']  // 34px

// Font families
fontFamily: FONTS.regular     // Segoe UI
fontFamily: FONTS.bold        // Segoe UI Bold
fontFamily: FONTS.decorative  // Pacifico

// Material Design scale (use with Typo component)
<Text style={{ ...TYPOGRAPHY.titleLarge }}>Title</Text>
<Text style={{ ...TYPOGRAPHY.bodyMedium }}>Body text</Text>
```

**Typography Scale**:

| Variant | Font Size | Line Height | Usage |
|---------|-----------|-------------|-------|
| displayLarge | 40px | 48px | Hero text |
| headlineLarge | 28px | 36px | Page titles |
| titleLarge | 20px | 28px | Section headers |
| bodyLarge | 16px | 24px | Standard text |
| bodyMedium | 14px | 20px | Default body |
| labelLarge | 14px | 20px | Buttons |

#### Color Pairing Guide

**CRITICAL**: Always pair background and text colors correctly for WCAG compliance.

**Primary Button Pattern** (Filled):
```typescript
{
  backgroundColor: theme.primary.default,    // Purple
  color: theme.text.onPrimary,              // White - ALWAYS use this on colored backgrounds
}
```

**Secondary Button Pattern** (Tonal):
```typescript
{
  backgroundColor: theme.surface.elevated,   // Light purple
  color: theme.primary.default,             // Dark purple text
}
```

**Outlined Button Pattern**:
```typescript
{
  backgroundColor: "transparent",
  color: theme.text.primary,                // Dark text
  borderColor: theme.border.strong,         // Purple border (5:1 contrast)
  borderWidth: 2,
}
```

**Card/Surface Pattern**:
```typescript
{
  backgroundColor: theme.surface.elevated,   // Card background
  // Title
  color: theme.text.primary,                // Main text (19:1 contrast)
  // Description
  color: theme.text.secondary,              // Supporting text (11:1 contrast)
  // Metadata
  color: theme.text.tertiary,               // De-emphasized text (9:1 contrast)
}
```

**Status Message Pattern**:
```typescript
// Error
{
  backgroundColor: theme.status.error,       // Red
  color: theme.text.onPrimary,              // White
}

// Success
{
  backgroundColor: theme.status.success,     // Green
  color: theme.text.onPrimary,              // White
}
```

**Stats/Icon Container Pattern** (như HomeScreen):
```typescript
{
  backgroundColor: theme.stats.purple,       // Colored background
  color: theme.text.onPrimary,              // White icon/text
}
```

**Common Mistakes to Avoid**:
```typescript
// ❌ WRONG - Low contrast
<View style={{ backgroundColor: theme.primary.default }}>
  <Text style={{ color: theme.text.primary }}>Text</Text>  // Purple on purple!
</View>

// ✅ CORRECT
<View style={{ backgroundColor: theme.primary.default }}>
  <Text style={{ color: theme.text.onPrimary }}>Text</Text>  // White on purple
</View>

// ❌ WRONG - Missing border on transparent
<TouchableOpacity style={{ backgroundColor: "transparent" }}>
  <Text style={{ color: theme.text.primary }}>Button</Text>
</TouchableOpacity>

// ✅ CORRECT
<TouchableOpacity style={{
  backgroundColor: "transparent",
  borderWidth: 2,
  borderColor: theme.border.strong,
}}>
  <Text style={{ color: theme.text.primary }}>Button</Text>
</TouchableOpacity>
```

**Quick Reference - Color Pairing Table**:

| Background | Text Color | Border (if needed) | Use Case |
|------------|-----------|-------------------|----------|
| `theme.primary.default` | `theme.text.onPrimary` | - | Primary buttons |
| `theme.surface.base` | `theme.text.primary` | - | Main content |
| `theme.surface.elevated` | `theme.text.primary` | - | Cards |
| `theme.status.error` | `theme.text.onPrimary` | - | Error states |
| `"transparent"` | `theme.text.primary` | `theme.border.strong` | Outlined buttons |
| `theme.stats.*` | `theme.text.onPrimary` | - | Colored icons |

**Remember**:
- Use `theme.text.onPrimary` for ANY colored background (primary, secondary, status, stats)
- Use `theme.text.primary/secondary/tertiary` for neutral backgrounds (surface.*)
- ALWAYS add border when using transparent backgrounds
- Reference `src/utils/buttonStyles.ts` for correct implementation examples

### API Configuration

API client is configured in `src/config/api.ts`:

-   Axios instance with automatic token injection from SecureStore
-   Request/response interceptors for logging (development only)
-   Base URL and timeout from environment variables
-   Error handling for 401 responses

### Authentication Flow

Authentication is handled via:

1. **AuthService** (`src/services/authService.ts`): API calls for login/register/logout/token refresh
2. **AuthContext**: Provides auth state and methods to components
3. **useAuth hook**: Convenient access to AuthContext
4. **Storage**: Tokens and user data stored securely using expo-secure-store

Access tokens are automatically injected into API requests via interceptor.

### Components

All common components follow the design system:

-   **Button**: Primary/secondary variants, supports icons, loading states
-   **TextInput**: Labeled inputs with error states, secure text entry, left/right icons
-   **Typo**: Typography component with variant prop matching TYPOGRAPHY constants
-   **IconButton**: Touchable icon buttons with ripple effect
-   **LoadingSpinner**: Custom animated loading indicator
-   **ScreenWrapper**: Standard screen container with safe areas

### Custom Fonts

The app loads custom fonts in `src/app/_layout.tsx`:

-   Segoe UI (Regular, Italic, Bold, Bold Italic)
-   Pacifico (Decorative)

Fonts are loaded via `useFonts` hook before rendering the app.

## Code Style Guidelines

### Spacing and Layout

Always use design tokens instead of hardcoded values:

```typescript
import { space, vSpace, radius, sizes, shadows } from "@/constants/spacing";
import { s, spacing, vSpacing } from "@/utils/scaling";

const styles = StyleSheet.create({
	container: {
		// Option 1: Use spacing tokens (recommended)
		paddingHorizontal: space[7],   // 24px scaled
		paddingVertical: vSpace[5],    // 20px scaled
		borderRadius: radius.lg,       // 12px scaled

		// Option 2: Use scaling functions directly
		paddingHorizontal: spacing(24),
		paddingVertical: vSpacing(20),
		borderRadius: s(12),

		// Shadows
		...shadows.md,
		shadowColor: theme.shadow.color,
	},

	icon: {
		// Use pre-defined component sizes
		width: sizes.icon.lg,      // 24px
		height: sizes.icon.lg,
	},

	button: {
		height: sizes.button.height,    // 60px
		paddingHorizontal: sizes.button.paddingX,  // 24px
	},
});
```

**Key Rules**:
- Use `space[n]` for horizontal spacing (padding, margins, gaps)
- Use `vSpace[n]` for vertical spacing
- Use `radius.*` for border radius
- Use `sizes.*` for component dimensions
- Use `shadows.*` for elevation
- Never use hardcoded pixel values

### Typography

-   Use `TYPOGRAPHY` constants for text styles (imported from `@/constants/typography`)
-   Use `Typo` component when possible for consistent text rendering
-   Use `fontSizes.*` tokens for custom font sizes

```typescript
import { fontSizes, TYPOGRAPHY } from "@/constants/typography";

// With Typo component (recommended)
<Typo variant="titleLarge">Title</Typo>
<Typo variant="bodyMedium">Body text</Typo>

// With custom Text component
<Text style={{
	...TYPOGRAPHY.titleLarge,
	fontSize: fontSizes.xl,  // Override if needed
}}>Custom</Text>
```

### Colors

**Always use theme colors** - never hardcode hex values:

```typescript
import { useTheme } from "@/hooks/useTheme";

const MyComponent = () => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.surface.base }]}>
			<Text style={{ color: theme.text.primary }}>Text</Text>
		</View>
	);
};
```

**Key Rules**:
- Access colors via `useTheme()` hook only
- Use semantic names (`theme.primary.default`, not `theme.primary`)
- For emotion features, use `theme.emotions.*`
- For stats/charts, use `theme.stats.*`
- All colors are WCAG AA compliant (≥3:1 for UI, ≥4.5:1 for text)

**Common Color Patterns**:

```typescript
// Backgrounds
backgroundColor: theme.surface.base       // Main screen background
backgroundColor: theme.surface.elevated   // Cards, elevated panels
backgroundColor: theme.primary.default    // Primary buttons

// Text
color: theme.text.primary        // Main text
color: theme.text.secondary      // Supporting text
color: theme.text.onPrimary      // Text on colored backgrounds

// Borders
borderColor: theme.border.default   // Standard borders (4.2:1)
borderColor: theme.border.strong    // Emphasized borders (5.0:1)

// Status
backgroundColor: theme.status.error   // Error states
color: theme.status.success           // Success indicators

// Shadows
shadowColor: theme.shadow.color       // Standard shadows
```

### Environment Variables

-   Access via `env.get('KEY')` or `env.getAll()`
-   Check environment with `env.isDevelopment()`, `env.isProduction()`, `env.isPreview()`
-   Check feature flags with `env.isFeatureEnabled('FEATURE_NAME')`

### Storage

Use utilities from `src/utils/storage.ts`:

```typescript
import {
	getStorageItem,
	setStorageItem,
	removeStorageItem,
} from "@/utils/storage";

// Secure storage via expo-secure-store
await setStorageItem("key", "value");
const value = await getStorageItem("key");
await removeStorageItem("key");
```

Storage keys for auth are defined in `src/constants/auth.ts` as `STORAGE_KEYS`.

## Build Profiles

EAS Build profiles (eas.json):

-   **development**: Development client with debugging, internal distribution
-   **preview**: Preview builds (APK), internal distribution, preview environment
-   **production**: Production builds with auto-increment, production environment

Environment variables are injected via the `env` field in each profile.

## Testing

Unit tests are located in `src/utils/__tests__/`. The project uses a standard React Native testing setup.

## Important Notes

-   All environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in client code
-   Never commit `.env` files or actual API keys to version control
-   **The design system uses a unified scaling function** (`s()`) with semantic helpers for better code clarity
-   **All colors are WCAG AA compliant** - use `theme.*` tokens only, never hardcode hex values
-   **Use spacing tokens** (`space[n]`, `vSpace[n]`) instead of raw pixel values
-   Authentication tokens are stored in expo-secure-store for security
-   API client automatically injects auth tokens from storage
-   Theme mode (light/dark) can be toggled via ThemeContext
-   Font loading is handled in root layout; splash screen stays visible until fonts load
-   See [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for details on the color & responsive refactor
