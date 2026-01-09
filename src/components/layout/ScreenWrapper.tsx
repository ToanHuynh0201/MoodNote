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
	safeAreaEdges = ["top", "bottom", "left", "right"],
	useGradient = true, // Enable gradient by default for subtle effect
}: ScreenWrapperProps) => {
	const { theme } = useTheme();

	// Strong gradient from theme
	const gradientColors = theme.gradient.background.slice() as [
		string,
		string,
		...string[],
	];

	return (
		<View style={styles.gradient}>
			{useGradient ? (
				// Strong gradient from theme (White→Purple in light, Dark purple in dark)
				<LinearGradient
					colors={gradientColors}
					style={[StyleSheet.absoluteFillObject]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
			) : (
				<View
					style={[
						StyleSheet.absoluteFillObject,
						{ backgroundColor: theme.surface.base },
					]}
				/>
			)}
			<SafeAreaView style={[styles.container]} edges={safeAreaEdges}>
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
