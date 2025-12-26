/**
 * Color Contrast Tests for MoodNote Theme
 * Verifies WCAG 2.1 compliance for all critical color pairs
 */

import {
	getContrastRatio,
	meetsWCAGStandard,
	getComplianceStatus,
	batchCheckContrast,
	formatComplianceResult,
} from "../colorUtils";

describe("Color Contrast Tests", () => {
	// Light Theme Colors
	const LIGHT_BG = "#FFFFFF";
	const LIGHT_TEXT_PRIMARY = "#1F2937";
	const LIGHT_TEXT_SECONDARY = "#4B5563";
	const LIGHT_PRIMARY = "#9333EA";
	const LIGHT_ACCENT_WARM = "#C026D3";
	const LIGHT_BORDER_MAIN = "#E9D5FF";

	// Dark Theme Colors
	const DARK_BG = "#0F0A1A";
	const DARK_TEXT_PRIMARY = "#F9FAFB";
	const DARK_TEXT_SECONDARY = "#E5E7EB";
	const DARK_PRIMARY = "#C084FC";
	const DARK_ACCENT_WARM = "#F0ABFC";
	const DARK_BORDER_LIGHT = "#581C87";
	const DARK_BORDER_MAIN = "#6B21A8";
	const DARK_BORDER_DARK = "#7E22CE";

	describe("Light Mode - Text Contrast", () => {
		test("Primary text meets AAA standard", () => {
			const ratio = getContrastRatio(LIGHT_TEXT_PRIMARY, LIGHT_BG);
			expect(ratio).toBeGreaterThanOrEqual(7); // AAA requires 7:1
			expect(meetsWCAGStandard(ratio, "AAA", "text")).toBe(true);
		});

		test("Secondary text meets AAA standard", () => {
			const ratio = getContrastRatio(LIGHT_TEXT_SECONDARY, LIGHT_BG);
			expect(ratio).toBeGreaterThanOrEqual(7);
			expect(meetsWCAGStandard(ratio, "AAA", "text")).toBe(true);
		});

		test("Primary color meets AA standard", () => {
			const ratio = getContrastRatio(LIGHT_PRIMARY, LIGHT_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5); // AA requires 4.5:1
			expect(meetsWCAGStandard(ratio, "AA", "text")).toBe(true);
		});
	});

	describe("Dark Mode - Text Contrast", () => {
		test("Primary text meets AAA standard", () => {
			const ratio = getContrastRatio(DARK_TEXT_PRIMARY, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(7);
			expect(meetsWCAGStandard(ratio, "AAA", "text")).toBe(true);
		});

		test("Secondary text meets AAA standard", () => {
			const ratio = getContrastRatio(DARK_TEXT_SECONDARY, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(7);
			expect(meetsWCAGStandard(ratio, "AAA", "text")).toBe(true);
		});

		test("Primary color meets AA standard", () => {
			const ratio = getContrastRatio(DARK_PRIMARY, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5);
			expect(meetsWCAGStandard(ratio, "AA", "text")).toBe(true);
		});
	});

	describe("Dark Mode - Border Contrast (FIXED)", () => {
		test("Border light meets UI component standard (3:1)", () => {
			const ratio = getContrastRatio(DARK_BORDER_LIGHT, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(3);
			expect(meetsWCAGStandard(ratio, "AA", "ui")).toBe(true);
		});

		test("Border main meets UI component standard (3:1)", () => {
			const ratio = getContrastRatio(DARK_BORDER_MAIN, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(3);
			expect(meetsWCAGStandard(ratio, "AA", "ui")).toBe(true);
		});

		test("Border dark meets UI component standard (3:1)", () => {
			const ratio = getContrastRatio(DARK_BORDER_DARK, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(3);
			expect(meetsWCAGStandard(ratio, "AA", "ui")).toBe(true);
		});
	});

	describe("Accent Colors - Mode Separation", () => {
		test("Light mode accent has better contrast than dark mode accent", () => {
			const lightRatio = getContrastRatio(LIGHT_ACCENT_WARM, LIGHT_BG);
			const darkAccentOnLight = getContrastRatio(DARK_ACCENT_WARM, LIGHT_BG);

			// Light mode accent should be darker (higher contrast on white)
			expect(lightRatio).toBeGreaterThan(darkAccentOnLight);
		});

		test("Dark mode accent is visible on dark background", () => {
			const ratio = getContrastRatio(DARK_ACCENT_WARM, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(3); // UI components minimum
		});
	});

	describe("Status Colors - Dark Mode", () => {
		const DARK_SUCCESS = "#34D399";
		const DARK_WARNING = "#FBBF24";
		const DARK_ERROR = "#F87171";
		const DARK_INFO = "#60A5FA";

		test("Success color meets AA standard", () => {
			const ratio = getContrastRatio(DARK_SUCCESS, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5);
		});

		test("Warning color meets AA standard", () => {
			const ratio = getContrastRatio(DARK_WARNING, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5);
		});

		test("Error color meets AA standard", () => {
			const ratio = getContrastRatio(DARK_ERROR, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5);
		});

		test("Info color meets AA standard", () => {
			const ratio = getContrastRatio(DARK_INFO, DARK_BG);
			expect(ratio).toBeGreaterThanOrEqual(4.5);
		});
	});

	describe("Emotion Colors - Dark Mode Brightness", () => {
		const emotions = {
			happy: "#FCD34D",
			excited: "#F9A8D4",
			calm: "#6EE7B7",
			sad: "#93C5FD",
			anxious: "#C4B5FD",
			angry: "#FCA5A5",
			tired: "#CBD5E1",
			grateful: "#FDBA74",
		};

		Object.entries(emotions).forEach(([name, color]) => {
			test(`${name} emotion color meets UI standard (3:1)`, () => {
				const ratio = getContrastRatio(color, DARK_BG);
				expect(ratio).toBeGreaterThanOrEqual(3);
				expect(meetsWCAGStandard(ratio, "AA", "ui")).toBe(true);
			});
		});
	});

	describe("Batch Contrast Checking", () => {
		test("All critical dark mode pairs pass compliance", () => {
			const pairs = [
				{
					color1: DARK_TEXT_PRIMARY,
					color2: DARK_BG,
					label: "Dark Text Primary",
				},
				{
					color1: DARK_TEXT_SECONDARY,
					color2: DARK_BG,
					label: "Dark Text Secondary",
				},
				{ color1: DARK_BORDER_LIGHT, color2: DARK_BG, label: "Dark Border Light" },
				{ color1: DARK_BORDER_MAIN, color2: DARK_BG, label: "Dark Border Main" },
				{ color1: DARK_BORDER_DARK, color2: DARK_BG, label: "Dark Border Dark" },
			];

			const results = batchCheckContrast(pairs);

			results.forEach((result) => {
				if (result.label?.includes("Text")) {
					// Text must meet AA for normal text (4.5:1)
					expect(result.compliance.AA.text).toBe(true);
				} else if (result.label?.includes("Border")) {
					// Borders must meet UI standard (3:1)
					expect(result.compliance.AA.ui).toBe(true);
				}
			});
		});

		test("Format compliance results correctly", () => {
			const result = {
				label: "Test Color",
				color1: "#FFFFFF",
				color2: "#000000",
				compliance: getComplianceStatus(21),
			};

			const formatted = formatComplianceResult(result);
			expect(formatted).toContain("Test Color");
			expect(formatted).toContain("21:1");
			expect(formatted).toContain("✓");
		});
	});

	describe("Compliance Status", () => {
		test("Excellent rating for 7+ contrast", () => {
			const status = getComplianceStatus(15);
			expect(status.rating).toBe("Excellent");
			expect(status.AAA.text).toBe(true);
		});

		test("Good rating for 4.5-7 contrast", () => {
			const status = getComplianceStatus(5);
			expect(status.rating).toBe("Good");
			expect(status.AA.text).toBe(true);
			expect(status.AAA.text).toBe(false);
		});

		test("Fair rating for 3-4.5 contrast", () => {
			const status = getComplianceStatus(3.5);
			expect(status.rating).toBe("Fair");
			expect(status.AA.largeText).toBe(true);
			expect(status.AA.text).toBe(false);
		});

		test("Poor rating for < 3 contrast", () => {
			const status = getComplianceStatus(2.5);
			expect(status.rating).toBe("Poor");
			expect(status.AA.ui).toBe(false);
		});
	});
});
