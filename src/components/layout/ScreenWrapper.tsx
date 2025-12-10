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

	return (
		<View style={styles.gradient}>
			{useGradient ? (
				// Tạo radial gradient theo thiết kế Figma
				<>
					{/* Lớp nền chính - Gradient radial từ góc trên trái: tím đậm -> tím nhạt */}
					<LinearGradient
						colors={["rgba(124, 77, 214, 0.5)", "#FFF"]}
						style={[StyleSheet.absoluteFillObject]}
						start={{ x: -0.05, y: -0.04 }}
						end={{ x: 0.55, y: 0.55 }}
					/>

					{/* Lớp gradient radial 1 - Tím nhạt ở vị trí 18% 68% */}
					<LinearGradient
						colors={["rgba(201, 123, 255, 0.25)", "transparent"]}
						style={[StyleSheet.absoluteFillObject]}
						start={{ x: 0, y: 0.6 }}
						end={{ x: 0.2, y: 0.4 }}
					/>
				</>
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
