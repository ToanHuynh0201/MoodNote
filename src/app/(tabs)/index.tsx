import { ScreenWrapper, Typo } from "@/components";
import { useTheme } from "@/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
	const { theme } = useTheme();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Typo
					variant="headlineLarge"
					color={theme.text.primary}>
					HomeScreen
				</Typo>
			</View>
		</ScreenWrapper>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
