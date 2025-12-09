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
