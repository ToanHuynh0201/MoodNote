import {
	borderRadius,
	spacingScale,
	verticalSpacing,
} from "@/constants/design";
import { useTheme } from "@/hooks";
import { DiaryEntryCardProps } from "@/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typo } from "../common";

export const DiaryEntryCard = ({
	title,
	preview,
	date,
	onPress,
}: DiaryEntryCardProps) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: theme.surface.secondary },
			]}
			onPress={onPress}
			activeOpacity={0.7}>
			<View style={styles.content}>
				<Typo
					variant="titleMedium"
					style={styles.title}
					color={theme.text.primary}
					numberOfLines={1}>
					{title}
				</Typo>
				<Typo
					variant="bodyMedium"
					style={styles.preview}
					color={theme.text.secondary}
					numberOfLines={2}>
					{preview}
				</Typo>
			</View>
			<Typo
				variant="labelSmall"
				style={styles.date}
				color={theme.text.tertiary}>
				{date}
			</Typo>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: borderRadius.md,
		padding: spacingScale.lg,
		marginBottom: verticalSpacing.sm,
	},
	content: {
		marginBottom: verticalSpacing.xs,
	},
	title: {
		fontWeight: "600",
		marginBottom: verticalSpacing.xxs,
	},
	preview: {
		lineHeight: 20,
	},
	date: {
		textAlign: "right",
	},
});
