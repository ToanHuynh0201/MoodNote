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
		paddingVertical: verticalScale(16),
		paddingHorizontal: scale(24),
		borderRadius: moderateScale(100),
		alignItems: "center",
		justifyContent: "center",
		minHeight: verticalScale(60),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: verticalScale(2),
		},
		shadowOpacity: 0.1,
		shadowRadius: moderateScale(100),
		elevation: 3,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		textAlign: "center",
		paddingVertical: verticalScale(2),
	},
	disabled: {
		opacity: 0.5,
	},
});
