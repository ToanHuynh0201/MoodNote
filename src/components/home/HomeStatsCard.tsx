import { space, radius, sizes } from "@/constants/spacing";
import { useTheme } from "@/hooks";
import { HomeStatsCardProps } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Typo } from "../common";

export const HomeStatsCard = ({
	icon,
	days,
	label,
	accentColor,
}: HomeStatsCardProps) => {
	const { theme } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.surface.raised },
			]}>
			<View
				style={[
					styles.iconContainer,
					accentColor && { backgroundColor: accentColor },
				]}>
				{icon}
			</View>
			<Typo
				variant="headlineMedium"
				style={styles.days}
				color={theme.text.primary}>
				{days} ngày
			</Typo>
			<Typo
				variant="bodySmall"
				style={styles.label}
				color={theme.text.secondary}>
				{label}
			</Typo>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: space[4],
		borderRadius: radius.lg,
		minWidth: 100,
	},
	iconContainer: {
		width: sizes.icon["3xl"],
		height: sizes.icon["3xl"],
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: space[1],
	},
	days: {
		marginTop: space[1],
		fontWeight: "bold",
	},
	label: {
		textAlign: "center",
		marginTop: space[1],
	},
});
