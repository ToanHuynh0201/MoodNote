import { useTheme } from "@/hooks/useTheme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({
	children,
	style,
	safeAreaEdges = ["top", "bottom", "left", "right"], // Mặc định apply safe area cho tất cả các cạnh
}: ScreenWrapperProps) => {
	const { theme } = useTheme();
	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: theme.background.primary },
			]}
			edges={safeAreaEdges}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<View style={[styles.content, style]}>{children}</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ScreenWrapper;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
});
