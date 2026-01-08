import { Dimensions, PixelRatio } from "react-native";

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Determine shortest and longest dimensions (supports basic orientation changes)
const [shortDimension, longDimension] =
	SCREEN_WIDTH < SCREEN_HEIGHT
		? [SCREEN_WIDTH, SCREEN_HEIGHT]
		: [SCREEN_HEIGHT, SCREEN_WIDTH];

// Base dimensions from design (iPhone X/11/12/13/14 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Universal scaling function - Replaces scale, verticalScale, moderateScale
 *
 * This single function handles all scaling needs with configurable options.
 * Provides better DX than having 3 separate functions.
 *
 * @param size - Base size from design (in pixels)
 * @param options - Scaling options
 * @param options.axis - Which axis to scale: 'x' (horizontal), 'y' (vertical), or 'both' (moderate)
 * @param options.factor - Moderation factor (0 = no scale, 1 = full scale, 0.5 = moderate) - only applies when axis='both'
 * @returns Scaled size rounded to nearest pixel
 *
 * @example
 * // Font sizes (default behavior - moderate scaling)
 * fontSize: s(16)
 *
 * // Full horizontal scaling (for padding, margins, widths)
 * paddingHorizontal: s(24, { axis: 'x' })
 *
 * // Full vertical scaling (for heights, vertical spacing)
 * paddingVertical: s(20, { axis: 'y' })
 *
 * // No scaling (keep exact size)
 * width: s(48, { factor: 0 })
 *
 * // Custom moderation factor
 * borderRadius: s(12, { factor: 0.3 })
 */
export function s(
	size: number,
	options: {
		axis?: "x" | "y" | "both";
		factor?: number;
	} = {},
): number {
	const { axis = "both", factor = 0.5 } = options;

	let scaledSize: number;

	if (axis === "x") {
		// Full horizontal scale (for widths, horizontal padding/margin)
		scaledSize = (shortDimension / BASE_WIDTH) * size;
	} else if (axis === "y") {
		// Full vertical scale (for heights, vertical padding/margin)
		scaledSize = (longDimension / BASE_HEIGHT) * size;
	} else {
		// Moderate scale (for fonts, border radius, icons)
		// This provides better scaling for text and UI elements on tablets
		const xScale = (shortDimension / BASE_WIDTH) * size;
		const step = xScale - size;
		scaledSize = size + step * factor;
	}

	return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
}

// ============================================================================
// SEMANTIC HELPERS
// These provide better readability and self-documenting code
// ============================================================================

/**
 * Font size scaling - Uses moderate scaling (factor 0.5)
 * Best for text to prevent too-large fonts on tablets
 *
 * @example fontSize: fontSize(16)
 */
export const fontSize = (size: number) => s(size);

/**
 * Horizontal spacing - Uses full x-axis scaling
 * For paddingHorizontal, marginHorizontal, width adjustments
 *
 * @example paddingHorizontal: spacing(24)
 */
export const spacing = (size: number) => s(size, { axis: "x" });

/**
 * Vertical spacing - Uses full y-axis scaling
 * For paddingVertical, marginVertical, height adjustments
 *
 * @example paddingVertical: vSpacing(20)
 */
export const vSpacing = (size: number) => s(size, { axis: "y" });

/**
 * Icon size - Uses moderate scaling
 * Prevents icons from becoming too large on tablets
 *
 * @example width: iconSize(24)
 */
export const iconSize = (size: number) => s(size);

/**
 * Border radius - Uses moderate scaling
 * Maintains proportional roundness across devices
 *
 * @example borderRadius: radius(12)
 */
export const radius = (size: number) => s(size);

/**
 * Exact size - No scaling
 * Use when you need pixel-perfect sizes regardless of screen
 *
 * @example width: exact(1) // Always 1px, never scales
 */
export const exact = (size: number) => s(size, { factor: 0 });

// ============================================================================
// BACKWARD COMPATIBILITY (DEPRECATED)
// Keep these for gradual migration, but encourage use of new API
// ============================================================================

/**
 * @deprecated Use spacing(size) or s(size, { axis: 'x' }) instead
 *
 * Old horizontal scaling function. Replaced by semantic helpers.
 */
export const scale = (size: number) => s(size, { axis: "x" });

/**
 * @deprecated Use vSpacing(size) or s(size, { axis: 'y' }) instead
 *
 * Old vertical scaling function. Replaced by semantic helpers.
 */
export const verticalScale = (size: number) => s(size, { axis: "y" });

/**
 * @deprecated Use s(size) or fontSize(size) instead
 *
 * Old moderate scaling function. Replaced by default s() behavior.
 */
export const moderateScale = (size: number, factor = 0.5) =>
	s(size, { factor });

/**
 * @deprecated Rarely used. Use s(size, { axis: 'y', factor }) if needed
 *
 * Old moderate vertical scaling. Not commonly needed.
 */
export const moderateVerticalScale = (size: number, factor = 0.5) => {
	const yScale = s(size, { axis: "y" });
	const step = yScale - size;
	return Math.round(PixelRatio.roundToNearestPixel(size + step * factor));
};

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Helper to get safe area height on different devices
 * Useful for calculating available screen height minus system UI
 */
export const STATUS_BAR_HEIGHT = (() => {
	const { Platform, StatusBar } = require("react-native");
	return Platform.select({
		ios: shortDimension > 800 ? 47 : 20, // Basic notch handling
		android: StatusBar.currentHeight,
		default: 0,
	});
})();

/**
 * Export dimensions for external use
 */
export const DIMENSIONS = {
	screenWidth: SCREEN_WIDTH,
	screenHeight: SCREEN_HEIGHT,
	shortDimension,
	longDimension,
	baseWidth: BASE_WIDTH,
	baseHeight: BASE_HEIGHT,
} as const;
