import type { ThemeColors } from "@/constants/colors";

/**
 * Button Styles Utility
 *
 * Shared logic for button color schemes across Button and IconButton components.
 * This eliminates duplicate code and ensures consistent button styling.
 */

export type ButtonVariant = "filled" | "tonal" | "outlined" | "text";

export interface ButtonColors {
	background: string;
	text: string;
	border?: string;
}

/**
 * Get color scheme for a button variant
 *
 * @param variant - Button variant type
 * @param theme - Current theme colors
 * @returns Object with background, text, and optional border colors
 *
 * @example
 * const colors = getButtonColors('filled', theme);
 * // { background: '#9333EA', text: '#FFFFFF' }
 */
export const getButtonColors = (
	variant: ButtonVariant,
	theme: ThemeColors,
): ButtonColors => {
	switch (variant) {
		case "filled":
			// Solid background with primary color
			return {
				background: theme.primary.default,
				text: theme.text.onPrimary,
			};

		case "tonal":
			// Elevated surface with adaptive text color
			// Light mode: purple text on light purple background
			// Dark mode: white text on dark purple background
			return {
				background: theme.surface.elevated,
				text: theme.text.onElevated,
			};

		case "outlined":
			// Transparent with border and primary text
			return {
				background: "transparent",
				text: theme.text.primary,
				border: theme.border.strong,
			};

		case "text":
			// Minimal - just text with primary color
			return {
				background: "transparent",
				text: theme.primary.default,
			};

		default:
			// Fallback to filled variant
			return {
				background: theme.primary.default,
				text: theme.text.onPrimary,
			};
	}
};

/**
 * Get disabled colors for a button
 *
 * @param variant - Button variant type
 * @param theme - Current theme colors
 * @returns Object with disabled colors
 */
export const getDisabledButtonColors = (
	variant: ButtonVariant,
	theme: ThemeColors,
): ButtonColors => {
	const baseColors = getButtonColors(variant, theme);

	// For filled and tonal variants, use a more muted background
	if (variant === "filled" || variant === "tonal") {
		return {
			background: theme.surface.raised,
			text: theme.text.disabled,
		};
	}

	// For outlined and text variants, keep the same structure but use disabled colors
	return {
		...baseColors,
		text: theme.text.disabled,
		border: baseColors.border ? theme.border.subtle : undefined,
	};
};
