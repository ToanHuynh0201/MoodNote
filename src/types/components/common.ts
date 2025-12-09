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
	style?: TextStyle | TextStyle[];
}
