import { useTheme } from "@/hooks/useTheme";
import { IconButtonProps } from "@/types";
import { sizes, radius, shadows, space } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { getButtonColors } from "@/utils/buttonStyles";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";

const IconButton = ({
	icon,
	label,
	labelStyle,
	onPress,
	variant = "filled",
	disabled = false,
	style,
	iconPosition = "left",
}: IconButtonProps) => {
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
			<View
				style={[
					styles.content,
					iconPosition === "right" && styles.contentReverse,
				]}>
				<View style={styles.iconContainer}>{icon}</View>
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

export default IconButton;

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
		gap: space[4], // 12px gap between icon and text
	},
	contentReverse: {
		flexDirection: "row-reverse",
	},
	iconContainer: {
		width: sizes.icon.lg,
		height: sizes.icon.lg,
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	label: {
		textAlign: "center",
		paddingVertical: s(2),
	},
	disabled: {
		opacity: 0.5,
	},
});
