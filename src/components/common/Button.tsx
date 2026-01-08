import { useTheme } from "@/hooks/useTheme";
import { ButtonProps } from "@/types";
import { sizes, radius, shadows } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { getButtonColors } from "@/utils/buttonStyles";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";

const Button = ({
	label,
	labelStyle,
	onPress,
	variant = "filled",
	disabled = false,
	style,
}: ButtonProps) => {
	const { theme } = useTheme();
	const colors = getButtonColors(variant, theme);

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor: colors.background,
					borderColor: colors.border,
					borderWidth: colors.border ? 1 : 0,
					shadowColor: theme.shadow.color,
				},
				disabled && styles.disabled,
				style,
			]}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}>
			<View style={styles.content}>
				<Typo
					variant="titleLarge"
					color={colors.text}
					style={styles.label}
					{...labelStyle}>
					{label}
				</Typo>
			</View>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingVertical: sizes.button.paddingY,
		paddingHorizontal: sizes.button.paddingX,
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		minHeight: sizes.button.height,
		...shadows.md,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		textAlign: "center",
		paddingVertical: s(2),
	},
	disabled: {
		opacity: 0.5,
	},
});
