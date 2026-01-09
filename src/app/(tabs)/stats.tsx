import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { space, vSpace } from "@/constants/spacing";

export default function StatsScreen() {
	const { theme } = useTheme();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Typo variant="headlineLarge" style={{ color: theme.text.primary }}>
					Statistics
				</Typo>
				<Typo variant="bodyMedium" style={{ color: theme.text.secondary }}>
					Your mood statistics will appear here
				</Typo>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: space[7],
		paddingTop: vSpace[8],
		gap: vSpace[4],
	},
});
