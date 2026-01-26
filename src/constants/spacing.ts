import { s, spacing } from "@/utils/scaling";

/**
 * Spacing Constants - Simplified Design Tokens
 *
 * Numeric-based spacing system (0-10) inspired by Tailwind CSS.
 * All values scale proportionally based on screen width.
 *
 * Usage:
 * - padding: space[7]          // 24px scaled
 * - margin: space[5]           // 16px scaled
 * - gap: space[3]              // 8px scaled
 */

// ============================================================================
// SPACING SCALE
// For: padding, margin, gap, width/height adjustments
// ============================================================================

export const space = {
	0: 0,           // No spacing
	1: spacing(2),  // 2px - Fine adjustments
	2: spacing(4),  // 4px - Tight spacing
	3: spacing(8),  // 8px - Small gaps
	4: spacing(12), // 12px - Medium-small gaps
	5: spacing(16), // 16px - Standard spacing
	6: spacing(20), // 20px - Large spacing
	7: spacing(24), // 24px - Extra large (screen padding)
	8: spacing(32), // 32px - Major sections
	9: spacing(40), // 40px - Extra spacing
	10: spacing(48), // 48px - Maximum spacing
} as const;

// ============================================================================
// BORDER RADIUS
// For: borderRadius on all components
// ============================================================================

export const radius = {
	none: 0, // No radius (sharp corners)
	sm: s(4), // 4px - Subtle rounding
	md: s(8), // 8px - Small components
	lg: s(12), // 12px - Standard rounding (inputs, cards)
	xl: s(16), // 16px - Large components
	"2xl": s(20), // 20px - Extra large (icon buttons)
	"3xl": s(28), // 28px - Circular buttons
	full: 9999, // Fully rounded (pills, circles)
} as const;

// ============================================================================
// COMPONENT SIZES
// Pre-defined sizes for common UI components
// ============================================================================

export const sizes = {
	/**
	 * Icon sizes - Use for all icon components
	 */
	icon: {
		sm: s(16), // 16px - Small icons
		md: s(20), // 20px - TextInput icons
		lg: s(24), // 24px - Standard icons (most common)
		xl: s(32), // 32px - Large icons
		"2xl": s(40), // 40px - Back buttons
		"3xl": s(48), // 48px - Feature icons
	},

	/**
	 * Button sizes
	 */
	button: {
		height: spacing(60), // Standard button height
		paddingX: spacing(24), // Horizontal padding
		paddingY: spacing(16), // Vertical padding
		minHeight: spacing(60), // Minimum height
	},

	/**
	 * Input field sizes
	 */
	input: {
		height: spacing(52), // Input height
		paddingX: spacing(16), // Horizontal padding
		paddingY: spacing(12), // Vertical padding
	},

	/**
	 * Avatar sizes
	 */
	avatar: {
		sm: s(32), // 32px - Small avatar
		md: s(40), // 40px - Medium avatar
		lg: s(48), // 48px - Large avatar (most common)
		xl: s(64), // 64px - Extra large avatar
		"2xl": s(80), // 80px - Feature avatar
	},

	/**
	 * Social button sizes (circle buttons)
	 */
	social: {
		size: s(56), // 56x56px
		gap: spacing(16), // Gap between buttons
	},

	/**
	 * Icon container sizes (for onboarding, welcome screens)
	 */
	iconContainer: {
		sm: s(140), // 140px - Welcome screen
		md: s(160), // 160px - Onboarding
		lg: s(180), // 180px - Large feature icons
	},

	/**
	 * Loading spinner sizes
	 */
	loading: {
		waveHeight: spacing(60), // 60px - Sound wave container height
		barWidth: s(6), // 6px - Bar width
		barBorderRadius: s(4), // 4px - Bar border radius
		barMargin: spacing(4), // 4px - Bar horizontal margin
		containerPadding: spacing(20), // 20px - Container padding
		containerMarginBottom: spacing(20), // 20px - Margin between waves and text
	},
} as const;

// ============================================================================
// LAYOUT PRESETS
// Common layout patterns for quick use
// ============================================================================

export const layout = {
	/**
	 * Screen padding - Standard padding for screen containers
	 */
	screen: {
		paddingX: space[7], // 24px
		paddingY: space[5], // 16px
	},

	/**
	 * Card padding - Standard padding for card components
	 */
	card: {
		paddingX: space[6], // 20px
		paddingY: space[4], // 12px
	},

	/**
	 * Form spacing - Spacing between form elements
	 */
	form: {
		fieldGap: space[4], // 12px - Between fields
		sectionGap: space[6], // 20px - Between sections
	},

	/**
	 * List spacing
	 */
	list: {
		itemGap: space[3], // 8px - Between list items
		sectionGap: space[6], // 20px - Between list sections
	},
} as const;

// ============================================================================
// SHADOW PRESETS
// Pre-configured shadow elevations
// ============================================================================

export const shadows = {
	/**
	 * Small shadow - Subtle elevation
	 */
	sm: {
		shadowOffset: { width: 0, height: spacing(1) },
		shadowRadius: s(2),
		shadowOpacity: 0.05,
		elevation: 1,
	},

	/**
	 * Medium shadow - Standard elevation (buttons, cards)
	 */
	md: {
		shadowOffset: { width: 0, height: spacing(2) },
		shadowRadius: s(4),
		shadowOpacity: 0.1,
		elevation: 3,
	},

	/**
	 * Large shadow - Strong elevation (modals, dialogs)
	 */
	lg: {
		shadowOffset: { width: 0, height: spacing(4) },
		shadowRadius: s(8),
		shadowOpacity: 0.15,
		elevation: 5,
	},

	/**
	 * Extra large shadow - Maximum elevation
	 */
	xl: {
		shadowOffset: { width: 0, height: spacing(8) },
		shadowRadius: s(16),
		shadowOpacity: 0.2,
		elevation: 8,
	},
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SpaceKey = keyof typeof space;
export type RadiusKey = keyof typeof radius;
export type IconSizeKey = keyof typeof sizes.icon;
export type AvatarSizeKey = keyof typeof sizes.avatar;
export type ShadowKey = keyof typeof shadows;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
	space,
	radius,
	sizes,
	layout,
	shadows,
};
