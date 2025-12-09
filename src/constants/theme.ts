export const FONTS = {
	regular: "Segoe UI",
	italic: "Segoe UI Italic",
	bold: "Segoe UI Bold",
	boldItalic: "Segoe UI Bold Italic",
	decorative: "Pacifico",
};

// Material 3 Typography Scale
export const TYPOGRAPHY = {
	// Display styles - largest text
	displayLarge: {
		fontFamily: FONTS.regular,
		fontSize: 57,
		lineHeight: 64,
		letterSpacing: -0.25,
		fontWeight: "400" as const,
	},
	displayMedium: {
		fontFamily: FONTS.regular,
		fontSize: 45,
		lineHeight: 52,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	displaySmall: {
		fontFamily: FONTS.regular,
		fontSize: 36,
		lineHeight: 44,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},

	// Headline styles - high-emphasis text
	headlineLarge: {
		fontFamily: FONTS.regular,
		fontSize: 32,
		lineHeight: 40,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	headlineMedium: {
		fontFamily: FONTS.regular,
		fontSize: 28,
		lineHeight: 36,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	headlineSmall: {
		fontFamily: FONTS.regular,
		fontSize: 24,
		lineHeight: 32,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},

	// Title styles - medium-emphasis text
	titleLarge: {
		fontFamily: FONTS.regular,
		fontSize: 22,
		lineHeight: 28,
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	titleMedium: {
		fontFamily: FONTS.bold,
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.15,
		fontWeight: "700" as const,
	},
	titleSmall: {
		fontFamily: FONTS.bold,
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.1,
		fontWeight: "700" as const,
	},

	// Body styles - for long-form writing
	bodyLarge: {
		fontFamily: FONTS.regular,
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.5,
		fontWeight: "400" as const,
	},
	bodyMedium: {
		fontFamily: FONTS.regular,
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.25,
		fontWeight: "400" as const,
	},
	bodySmall: {
		fontFamily: FONTS.regular,
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0.4,
		fontWeight: "400" as const,
	},

	// Label styles - for UI elements like buttons
	labelLarge: {
		fontFamily: FONTS.bold,
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.1,
		fontWeight: "700" as const,
	},
	labelMedium: {
		fontFamily: FONTS.bold,
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0.5,
		fontWeight: "700" as const,
	},
	labelSmall: {
		fontFamily: FONTS.bold,
		fontSize: 11,
		lineHeight: 16,
		letterSpacing: 0.5,
		fontWeight: "700" as const,
	},
};

export const COLORS = {
	// Brand Colors - Màu thương hiệu
	primary: {
		100: "#FFFFFF",
		200: "#EFECFB",
		300: "#DFDBF9",
		400: "#C8BEF4",
		500: "#AC99EC",
		600: "#8F6FE3",
		700: "#7C4DD6",
		800: "#5C34A3",
		900: "#2F1B5A",
	},

	secondary: {
		100: "#f9f1ffff",
		200: "#F5E7FF",
		300: "#DFB2FF",
		400: "#C97BFF",
		500: "#A225F8",
		600: "#7617B2",
		700: "#410068",
		800: "#25003B",
		900: "#06000A",
	},

	// Emotion Colors - Màu cho các cảm xúc
	emotions: {
		happy: "#FFD93D", // Vàng tươi - Vui vẻ
		excited: "#FF6B9D", // Hồng sáng - Hào hứng
		calm: "#6BCF7F", // Xanh lá nhẹ - Bình thản
		sad: "#5B8DEF", // Xanh dương - Buồn
		anxious: "#A78BFA", // Tím nhạt - Lo lắng
		angry: "#F87171", // Đỏ cam - Tức giận
		tired: "#94A3B8", // Xám xanh - Mệt mỏi
		grateful: "#FDB777", // Cam nhẹ - Biết ơn
	},

	// Neutral Colors - Màu trung tính
	neutral: {
		50: "#FAFAFA",
		100: "#F5F5F5",
		200: "#E5E5E5",
		300: "#D4D4D4",
		400: "#A3A3A3",
		500: "#737373",
		600: "#525252",
		700: "#404040",
		800: "#262626",
		900: "#171717",
	},

	// Semantic Colors - Màu ngữ nghĩa
	success: {
		light: "#D1FAE5",
		main: "#10B981",
		dark: "#059669",
	},
	warning: {
		light: "#FEF3C7",
		main: "#F59E0B",
		dark: "#D97706",
	},
	error: {
		light: "#FEE2E2",
		main: "#EF4444",
		dark: "#DC2626",
	},
	info: {
		light: "#DBEAFE",
		main: "#3B82F6",
		dark: "#2563EB",
	},
} as const;

export const lightTheme = {
	// Background
	background: {
		primary: "#FFFFFF",
		secondary: "#F8FAFC",
		tertiary: "#F1F5F9",
		elevated: "#FFFFFF",
		gradient: [
			"#7C4DD6",
			"#C8B8E8",
			"#E8DFF5",
			"#F5F1FF",
			"#FAFAFF",
		] as const,
	},

	// Text
	text: {
		primary: "#5C34A3",
		secondary: "#7C4DD6",
		tertiary: "#2A40D4",
		disabled: "#CBD5E1",
		inverse: "#FFFFFF",
	},

	// Surface
	surface: {
		primary: "#FFFFFF",
		secondary: "#F8FAFC",
		elevated: "#FFFFFF",
		overlay: "rgba(0, 0, 0, 0.5)",
	},

	// Border
	border: {
		light: "#E2E8F0",
		main: "#CBD5E1",
		dark: "#94A3B8",
	},

	// Brand
	primary: COLORS.primary[500],
	primaryLight: COLORS.primary[100],
	primaryDark: COLORS.primary[700],

	secondary: COLORS.secondary[500],
	secondaryLight: COLORS.secondary[100],
	secondaryDark: COLORS.secondary[700],

	// Emotions
	emotions: COLORS.emotions,

	// Status
	success: COLORS.success.main,
	warning: COLORS.warning.main,
	error: COLORS.error.main,
	info: COLORS.info.main,

	// Special
	shadow: "rgba(0, 0, 0, 0.1)",
	shadowMedium: "rgba(0, 0, 0, 0.15)",
	shadowLarge: "rgba(0, 0, 0, 0.2)",

	// Chart COLORS
	chart: {
		positive: "#10B981",
		negative: "#EF4444",
		neutral: "#6B7280",
		gradient1: "#6366F1",
		gradient2: "#06B6D4",
	},
} as const;

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
		return color.replace(/[\d.]+\)$/g, `${opacity})`);
	}
	return color;
};

// Dark Mode Theme
export const darkTheme = {
	// Background
	background: {
		primary: "#0F172A", // Slate 900
		secondary: "#1E293B", // Slate 800
		tertiary: "#334155", // Slate 700
		elevated: "#1E293B",
		gradient: [
			"#2D1B4E",
			"#3D2B5E",
			"#2B2640",
			"#1F1F2E",
			"#15151F",
		] as const,
	},

	// Text
	text: {
		primary: "#F1F5F9", // Slate 100
		secondary: "#CBD5E1", // Slate 300
		tertiary: "#94A3B8", // Slate 400
		disabled: "#64748B", // Slate 500
		inverse: "#0F172A",
	},

	// Surface
	surface: {
		primary: "#1E293B",
		secondary: "#334155",
		elevated: "#475569",
		overlay: "rgba(0, 0, 0, 0.7)",
	},

	// Border
	border: {
		light: "#334155",
		main: "#475569",
		dark: "#64748B",
	},

	// Brand
	primary: COLORS.primary[400],
	primaryLight: COLORS.primary[300],
	primaryDark: COLORS.primary[600],

	secondary: COLORS.secondary[400],
	secondaryLight: COLORS.secondary[300],
	secondaryDark: COLORS.secondary[600],

	// Emotions (adjusted for dark mode)
	emotions: {
		happy: "#FDE047", // Vàng sáng hơn cho dark mode
		excited: "#FB7185", // Hồng sáng hơn
		calm: "#86EFAC", // Xanh lá sáng hơn
		sad: "#60A5FA", // Xanh dương sáng hơn
		anxious: "#C4B5FD", // Tím sáng hơn
		angry: "#FCA5A5", // Đỏ sáng hơn
		tired: "#CBD5E1", // Xám sáng hơn
		grateful: "#FDBA74", // Cam sáng hơn
	},

	// Status
	success: COLORS.success.main,
	warning: COLORS.warning.main,
	error: COLORS.error.main,
	info: COLORS.info.main,

	// Special
	shadow: "rgba(0, 0, 0, 0.3)",
	shadowMedium: "rgba(0, 0, 0, 0.4)",
	shadowLarge: "rgba(0, 0, 0, 0.5)",

	// Chart colors
	chart: {
		positive: "#34D399",
		negative: "#F87171",
		neutral: "#9CA3AF",
		gradient1: "#818CF8",
		gradient2: "#22D3EE",
	},
} as const;

export type ColorPalette = typeof COLORS;
export type EmotionColors = typeof COLORS.emotions;

// Define a more flexible ThemeColors type that works for both light and dark themes
export interface ThemeColors {
	background: {
		primary: string;
		secondary: string;
		tertiary: string;
		elevated: string;
		gradient: readonly string[];
	};
	text: {
		primary: string;
		secondary: string;
		tertiary: string;
		disabled: string;
		inverse: string;
	};
	surface: {
		primary: string;
		secondary: string;
		elevated: string;
		overlay: string;
	};
	border: {
		light: string;
		main: string;
		dark: string;
	};
	primary: string;
	primaryLight: string;
	primaryDark: string;
	secondary: string;
	secondaryLight: string;
	secondaryDark: string;
	emotions: {
		happy: string;
		excited: string;
		calm: string;
		sad: string;
		anxious: string;
		angry: string;
		tired: string;
		grateful: string;
	};
	success: string;
	warning: string;
	error: string;
	info: string;
	shadow: string;
	shadowMedium: string;
	shadowLarge: string;
	chart: {
		positive: string;
		negative: string;
		neutral: string;
		gradient1: string;
		gradient2: string;
	};
}

export default {
	COLORS,
	lightTheme,
	darkTheme,
	withOpacity,
};
