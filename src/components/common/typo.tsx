import { TYPOGRAPHY, lightTheme } from "@/constants/theme";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

type TypographyVariant =
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

interface TypoProps extends TextProps {
	variant?: TypographyVariant;
	color?: string;
	align?: "left" | "center" | "right" | "justify" | "auto";
	italic?: boolean;
	underline?: boolean;
	lineThrough?: boolean;
	numberOfLines?: number;
	style?: TextStyle | TextStyle[];
}

const Typo =
	() =>
	({
		variant = "bodyMedium",
		color,
		align = "auto",
		italic = false,
		underline = false,
		lineThrough = false,
		numberOfLines,
		style,
		children,
		...rest
	}: TypoProps) => {
		const typographyStyle = TYPOGRAPHY[variant];

		// Use theme text color if no color is provided
		const textColor = color || lightTheme.text.primary;

		const textStyle: TextStyle = {
			...typographyStyle,
			color: textColor,
			textAlign: align,
			fontStyle: italic ? "italic" : "normal",
			textDecorationLine: underline
				? "underline"
				: lineThrough
				? "line-through"
				: "none",
		};

		return (
			<Text
				style={[textStyle, style]}
				numberOfLines={numberOfLines}
				{...rest}>
				{children}
			</Text>
		);
	};

export default Typo;
