import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Typo } from "@/components/common";
import { MoodEntry } from "@/types/mood";
import { MoodCalendarProps } from "@/types/components";
import { space, radius } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";

export const MoodCalendar: React.FC<MoodCalendarProps> = ({
	year,
	month,
	entries,
	onMonthChange,
}) => {
	const { theme } = useTheme();

	// Get month name in Vietnamese
	const getMonthName = (m: number): string => {
		return `Tháng ${m + 1}`;
	};

	// Calculate calendar grid
	const calendarDays = useMemo(() => {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startDayOfWeek = firstDay.getDay(); // 0 = Sunday

		// Create a map of dates to moods
		const moodMap = new Map<string, MoodEntry>();
		entries.forEach((entry) => {
			const dateKey = entry.date.toISOString().split("T")[0];
			moodMap.set(dateKey, entry);
		});

		// Build calendar grid (including previous/next month days)
		const days: Array<{
			date: number;
			isCurrentMonth: boolean;
			mood?: MoodEntry;
			dateKey: string;
		}> = [];

		// Add previous month days
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = startDayOfWeek - 1; i >= 0; i--) {
			const date = prevMonthLastDay - i;
			const d = new Date(year, month - 1, date);
			const dateKey = d.toISOString().split("T")[0];
			days.push({
				date,
				isCurrentMonth: false,
				mood: moodMap.get(dateKey),
				dateKey,
			});
		}

		// Add current month days
		for (let date = 1; date <= daysInMonth; date++) {
			const d = new Date(year, month, date);
			const dateKey = d.toISOString().split("T")[0];
			days.push({
				date,
				isCurrentMonth: true,
				mood: moodMap.get(dateKey),
				dateKey,
			});
		}

		// Add next month days to complete the grid
		const remainingDays = 7 - (days.length % 7);
		if (remainingDays < 7) {
			for (let date = 1; date <= remainingDays; date++) {
				const d = new Date(year, month + 1, date);
				const dateKey = d.toISOString().split("T")[0];
				days.push({
					date,
					isCurrentMonth: false,
					mood: moodMap.get(dateKey),
					dateKey,
				});
			}
		}

		return days;
	}, [year, month, entries]);

	// Get mood icon
	const getMoodIcon = (
		mood?: MoodEntry,
	): keyof typeof Ionicons.glyphMap | null => {
		if (!mood) return null;
		switch (mood.mood) {
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

	// Week day labels
	const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

	return (
		<View style={styles.container}>
			{/* Month selector */}
			<View style={styles.monthHeader}>
				<Typo
					variant="titleLarge"
					style={{ color: theme.text.primary, fontWeight: "600" }}>
					{getMonthName(month)}
				</Typo>
				<TouchableOpacity onPress={() => onMonthChange?.(month)}>
					<Ionicons
						name="chevron-down"
						size={s(20)}
						color={theme.text.primary}
					/>
				</TouchableOpacity>
			</View>

			{/* Week day headers */}
			<View style={styles.weekHeader}>
				{weekDays.map((day, index) => (
					<View key={index} style={styles.dayHeader}>
						<Typo
							variant="bodySmall"
							style={{ color: theme.text.secondary }}>
							{day}
						</Typo>
					</View>
				))}
			</View>

			{/* Calendar grid */}
			<View style={styles.calendarGrid}>
				{calendarDays.map((day, index) => {
					const hasMood = !!day.mood;
					const icon = getMoodIcon(day.mood);

					return (
						<TouchableOpacity
							key={`${day.dateKey}-${index}`}
							style={[
								styles.dayCell,
								!day.isCurrentMonth && styles.dayCellInactive,
							]}
							activeOpacity={hasMood ? 0.7 : 1}>
							{hasMood && icon ? (
								<View
									style={[
										styles.moodContainer,
										{ backgroundColor: theme.primary.default },
									]}>
									<Ionicons
										name={icon}
										size={s(20)}
										color={theme.text.onPrimary}
									/>
								</View>
							) : (
								<View
									style={[
										styles.emptyDayCircle,
										{
											backgroundColor: day.isCurrentMonth
												? theme.surface.elevated
												: "transparent",
										},
									]}>
									<Typo
										variant="bodyMedium"
										style={{
											color: day.isCurrentMonth
												? theme.text.primary
												: theme.text.disabled,
										}}>
										{day.date}
									</Typo>
								</View>
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	monthHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: space[2],
		marginBottom: space[4],
	},
	weekHeader: {
		flexDirection: "row",
		marginBottom: space[3],
	},
	dayHeader: {
		flex: 1,
		alignItems: "center",
	},
	calendarGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: space[2],
	},
	dayCell: {
		width: `${(100 - (6 * 2)) / 7}%`, // Subtract gap percentage
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	dayCellInactive: {
		opacity: 0.4,
	},
	moodContainer: {
		width: "100%",
		height: "100%",
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyDayCircle: {
		width: "100%",
		height: "100%",
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
});
