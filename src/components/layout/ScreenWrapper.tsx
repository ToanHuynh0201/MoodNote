import { ScreenWrapperProps } from "@/types";
import React from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({
	children,
	style,
	contentContainerStyle,
	scroll = false,
	safeAreaEdges = ["top", "bottom", "left", "right"], // Mặc định apply safe area cho tất cả các cạnh
}: ScreenWrapperProps) => {
	const Container = scroll ? ScrollView : View;
	return (
		<SafeAreaView
			style={[styles.container]}
			edges={safeAreaEdges}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<Container
					style={[styles.content, style]}
					contentContainerStyle={
						scroll ? contentContainerStyle : undefined
					}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled" // Bấm ra ngoài để ẩn phím
				>
					{children}
				</Container>
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
