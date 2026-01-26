import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Typo } from "@/components/common";
import { MoodEntry } from "@/types/mood";
import { WeekOverviewProps } from "@/types/components";
import { space, radius } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";

export const WeekOverview: React.FC<WeekOverviewProps> = ({
	entries,
	onDayPress,
}) => {
	const { theme } = useTheme();

	// Get mood icon
	const getMoodIcon = (
		mood: MoodEntry["mood"],
	): keyof typeof Ionicons.glyphMap => {
		switch (mood) {
			case "very_sad":
				return "sad-outline";
			case "sad":
				return "sad-outline";
			case "neutral":
				return "ellipse-outline";
			case "happy":
				return "happy-outline";
			case "very_happy":
				return "happy-outline";
		}
	};

	// Get day label (T2, T3, etc.)
	const getDayLabel = (date: Date): string => {
		const day = date.getDate();
		return day.toString();
	};

	return (
		<View style={styles.container}>
			{entries.map((entry, index) => (
				<TouchableOpacity
					key={index}
					style={styles.dayContainer}
					onPress={() => onDayPress?.(entry)}
					activeOpacity={0.7}>
					<View
						style={[
							styles.moodCircle,
							{
								backgroundColor: theme.primary.default,
								borderColor: theme.border.strong,
							},
						]}>
						<Ionicons
							name={getMoodIcon(entry.mood)}
							size={s(24)}
							color={theme.text.onPrimary}
						/>
					</View>
					<Typo
						variant="bodySmall"
						style={{
							color: theme.text.secondary,
							marginTop: space[1],
						}}>
						{getDayLabel(entry.date)}
					</Typo>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: space[2],
	},
	dayContainer: {
		alignItems: "center",
		gap: space[1],
	},
	moodCircle: {
		width: s(48),
		height: s(48),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
	},
});
