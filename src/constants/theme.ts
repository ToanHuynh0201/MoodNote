import { moderateScale } from "@/utils/responsive";

export const FONTS = {
	regular: "Segoe UI",
	italic: "Segoe UI Italic",
	bold: "Segoe UI Bold",
	boldItalic: "Segoe UI Bold Italic",
	decorative: "Pacifico",
};

// Mobile-optimized Typography Scale (adapted from Material 3)
// Using moderateScale with factor 0.5 for responsive font sizes
export const TYPOGRAPHY = {
	// Display styles - largest text (reduced for mobile)
	displayLarge: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(40),
		lineHeight: moderateScale(48),
		letterSpacing: -0.25,
		fontWeight: "400" as const,
	},
	displayMedium: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(34),
		lineHeight: moderateScale(40),
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	displaySmall: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(28),
		lineHeight: moderateScale(36),
		letterSpacing: 0,
		fontWeight: "400" as const,
	},

	// Headline styles - high-emphasis text
	headlineLarge: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(24),
		lineHeight: moderateScale(32),
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	headlineMedium: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(22),
		lineHeight: moderateScale(28),
		letterSpacing: 0,
		fontWeight: "400" as const,
	},
	headlineSmall: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(20),
		lineHeight: moderateScale(28),
		letterSpacing: 0,
		fontWeight: "400" as const,
	},

	// Title styles - medium-emphasis text
	titleLarge: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(18),
		lineHeight: moderateScale(26),
		letterSpacing: 0,
		fontWeight: "700" as const,
	},
	titleMedium: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(16),
		lineHeight: moderateScale(24),
		letterSpacing: 0.15,
		fontWeight: "700" as const,
	},
	titleSmall: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(14),
		lineHeight: moderateScale(22),
		letterSpacing: 0.1,
		fontWeight: "700" as const,
	},

	// Body styles - for long-form writing
	bodyLarge: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(16),
		lineHeight: moderateScale(24),
		letterSpacing: 0.5,
		fontWeight: "400" as const,
	},
	bodyMedium: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(14),
		lineHeight: moderateScale(20),
		letterSpacing: 0.25,
		fontWeight: "400" as const,
	},
	bodySmall: {
		fontFamily: FONTS.regular,
		fontSize: moderateScale(12),
		lineHeight: moderateScale(16),
		letterSpacing: 0.4,
		fontWeight: "400" as const,
	},

	// Label styles - for UI elements like buttons
	labelLarge: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(14),
		lineHeight: moderateScale(20),
		letterSpacing: 0.1,
		fontWeight: "700" as const,
	},
	labelMedium: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(12),
		lineHeight: moderateScale(16),
		letterSpacing: 0.5,
		fontWeight: "700" as const,
	},
	labelSmall: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(11),
		lineHeight: moderateScale(16),
		letterSpacing: 0.5,
		fontWeight: "700" as const,
	},
};

