/**
 * Color Utilities for MoodNote
 * Provides WCAG 2.1 compliant contrast ratio calculations and color manipulation
 */

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color string (e.g., "#FFFFFF" or "#FFF")
 * @returns RGB object with r, g, b values (0-255)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	// Remove the hash if present
	const cleanHex = hex.replace("#", "");

	// Handle 3-digit hex codes
	const fullHex =
		cleanHex.length === 3
			? cleanHex
					.split("")
					.map((char) => char + char)
					.join("")
			: cleanHex;

	const r = parseInt(fullHex.substring(0, 2), 16);
	const g = parseInt(fullHex.substring(2, 4), 16);
	const b = parseInt(fullHex.substring(4, 6), 16);

	return { r, g, b };
}

/**
 * Converts RGB to relative luminance according to WCAG 2.1
 * @param rgb - RGB object with r, g, b values (0-255)
 * @returns Relative luminance value (0-1)
 */
export function getRelativeLuminance(rgb: {
	r: number;
	g: number;
	b: number;
}): number {
	// Convert RGB to sRGB
	const rsRGB = rgb.r / 255;
	const gsRGB = rgb.g / 255;
	const bsRGB = rgb.b / 255;

	// Apply gamma correction
	const r =
		rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
	const g =
		gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
	const b =
		bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

	// Calculate relative luminance
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates contrast ratio between two colors according to WCAG 2.1
 * @param color1 - First color (hex format)
 * @param color2 - Second color (hex format)
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);

	const l1 = getRelativeLuminance(rgb1);
	const l2 = getRelativeLuminance(rgb2);

	// Ensure L1 is the lighter color
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);

	// Calculate contrast ratio
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG compliance levels and their requirements
 */
export const WCAG_STANDARDS = {
	AA: {
		normalText: 4.5, // Normal text (< 18pt or < 14pt bold)
		largeText: 3.0, // Large text (>= 18pt or >= 14pt bold)
		uiComponents: 3.0, // UI components and graphical objects
	},
	AAA: {
		normalText: 7.0, // Enhanced normal text
		largeText: 4.5, // Enhanced large text
		uiComponents: 3.0, // UI components (same as AA)
	},
} as const;

/**
 * Checks if a contrast ratio meets WCAG standards
 * @param ratio - Contrast ratio to check
 * @param level - WCAG level ('AA' or 'AAA')
 * @param type - Content type ('text', 'largeText', or 'ui')
 * @returns true if the ratio meets the standard
 */
export function meetsWCAGStandard(
	ratio: number,
	level: "AA" | "AAA" = "AA",
	type: "text" | "largeText" | "ui" = "text"
): boolean {
	const standard = WCAG_STANDARDS[level];

	switch (type) {
		case "text":
			return ratio >= standard.normalText;
		case "largeText":
			return ratio >= standard.largeText;
		case "ui":
			return ratio >= standard.uiComponents;
		default:
			return false;
	}
}

/**
 * Gets a human-readable compliance status
 * @param ratio - Contrast ratio
 * @returns Compliance status object
 */
export function getComplianceStatus(ratio: number): {
	ratio: number;
	AA: {
		text: boolean;
		largeText: boolean;
		ui: boolean;
	};
	AAA: {
		text: boolean;
		largeText: boolean;
		ui: boolean;
	};
	rating: "Poor" | "Fair" | "Good" | "Excellent";
} {
	return {
		ratio: Math.round(ratio * 100) / 100,
		AA: {
			text: meetsWCAGStandard(ratio, "AA", "text"),
			largeText: meetsWCAGStandard(ratio, "AA", "largeText"),
			ui: meetsWCAGStandard(ratio, "AA", "ui"),
		},
		AAA: {
			text: meetsWCAGStandard(ratio, "AAA", "text"),
			largeText: meetsWCAGStandard(ratio, "AAA", "largeText"),
			ui: meetsWCAGStandard(ratio, "AAA", "ui"),
		},
		rating:
			ratio >= 7
				? "Excellent"
				: ratio >= 4.5
					? "Good"
					: ratio >= 3
						? "Fair"
						: "Poor",
	};
}

/**
 * Lighten or darken a color by a percentage
 * @param hex - Hex color string
 * @param percent - Percentage to lighten (positive) or darken (negative)
 * @returns New hex color
 */
export function adjustBrightness(hex: string, percent: number): string {
	const rgb = hexToRgb(hex);

	const adjust = (value: number) => {
		const adjusted = value + (value * percent) / 100;
		return Math.max(0, Math.min(255, Math.round(adjusted)));
	};

	const r = adjust(rgb.r);
	const g = adjust(rgb.g);
	const b = adjust(rgb.b);

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Suggests a color adjustment to meet a target contrast ratio
 * @param color - Color to adjust (hex)
 * @param background - Background color (hex)
 * @param targetRatio - Target contrast ratio
 * @returns Adjusted color or null if target is impossible
 */
export function suggestColorForContrast(
	color: string,
	background: string,
	targetRatio: number
): string | null {
	const currentRatio = getContrastRatio(color, background);

	// If already meets target, return original
	if (currentRatio >= targetRatio) {
		return color;
	}

	const bgLuminance = getRelativeLuminance(hexToRgb(background));

	// Try brightening or darkening incrementally
	for (let percent = 10; percent <= 100; percent += 5) {
		// Try lightening
		const lighter = adjustBrightness(color, percent);
		if (getContrastRatio(lighter, background) >= targetRatio) {
			return lighter;
		}

		// Try darkening
		const darker = adjustBrightness(color, -percent);
		if (getContrastRatio(darker, background) >= targetRatio) {
			return darker;
		}
	}

	// If we can't reach target, return pure white or black
	return bgLuminance > 0.5 ? "#000000" : "#FFFFFF";
}

/**
 * Batch check multiple color pairs
 * @param pairs - Array of color pairs to check
 * @returns Array of compliance results
 */
export function batchCheckContrast(
	pairs: Array<{ color1: string; color2: string; label?: string }>
): Array<{
	label?: string;
	color1: string;
	color2: string;
	compliance: ReturnType<typeof getComplianceStatus>;
}> {
	return pairs.map((pair) => ({
		label: pair.label,
		color1: pair.color1,
		color2: pair.color2,
		compliance: getComplianceStatus(
			getContrastRatio(pair.color1, pair.color2)
		),
	}));
}

/**
 * Formats a compliance result for console output
 * @param result - Compliance result from batchCheckContrast
 * @returns Formatted string
 */
export function formatComplianceResult(result: {
	label?: string;
	color1: string;
	color2: string;
	compliance: ReturnType<typeof getComplianceStatus>;
}): string {
	const { label, color1, color2, compliance } = result;
	const aaText = compliance.AA.text ? "✓" : "✗";
	const aaaText = compliance.AAA.text ? "✓" : "✗";

	return `${label || `${color1} on ${color2}`}: ${compliance.ratio}:1 (${compliance.rating}) - AA: ${aaText} | AAA: ${aaaText}`;
}
