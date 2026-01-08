import { useTheme } from "@/hooks/useTheme";
import { IconButtonProps } from "@/types";
import { componentSizes, borderRadius } from "@/constants/design";
import { moderateScale } from "@/utils/responsive";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
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

	const getButtonStyle = (): ViewStyle => {
		switch (variant) {
			case "filled":
				return {
					backgroundColor: theme.primary,
				};
			case "tonal":
				return {
					backgroundColor: theme.surface.elevated,
				};
			case "outlined":
				return {
					backgroundColor: "transparent",
					borderWidth: 1,
					borderColor: theme.border.dark,
				};
			default:
				return {};
		}
	};

	const getTextColor = (): string => {
		switch (variant) {
			case "filled":
				return theme.text.inverse;
			case "tonal":
				return theme.primary;
			default:
				return theme.text.primary;
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.button,
				getButtonStyle(),
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
					color={getTextColor()}
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
		paddingVertical: componentSizes.button.paddingVertical,
		paddingHorizontal: componentSizes.button.paddingHorizontal,
		borderRadius: borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
		minHeight: componentSizes.button.minHeight,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: componentSizes.shadow.offsetHeight,
		},
		shadowOpacity: 0.1,
		shadowRadius: moderateScale(100),
		elevation: 3,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: componentSizes.button.iconGap,
	},
	contentReverse: {
		flexDirection: "row-reverse",
	},
	iconContainer: {
		width: componentSizes.icon.medium,
		height: componentSizes.icon.medium,
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	label: {
		textAlign: "center",
		paddingVertical: componentSizes.button.labelPadding,
	},
	disabled: {
		opacity: 0.5,
	},
});
