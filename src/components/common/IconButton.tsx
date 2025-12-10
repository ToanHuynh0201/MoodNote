import { useTheme } from "@/hooks/useTheme";
import { IconButtonProps } from "@/types";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
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
					backgroundColor: theme.primaryLight,
				};
			case "outlined":
				return {
					backgroundColor: "transparent",
					borderWidth: 1,
					borderColor: theme.border.main,
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
			<View
				style={[
					styles.content,
					iconPosition === "right" && styles.contentReverse,
					!icon && styles.contentCentered,
				]}>
				{icon && <View style={styles.iconContainer}>{icon}</View>}
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
		paddingVertical: verticalScale(16),
		paddingHorizontal: scale(10),
		borderRadius: moderateScale(100),
		alignItems: "center",
		justifyContent: "center",
		minHeight: verticalScale(60),
		overflow: "visible",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: verticalScale(2),
		},
		shadowOpacity: 0.1,
		shadowRadius: moderateScale(4),
		elevation: 3,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(10),
	},
	contentReverse: {
		flexDirection: "row-reverse",
	},
	contentCentered: {
		justifyContent: "center",
	},
	iconContainer: {
		width: moderateScale(24),
		height: moderateScale(24),
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		// Remove any extra padding to prevent text clipping
	},
	disabled: {
		opacity: 0.5,
	},
});
