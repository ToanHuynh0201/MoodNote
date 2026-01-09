import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { space, vSpace } from "@/constants/spacing";

const AddScreen = () => {
	const { theme } = useTheme();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Typo variant="headlineLarge" style={{ color: theme.text.primary }}>
					Add Entry
				</Typo>
				<Typo variant="bodyMedium" style={{ color: theme.text.secondary }}>
					Record your mood and thoughts
				</Typo>
			</View>
		</ScreenWrapper>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: space[7],
		paddingTop: vSpace[8],
		gap: vSpace[4],
	},
});
