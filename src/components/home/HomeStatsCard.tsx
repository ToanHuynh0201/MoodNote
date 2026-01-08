import { TYPOGRAPHY } from "@/constants/theme";
import { borderRadius, componentSizes, spacingScale, verticalSpacing } from "@/constants/design";
import { useTheme } from "@/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Typo } from "../common/Typo";

interface HomeStatsCardProps {
	icon: React.ReactNode;
	days: number;
	label: string;
	accentColor?: string;
}

export const HomeStatsCard: React.FC<HomeStatsCardProps> = ({
	icon,
	days,
	label,
	accentColor,
}) => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.surface.secondary }]}>
			<View style={[styles.iconContainer, accentColor && { backgroundColor: accentColor }]}>
				{icon}
			</View>
			<Typo variant="headlineMedium" style={styles.days} color={theme.text.primary}>
				{days} ngày
			</Typo>
			<Typo variant="bodySmall" style={styles.label} color={theme.text.secondary}>
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
		width: componentSizes.iconLarge,
		height: componentSizes.iconLarge,
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
