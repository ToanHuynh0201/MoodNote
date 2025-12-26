/**
 * Color Validation Script
 * Run this to verify all color pairs meet WCAG standards
 *
 * Usage: npx ts-node scripts/validateColors.ts
 */

import {
	batchCheckContrast,
	formatComplianceResult,
} from "../src/utils/colorUtils";

console.log("🎨 MoodNote Color Validation\n");
console.log("=" . repeat(60));

// Light Theme Tests
console.log("\n📱 LIGHT MODE");
console.log("-" . repeat(60));

const lightModeTests = [
	{
		color1: "#1F2937",
		color2: "#FFFFFF",
		label: "Text Primary / Background",
	},
	{
		color1: "#4B5563",
		color2: "#FFFFFF",
		label: "Text Secondary / Background",
	},
	{
		color1: "#9333EA",
		color2: "#FFFFFF",
		label: "Primary Brand / Background",
	},
	{
		color1: "#C026D3",
		color2: "#FFFFFF",
		label: "Accent Warm / Background",
	},
	{
		color1: "#E9D5FF",
		color2: "#FFFFFF",
		label: "Border Main / Background",
	},
];

const lightResults = batchCheckContrast(lightModeTests);
lightResults.forEach((result) => {
	console.log(formatComplianceResult(result));
});

// Dark Theme Tests
console.log("\n🌙 DARK MODE");
console.log("-" . repeat(60));

const darkModeTests = [
	{
		color1: "#F9FAFB",
		color2: "#0F0A1A",
		label: "Text Primary / Background",
	},
	{
		color1: "#E5E7EB",
		color2: "#0F0A1A",
		label: "Text Secondary / Background",
	},
	{
		color1: "#C084FC",
		color2: "#0F0A1A",
		label: "Primary Brand / Background",
	},
	{
		color1: "#F0ABFC",
		color2: "#0F0A1A",
		label: "Accent Warm / Background",
	},
	{
		color1: "#581C87",
		color2: "#0F0A1A",
		label: "Border Light / Background (FIXED)",
	},
	{
		color1: "#6B21A8",
		color2: "#0F0A1A",
		label: "Border Main / Background (FIXED)",
	},
	{
		color1: "#7E22CE",
		color2: "#0F0A1A",
		label: "Border Dark / Background (FIXED)",
	},
];

const darkResults = batchCheckContrast(darkModeTests);
darkResults.forEach((result) => {
	console.log(formatComplianceResult(result));
});

// Status Colors - Dark Mode
console.log("\n✅ STATUS COLORS (Dark Mode)");
console.log("-" . repeat(60));

const statusTests = [
	{ color1: "#34D399", color2: "#0F0A1A", label: "Success (FIXED)" },
	{ color1: "#FBBF24", color2: "#0F0A1A", label: "Warning (FIXED)" },
	{ color1: "#F87171", color2: "#0F0A1A", label: "Error (FIXED)" },
	{ color1: "#60A5FA", color2: "#0F0A1A", label: "Info (FIXED)" },
];

const statusResults = batchCheckContrast(statusTests);
statusResults.forEach((result) => {
	console.log(formatComplianceResult(result));
});

// Emotion Colors - Dark Mode
console.log("\n😊 EMOTION COLORS (Dark Mode)");
console.log("-" . repeat(60));

const emotionTests = [
	{ color1: "#FCD34D", color2: "#0F0A1A", label: "Happy" },
	{ color1: "#F9A8D4", color2: "#0F0A1A", label: "Excited" },
	{ color1: "#6EE7B7", color2: "#0F0A1A", label: "Calm" },
	{ color1: "#93C5FD", color2: "#0F0A1A", label: "Sad" },
	{ color1: "#C4B5FD", color2: "#0F0A1A", label: "Anxious" },
	{ color1: "#FCA5A5", color2: "#0F0A1A", label: "Angry" },
	{ color1: "#CBD5E1", color2: "#0F0A1A", label: "Tired" },
	{ color1: "#FDBA74", color2: "#0F0A1A", label: "Grateful" },
];

const emotionResults = batchCheckContrast(emotionTests);
emotionResults.forEach((result) => {
	console.log(formatComplianceResult(result));
});

// Summary
console.log("\n" + "=" . repeat(60));
console.log("📊 SUMMARY");
console.log("=" . repeat(60));

const allResults = [
	...lightResults,
	...darkResults,
	...statusResults,
	...emotionResults,
];

const excellent = allResults.filter((r) => r.compliance.rating === "Excellent")
	.length;
const good = allResults.filter((r) => r.compliance.rating === "Good").length;
const fair = allResults.filter((r) => r.compliance.rating === "Fair").length;
const poor = allResults.filter((r) => r.compliance.rating === "Poor").length;

console.log(`Total Pairs Tested: ${allResults.length}`);
console.log(`Excellent (≥7:1): ${excellent} ⭐`);
console.log(`Good (≥4.5:1): ${good} ✓`);
console.log(`Fair (≥3:1): ${fair} ⚠️`);
console.log(`Poor (<3:1): ${poor} ❌`);

const aaTextPass = allResults.filter((r) => r.compliance.AA.text).length;
const aaUIPass = allResults.filter((r) => r.compliance.AA.ui).length;
const aaaTextPass = allResults.filter((r) => r.compliance.AAA.text).length;

console.log(`\nWCAG AA (Text): ${aaTextPass}/${allResults.length} pass`);
console.log(`WCAG AA (UI): ${aaUIPass}/${allResults.length} pass`);
console.log(`WCAG AAA (Text): ${aaaTextPass}/${allResults.length} pass`);

if (poor === 0) {
	console.log("\n✅ All color pairs meet minimum WCAG standards!");
} else {
	console.log(`\n⚠️ Warning: ${poor} color pairs below WCAG standards`);
}

console.log("\n" + "=" . repeat(60));
