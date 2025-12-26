import { BORDER_RADIUS, SIZES, SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { ButtonProps } from "@/types";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
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

	const getButtonStyle = (): ViewStyle => {
		switch (variant) {
			case "filled":
				return {
					backgroundColor: theme.primaryLight,
				};
			case "tonal":
				return {
					backgroundColor: theme.primaryDark,
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
			<View style={styles.content}>
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

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingVertical: verticalScale(SPACING.button.paddingVertical),
		paddingHorizontal: scale(SPACING.button.paddingHorizontal),
		borderRadius: moderateScale(BORDER_RADIUS.xxl),
		alignItems: "center",
		justifyContent: "center",
		minHeight: verticalScale(SIZES.button.height),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: verticalScale(SPACING.micro.xxs),
		},
		shadowOpacity: 0.1,
		shadowRadius: moderateScale(BORDER_RADIUS.xxl),
		elevation: 3,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		textAlign: "center",
		paddingVertical: verticalScale(SPACING.micro.xxs),
	},
	disabled: {
		opacity: 0.5,
	},
});
