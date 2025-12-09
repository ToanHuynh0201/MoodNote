import { TYPOGRAPHY, lightTheme } from "@/constants/theme";
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
