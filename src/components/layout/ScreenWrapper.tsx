import { useTheme } from "@/hooks/useTheme";
import { ScreenWrapperProps } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({
	children,
	style,
	safeAreaEdges = ["top", "bottom", "left", "right"], // Mặc định apply safe area cho tất cả các cạnh
	useGradient = false,
}: ScreenWrapperProps) => {
	const { theme } = useTheme();
	return (
		<LinearGradient
			colors={
				useGradient
					? (theme.background.gradient as [
							string,
							string,
							...string[],
					  ])
					: [theme.background.primary, theme.background.primary]
			}
			style={styles.gradient}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			locations={useGradient ? [0, 0.3, 0.5, 0.7, 1] : undefined}>
			<SafeAreaView
				style={[styles.container]}
				edges={safeAreaEdges}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}>
					<View style={[styles.content, style]}>{children}</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</LinearGradient>
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
