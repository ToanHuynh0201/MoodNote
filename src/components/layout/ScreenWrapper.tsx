import { useTheme } from "@/hooks/useTheme";
import { ScreenWrapperProps } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ScreenWrapper = ({
	children,
	style,
	safeAreaEdges = ["top", "bottom", "left", "right"], // Mặc định apply safe area cho tất cả các cạnh
	useGradient = false,
}: ScreenWrapperProps) => {
	const { theme } = useTheme();

	// Convert gradient array to proper type
	const gradientColors = theme.background.gradient.slice() as [
		string,
		string,
		...string[],
	];

	return (
		<View style={styles.gradient}>
			{useGradient ? (
				// Gradient động theo theme (light/dark mode)
				<LinearGradient
					colors={gradientColors}
					style={[StyleSheet.absoluteFillObject]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				/>
			) : (
				<View
					style={[
						StyleSheet.absoluteFillObject,
						{ backgroundColor: theme.background.primary },
					]}
				/>
			)}
			<SafeAreaView
				style={[styles.container]}
				edges={safeAreaEdges}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}>
					<View style={[styles.content, style]}>{children}</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</View>
	);
};

export default ScreenWrapper;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradient: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
});
