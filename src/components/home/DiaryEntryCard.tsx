import { space, radius } from "@/constants/spacing";
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
				{ backgroundColor: theme.surface.raised },
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
		borderRadius: radius.md,
		padding: space[5],
		marginBottom: space[2],
	},
	content: {
		marginBottom: space[1],
	},
	title: {
		fontWeight: "600",
		marginBottom: space[1],
	},
	preview: {
		lineHeight: 20,
	},
	date: {
		textAlign: "right",
	},
});
