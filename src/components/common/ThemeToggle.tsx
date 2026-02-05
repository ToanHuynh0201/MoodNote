import { radius } from "@/constants/spacing";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeToggleProps } from "@/types";
import { s } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
	const { theme } = useTheme();
	// Separate animated values for different driver modes
	const colorValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;
	const transformValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

	useEffect(() => {
		Animated.parallel([
			// Color animation (useNativeDriver: false for backgroundColor)
			Animated.spring(colorValue, {
				toValue: isDark ? 1 : 0,
				useNativeDriver: false,
				tension: 50,
				friction: 7,
			}),
			// Transform animation (useNativeDriver: true for translateX and rotate)
			Animated.spring(transformValue, {
				toValue: isDark ? 1 : 0,
				useNativeDriver: true,
				tension: 50,
				friction: 7,
			}),
		]).start();
	}, [isDark]);

	// Interpolate background color
	const backgroundColor = colorValue.interpolate({
		inputRange: [0, 1],
		outputRange: [theme.emotions.happy, theme.primary.default], // Yellow to Purple
	});

	// Interpolate position (using transformValue with native driver)
	const translateX = transformValue.interpolate({
		inputRange: [0, 1],
		outputRange: [2, s(70) - s(30) - 2], // Move from left to right
	});

	// Rotate animation (using transformValue with native driver)
	const rotate = transformValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<TouchableOpacity
			onPress={onToggle}
			activeOpacity={0.8}
			style={styles.container}>
			<Animated.View
				style={[
					styles.track,
					{
						backgroundColor,
					},
				]}>
				{/* Sun and Moon background icons */}
				<View style={styles.iconsContainer}>
					<Ionicons
						name="sunny"
						size={s(18)}
						color={theme.text.onPrimary + "40"}
						style={styles.sunIcon}
					/>
					<Ionicons
						name="moon"
						size={s(18)}
						color={theme.text.onPrimary + "40"}
						style={styles.moonIcon}
					/>
				</View>

				{/* Animated thumb */}
				<Animated.View
					style={[
						styles.thumb,
						{
							backgroundColor: theme.text.onPrimary,
							transform: [{ translateX }, { rotate }],
						},
					]}>
					<Ionicons
						name={isDark ? "moon" : "sunny"}
						size={s(20)}
						color={
							isDark
								? theme.primary.default
								: theme.emotions.happy
						}
					/>
				</Animated.View>
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
	},
	track: {
		width: s(70),
		height: s(34),
		borderRadius: radius.full,
		position: "relative",
		overflow: "hidden",
	},
	iconsContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: s(6),
	},
	sunIcon: {
		position: "absolute",
		left: s(6),
	},
	moonIcon: {
		position: "absolute",
		right: s(6),
	},
	thumb: {
		width: s(30),
		height: s(30),
		borderRadius: radius.full,
		position: "absolute",
		top: 2,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
