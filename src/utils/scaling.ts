import { Dimensions, PixelRatio } from "react-native";

// Get screen dimensions (portrait only)
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base width from design (iPhone X/11/12/13/14 Pro in portrait)
const BASE_WIDTH = 375;

/**
 * Simple scaling function - Scales based on screen width only
 *
 * Simplified for portrait-only mobile apps. All sizes scale proportionally
 * based on screen width relative to iPhone X base size (375px).
 *
 * @param size - Base size from design (in pixels)
 * @param factor - Scale factor (0 = no scale, 1 = full scale, 0.5 = moderate)
 * @returns Scaled size rounded to nearest pixel
 *
 * @example
 * // Font sizes, icons (moderate scaling - default)
 * fontSize: s(16)
 * width: s(24)
 *
 * // Padding, margins, gaps (full scaling)
 * paddingHorizontal: s(24, 1)
 *
 * // No scaling (keep exact size)
 * borderWidth: s(2, 0)
 */
export function s(size: number, factor: number = 0.5): number {
	const scale = SCREEN_WIDTH / BASE_WIDTH;
	const scaledSize = size + (size * (scale - 1)) * factor;
	return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
}

// ============================================================================
// SEMANTIC HELPERS
// These provide better readability and self-documenting code
// ============================================================================

/**
 * Font size scaling - Moderate scaling (factor 0.5)
 *
 * @example fontSize: fontSize(16)
 */
export const fontSize = (size: number) => s(size, 0.5);

/**
 * Spacing - Full scaling (factor 1)
 * For padding, margins, gaps, widths
 *
 * @example paddingHorizontal: spacing(24)
 */
export const spacing = (size: number) => s(size, 1);

/**
 * Icon size - Moderate scaling (factor 0.5)
 *
 * @example width: iconSize(24)
 */
export const iconSize = (size: number) => s(size, 0.5);

/**
 * Border radius - Moderate scaling (factor 0.5)
 *
 * @example borderRadius: radius(12)
 */
export const radius = (size: number) => s(size, 0.5);

/**
 * Exact size - No scaling (factor 0)
 *
 * @example borderWidth: exact(1)
 */
export const exact = (size: number) => s(size, 0);

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Export dimensions for external use
 */
export const DIMENSIONS = {
	screenWidth: SCREEN_WIDTH,
	baseWidth: BASE_WIDTH,
} as const;
