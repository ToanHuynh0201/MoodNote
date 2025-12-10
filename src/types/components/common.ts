import { TextProps, TextStyle } from "react-native";
export type TypographyVariant =
	| "displayLarge"
	| "displayMedium"
	| "displaySmall"
	| "headlineLarge"
	| "headlineMedium"
	| "headlineSmall"
	| "titleLarge"
	| "titleMedium"
	| "titleSmall"
	| "bodyLarge"
	| "bodyMedium"
	| "bodySmall"
	| "labelLarge"
	| "labelMedium"
	| "labelSmall";

export interface TypoProps extends TextProps {
	variant?: TypographyVariant;
	color?: string;
	align?: "left" | "center" | "right" | "justify" | "auto";
	italic?: boolean;
	underline?: boolean;
	lineThrough?: boolean;
	numberOfLines?: number;
	decorative?: boolean;
	style?: TextStyle | TextStyle[];
}

export interface IconButtonProps {
	icon?: React.ReactNode;
	label: string;
	labelStyle?: TypoProps;
	onPress?: () => void;
	variant?: "filled" | "outlined" | "tonal";
	disabled?: boolean;
	style?: any;
	iconPosition?: "left" | "right";
}

export interface LoadingSpinnerProps {
	/** Có hiển thị hay không */
	visible?: boolean;
	/** True: Che toàn màn hình (Overlay) | False: Nằm trong view cha */
	fullScreen?: boolean;
	/** Danh sách câu text sẽ chạy. Nếu không truyền sẽ dùng mặc định */
	messages?: string[];
	/** Màu chủ đạo của sóng và chữ */
	color?: string;
	/** Màu phụ (cho hiệu ứng gradient của sóng) */
	secondaryColor?: string;
}
