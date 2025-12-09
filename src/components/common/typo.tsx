import { FONTS, TYPOGRAPHY } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { TypoProps } from "@/types";
import React from "react";
import { Text, TextStyle } from "react-native";

const Typo = ({
	variant = "bodyMedium",
	color,
	align = "auto",
	italic = false,
	underline = false,
	lineThrough = false,
	numberOfLines,
	style,
	decorative = false,
	children,
	...rest
}: TypoProps) => {
	const { theme } = useTheme();
	const typographyStyle = TYPOGRAPHY[variant];

	// Use theme text color if no color is provided
	const textColor = color || theme.text.primary;

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
		// Override fontFamily if decorative is true
		...(decorative && { fontFamily: FONTS.decorative }),
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
