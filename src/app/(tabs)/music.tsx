import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { space } from "@/constants/spacing";

const MusicScreen = () => {
	const { theme } = useTheme();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Typo variant="headlineLarge" style={{ color: theme.text.primary }}>
					Music
				</Typo>
				<Typo variant="bodyMedium" style={{ color: theme.text.secondary }}>
					Your personalized playlists
				</Typo>
			</View>
		</ScreenWrapper>
	);
};

export default MusicScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: space[7],
		paddingTop: space[8],
		gap: space[4],
	},
});
