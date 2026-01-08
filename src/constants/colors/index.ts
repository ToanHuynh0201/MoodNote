/**
 * Color System - Central Export
 *
 * This file exports the complete color system for MoodNote.
 *
 * Usage in components:
 * ```typescript
 * import { useTheme } from '@/hooks/useTheme';
 *
 * const MyComponent = () => {
 *   const { theme } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.surface.base }}>
 *       <Text style={{ color: theme.text.primary }}>Hello</Text>
 *     </View>
 *   );
 * };
 * ```
 *
 * DO NOT import ColorPrimitives directly in components.
 * Always use semantic tokens through the theme context.
 */

export { ColorPrimitives } from "./primitives";
export type {
	PurpleScale,
	PinkScale,
	NeutralScale,
	GreenScale,
	AmberScale,
	RedScale,
	BlueScale,
	EmotionColors,
	StatsColors,
} from "./primitives";

export { createSemanticTokens } from "./semantic";
export type {
	ThemeColors,
	SurfaceColors,
	TextColors,
	PrimaryColors,
	SecondaryColors,
	BorderColors,
	StatusColors,
	EmotionTokens,
	StatsTokens,
	ShadowColors,
	GradientTokens,
	ChartColors,
} from "./semantic";

import { ColorPrimitives } from "./primitives";
import { createSemanticTokens } from "./semantic";

/**
 * Light Theme - Optimized for light mode with dark text on light backgrounds
 * All colors meet WCAG 2.1 AA standards for accessibility
 */
export const lightTheme = createSemanticTokens(ColorPrimitives, "light");

/**
 * Dark Theme - Optimized for dark mode with light text on dark backgrounds
 * Many colors exceed WCAG AAA standards for excellent readability
 */
export const darkTheme = createSemanticTokens(ColorPrimitives, "dark");

/**
 * Default export for convenient access
 */
export default {
	ColorPrimitives,
	lightTheme,
	darkTheme,
	createSemanticTokens,
};

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

/**
 * Add opacity to any color
 *
 * @param color - Hex color string (e.g., '#A855F7') or rgb/rgba string
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string
 *
 * @example
 * withOpacity('#A855F7', 0.5) // 'rgba(168, 85, 247, 0.5)'
 * withOpacity(theme.primary.default, 0.8)
 */
export const withOpacity = (color: string, opacity: number): string => {
	// For hex colors
	if (color.startsWith("#")) {
		const hex = color.replace("#", "");
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	// For rgb/rgba colors
	if (color.startsWith("rgb")) {
		// Replace existing opacity or add new one
		return color.replace(/[\d.]+\)$/g, `${opacity})`);
	}

	// Fallback: return original color
	return color;
};
