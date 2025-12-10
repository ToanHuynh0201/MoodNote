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
		lineHeight: moderateScale(24),
		letterSpacing: 0,
		fontWeight: "700" as const,
	},
	titleMedium: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(16),
		lineHeight: moderateScale(22),
		letterSpacing: 0.15,
		fontWeight: "700" as const,
	},
	titleSmall: {
		fontFamily: FONTS.bold,
		fontSize: moderateScale(14),
		lineHeight: moderateScale(20),
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
	// Brand Colors - Màu thương hiệu (tone tím nhẹ nhàng cho app sức khỏe tinh thần)
	primary: {
		100: "#FAF7FF", // Tím cực nhạt - background thoáng
		200: "#F0E8FF", // Tím rất nhạt
		300: "#E0D4F7", // Tím pastel nhẹ
		400: "#C5B3E6", // Tím lavender
		500: "#9B7FDB", // Tím chính (main purple)
		600: "#8268C8", // Tím medium
		700: "#6B50B5", // Tím đậm
		800: "#543D9E", // Tím rất đậm
		900: "#3D2870", // Tím đen
	},

	secondary: {
		100: "#FFF5FB", // Hồng tím cực nhạt
		200: "#FFE8F7", // Hồng pastel nhẹ nhàng
		300: "#FFD6F0", // Hồng tím pastel
		400: "#F5C2E7", // Hồng lavender
		500: "#E5A4D5", // Hồng tím soft
		600: "#D084C4", // Hồng tím ấm
		700: "#B865AB", // Hồng tím đậm
		800: "#9B4D92", // Hồng tím rất đậm
		900: "#7A3575", // Hồng tím đen
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
	// Background - Tông màu nhẹ nhàng, thoáng đãng
	background: {
		primary: "#FAF7FF", // Nền tím cực nhạt, thoáng mát
		secondary: "#FFFFFF", // Nền trắng cho cards
		tertiary: "#F0E8FF", // Nền tím rất nhạt
		elevated: "#FFFFFF",
		// Radial gradient: trắng ở giữa, tím pastel đậm ở góc (theo thiết kế)
		gradient: [
			"#FFFFFF", // Trắng ở trung tâm
			"#F5EFFF", // Tím cực nhạt - base
			"#E8DEFF", // Tím nhạt
			"#BFA8E8", // Tím pastel đậm ở góc
			"#9B7FDB", // Tím chính (đậm hơn)
		] as const,
	},

	// Text - Dùng màu tím để phù hợp với theme
	text: {
		primary: "#6B50B5", // Tím đậm cho text chính
		secondary: "#8268C8", // Tím medium cho text phụ
		tertiary: "#9B7FDB", // Tím chính cho text tertiary/accent
		disabled: "#B5A8CC", // Tím xám nhạt
		inverse: "#FFFFFF",
		dark: "#2F1B5A",
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
		light: "#E8E0F0",
		main: "#D4C2E6",
		dark: "#9B7FDB",
	},

	// Brand - Sử dụng màu tím và hồng tím ấm áp
	primary: COLORS.primary[500],
	primaryLight: COLORS.primary[200],
	primaryDark: COLORS.primary[700],

	secondary: COLORS.secondary[500], // Hồng tím ấm áp
	secondaryLight: COLORS.secondary[200],
	secondaryDark: COLORS.secondary[700],

	// Accent Colors - Thêm màu accent ấm áp
	accent: {
		warm: "#FFD6F0", // Hồng pastel ấm áp
		soft: "#E5A4D5", // Hồng tím soft
		lavender: "#C5B3E6", // Lavender nhẹ nhàng
	},

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

// Dark Mode Theme - Tông tím ấm cho dark mode
export const darkTheme = {
	// Background
	background: {
		primary: "#1F1B2E", // Tím đen nhẹ
		secondary: "#2A2438", // Tím đen medium
		tertiary: "#3D2870", // Tím đậm
		elevated: "#2A2438",
		gradient: [
			"#1F1B2E", // Tím đen - BẮT ĐẦU từ tối
			"#2A2438", // Tím đen medium
			"#3D2870", // Tím đậm
			"#543D9E", // Tím medium
			"#6B50B5", // Tím sáng - KẾT THÚC sáng hơn
		] as const,
	},

	// Text
	text: {
		primary: "#F8F5FF", // Trắng tím rất nhạt
		secondary: "#E0D4F7", // Tím pastel sáng
		tertiary: "#C5B3E6", // Lavender
		disabled: "#8268C8", // Tím xám
		inverse: "#1F1B2E",
		dark: "#2F1B5A",
	},

	// Surface
	surface: {
		primary: "#2A2438",
		secondary: "#3D2870",
		elevated: "#543D9E",
		overlay: "rgba(0, 0, 0, 0.7)",
	},

	// Border
	border: {
		light: "#3D2870",
		main: "#543D9E",
		dark: "#6B50B5",
	},

	// Brand
	primary: COLORS.primary[400],
	primaryLight: COLORS.primary[300],
	primaryDark: COLORS.primary[600],

	secondary: COLORS.secondary[400],
	secondaryLight: COLORS.secondary[300],
	secondaryDark: COLORS.secondary[600],

	// Accent Colors - Thêm màu accent ấm áp cho dark mode
	accent: {
		warm: "#FFD6F0", // Hồng pastel ấm áp
		soft: "#E5A4D5", // Hồng tím soft
		lavender: "#C5B3E6", // Lavender nhẹ nhàng
	},

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
		dark: string;
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
