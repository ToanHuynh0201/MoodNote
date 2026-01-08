import {
	borderRadius,
	componentSizes,
	spacingScale,
	verticalSpacing,
} from "@/constants/design";
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
				{ backgroundColor: theme.surface.secondary },
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
		padding: spacingScale.md,
		borderRadius: borderRadius.lg,
		minWidth: 100,
	},
	iconContainer: {
		width: componentSizes.icon.large,
		height: componentSizes.icon.large,
		borderRadius: borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalSpacing.xs,
	},
	days: {
		marginTop: verticalSpacing.xxs,
		fontWeight: "bold",
	},
	label: {
		textAlign: "center",
		marginTop: verticalSpacing.xxs,
	},
});