export const COLORS = {
	// Brand Colors - Màu tím chủ đạo (Purple theme)
	primary: {
		50: "#FAF5FF", // Tím cực nhạt
		100: "#F3E8FF", // Tím rất nhạt - background
		200: "#E9D5FF", // Tím nhạt
		300: "#D8B4FE", // Tím pastel
		400: "#C084FC", // Tím lavender
		500: "#A855F7", // Tím chính (main purple)
		600: "#9333EA", // Tím đậm
		700: "#7E22CE", // Tím rất đậm
		800: "#6B21A8", // Tím tối
		900: "#581C87", // Tím đen
		950: "#3B0764", // Tím cực tối
	},

	secondary: {
		50: "#FDF4FF", // Hồng tím cực nhạt
		100: "#FAE8FF", // Hồng tím nhạt
		200: "#F5D0FE", // Hồng tím pastel
		300: "#F0ABFC", // Hồng tím sáng
		400: "#E879F9", // Hồng tím
		500: "#D946EF", // Hồng tím đậm
		600: "#C026D3", // Hồng tím rất đậm
		700: "#A21CAF", // Hồng tím tối
		800: "#86198F", // Hồng tím cực tối
		900: "#701A75", // Hồng tím đen
	},

	// Emotion Colors - Màu cảm xúc
	emotions: {
		happy: "#FBBF24", // Vàng ấm - Vui vẻ
		excited: "#F472B6", // Hồng sáng - Hào hứng
		calm: "#34D399", // Xanh lá - Bình thản
		sad: "#60A5FA", // Xanh dương - Buồn
		anxious: "#A78BFA", // Tím nhạt - Lo lắng
		angry: "#F87171", // Đỏ - Tức giận
		tired: "#94A3B8", // Xám xanh - Mệt mỏi
		grateful: "#FB923C", // Cam - Biết ơn
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
		950: "#0A0A0A",
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
	// Background - Nền sáng, thoáng đãng
	background: {
		primary: "#FFFFFF", // Nền trắng chính
		secondary: "#FAF5FF", // Nền tím cực nhạt cho cards
		tertiary: "#F3E8FF", // Nền tím nhạt
		elevated: "#FFFFFF", // Nền cho elevated elements
		gradient: [
			"#FFFFFF", // Trắng ở giữa
			"#FAF5FF", // Tím cực nhạt
			"#F3E8FF", // Tím nhạt hơn
			"#E9D5FF", // Tím pastel
		] as const,
	},

	// Text - Text tối trên nền sáng (độ tương phản tốt)
	text: {
		primary: "#1F2937", // Xám đen - text chính (dễ đọc)
		secondary: "#4B5563", // Xám tối - text phụ
		tertiary: "#6B7280", // Xám medium - text tertiary
		disabled: "#9CA3AF", // Xám nhạt - disabled
		inverse: "#FFFFFF", // Trắng - text trên nền tối
		bold: "#111827", // Đen - text đậm
	},

	// Surface
	surface: {
		primary: "#FFFFFF",
		secondary: "#FAF5FF",
		elevated: "#FFFFFF",
		overlay: "rgba(0, 0, 0, 0.5)",
	},

	// Border
	border: {
		light: "#F3E8FF", // Tím cực nhạt
		main: "#E9D5FF", // Tím nhạt
		dark: "#D8B4FE", // Tím pastel
	},

	// Brand - Màu tím chủ đạo
	primary: COLORS.primary[600], // Tím đậm cho primary
	primaryLight: COLORS.primary[100], // Tím nhạt
	primaryDark: COLORS.primary[700], // Tím rất đậm

	secondary: COLORS.secondary[500], // Hồng tím
	secondaryLight: COLORS.secondary[100], // Hồng tím nhạt
	secondaryDark: COLORS.secondary[700], // Hồng tím đậm

	// Accent Colors
	accent: {
		warm: "#F0ABFC", // Hồng tím sáng
		soft: "#E879F9", // Hồng tím
		lavender: "#C084FC", // Tím lavender
	},

	// Emotions
	emotions: COLORS.emotions,

	// Status
	success: COLORS.success.main,
	warning: COLORS.warning.main,
	error: COLORS.error.main,
	info: COLORS.info.main,

	// Special
	shadow: "rgba(0, 0, 0, 0.08)",
	shadowMedium: "rgba(0, 0, 0, 0.12)",
	shadowLarge: "rgba(0, 0, 0, 0.16)",

	// Chart colors
	chart: {
		positive: "#10B981",
		negative: "#EF4444",
		neutral: "#6B7280",
		gradient1: "#A855F7", // Tím
		gradient2: "#D946EF", // Hồng tím
	},
} as const; // Dark Mode Theme - Nền tối với text sáng
export const darkTheme = {
	// Background - Nền tối với tông tím
	background: {
		primary: "#0F0A1A", // Tím đen cực tối
		secondary: "#1A0F2E", // Tím đen tối
		tertiary: "#2D1B4E", // Tím đen
		elevated: "#1A0F2E", // Elevated surface
		gradient: [
			"#0F0A1A", // Tím đen cực tối - bắt đầu
			"#1A0F2E", // Tím đen tối
			"#2D1B4E", // Tím đen
			"#3B0764", // Tím tối
		] as const,
	},

	// Text - Text sáng trên nền tối (độ tương phản tốt)
	text: {
		primary: "#F9FAFB", // Trắng nhẹ - text chính (dễ đọc)
		secondary: "#E5E7EB", // Xám sáng - text phụ
		tertiary: "#D1D5DB", // Xám - text tertiary
		disabled: "#9CA3AF", // Xám tối - disabled
		inverse: "#111827", // Đen - text trên nền sáng
		bold: "#FFFFFF", // Trắng - text đậm
	},

	// Surface
	surface: {
		primary: "#1A0F2E",
		secondary: "#2D1B4E",
		elevated: "#3B0764",
		overlay: "rgba(0, 0, 0, 0.75)",
	},

	// Border
	border: {
		light: "#2D1B4E", // Tím đen
		main: "#3B0764", // Tím tối
		dark: "#581C87", // Tím
	},

	// Brand - Màu tím sáng hơn cho dark mode
	primary: COLORS.primary[400], // Tím lavender
	primaryLight: COLORS.primary[200], // Tím nhạt
	primaryDark: COLORS.primary[600], // Tím đậm

	secondary: COLORS.secondary[400], // Hồng tím
	secondaryLight: COLORS.secondary[200], // Hồng tím nhạt
	secondaryDark: COLORS.secondary[600], // Hồng tím đậm

	// Accent Colors
	accent: {
		warm: "#F0ABFC", // Hồng tím sáng
		soft: "#E879F9", // Hồng tím
		lavender: "#C084FC", // Tím lavender
	},

	// Emotions (sáng hơn cho dark mode)
	emotions: {
		happy: "#FCD34D", // Vàng sáng
		excited: "#F9A8D4", // Hồng sáng
		calm: "#6EE7B7", // Xanh lá sáng
		sad: "#93C5FD", // Xanh dương sáng
		anxious: "#C4B5FD", // Tím sáng
		angry: "#FCA5A5", // Đỏ sáng
		tired: "#CBD5E1", // Xám sáng
		grateful: "#FDBA74", // Cam sáng
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
		gradient1: "#C084FC", // Tím lavender
		gradient2: "#F0ABFC", // Hồng tím sáng
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
		bold: string;
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
	accent: {
		warm: string;
		soft: string;
		lavender: string;
	};
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
