import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo } from "@/components/common";
import {
	MoodChart,
	MoodCalendar,
	WeekOverview,
} from "@/components/stats";
import { useTheme } from "@/hooks/useTheme";
import { space, radius } from "@/constants/spacing";
import { MoodEntry, MoodType } from "@/types/mood";
import { Ionicons } from "@expo/vector-icons";
import { s } from "@/utils/scaling";

// Generate mock data for demonstration
const generateMockData = (): MoodEntry[] => {
	const entries: MoodEntry[] = [];
	const moods: MoodType[] = [
		"very_sad",
		"sad",
		"neutral",
		"happy",
		"very_happy",
	];

	// Generate data for December 2024
	for (let day = 1; day <= 31; day++) {
		// Skip some days randomly to simulate missing entries
		if (Math.random() > 0.3) {
			entries.push({
				date: new Date(2024, 11, day), // December 2024
				mood: moods[Math.floor(Math.random() * moods.length)],
			});
		}
	}

	return entries;
};

const StatsScreen = () => {
	const { theme } = useTheme();
	const [currentMonth, setCurrentMonth] = useState(11); // December (0-based)
	const [currentYear, setCurrentYear] = useState(2024);
	const [selectedWeekStart, setSelectedWeekStart] = useState(0); // Week offset from current week

	// Mock data
	const allEntries = useMemo(() => generateMockData(), []);

	// Get current week entries (last 7 days from Dec 1-7)
	const currentWeekEntries = useMemo(() => {
		const startDate = new Date(2024, 11, 1 + selectedWeekStart * 7); // Dec 1, 8, 15, etc.
		const weekEntries: MoodEntry[] = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + i);

			const entry = allEntries.find(
				(e) => e.date.toDateString() === date.toDateString(),
			);

			weekEntries.push(
				entry || {
					date,
					mood: "neutral",
				},
			);
		}

		return weekEntries;
	}, [allEntries, selectedWeekStart]);

	// Get month entries
	const monthEntries = useMemo(() => {
		return allEntries.filter(
			(entry) =>
				entry.date.getMonth() === currentMonth &&
				entry.date.getFullYear() === currentYear,
		);
	}, [allEntries, currentMonth, currentYear]);

	// Format week label
	const weekLabel = useMemo(() => {
		if (currentWeekEntries.length === 0) return "";
		const start = currentWeekEntries[0].date;
		const end = currentWeekEntries[currentWeekEntries.length - 1].date;
		return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
	}, [currentWeekEntries]);

	const handlePreviousWeek = () => {
		setSelectedWeekStart((prev) => Math.max(prev - 1, 0));
	};

	const handleNextWeek = () => {
		setSelectedWeekStart((prev) => Math.min(prev + 1, 3)); // Max 4 weeks in Dec
	};

	return (
		<ScreenWrapper>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Typo
						variant="headlineLarge"
						decorative
						style={[
							styles.title,
							{ color: theme.text.primary },
						]}>
						Báo cáo
					</Typo>
				</View>

				{/* Week Selector */}
				<View style={styles.weekSelector}>
					<View style={styles.weekHeader}>
						<View>
							<Typo
								variant="titleMedium"
								style={{ color: theme.text.primary }}>
								Cảm xúc theo tuần
							</Typo>
							<Typo
								variant="bodySmall"
								style={{ color: theme.text.secondary }}>
								{weekLabel}
							</Typo>
						</View>
						<View style={styles.weekNavigation}>
							<TouchableOpacity
								onPress={handlePreviousWeek}
								disabled={selectedWeekStart === 0}
								style={[
									styles.navButton,
									{
										backgroundColor: theme.surface.elevated,
										opacity: selectedWeekStart === 0 ? 0.5 : 1,
									},
								]}>
								<Ionicons
									name="chevron-back"
									size={s(20)}
									color={theme.text.primary}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleNextWeek}
								disabled={selectedWeekStart === 3}
								style={[
									styles.navButton,
									{
										backgroundColor: theme.surface.elevated,
										opacity: selectedWeekStart === 3 ? 0.5 : 1,
									},
								]}>
								<Ionicons
									name="chevron-forward"
									size={s(20)}
									color={theme.text.primary}
								/>
							</TouchableOpacity>
						</View>
					</View>

					{/* Mood Chart */}
					<View style={styles.chartContainer}>
						<MoodChart entries={currentWeekEntries} weekLabel={weekLabel} />
					</View>
				</View>

				{/* Week Overview Section */}
				<View style={styles.section}>
					<Typo
						variant="titleMedium"
						style={[
							styles.sectionTitle,
							{ color: theme.text.primary },
						]}>
						Tổng quan
					</Typo>
					<WeekOverview
						entries={currentWeekEntries}
						onDayPress={(entry) => console.log("Day pressed:", entry)}
					/>
				</View>

				{/* Calendar Section */}
				<View style={styles.section}>
					<Typo
						variant="titleMedium"
						style={[
							styles.sectionTitle,
							{ color: theme.text.primary },
						]}>
						Cảm xúc theo tháng
					</Typo>
					<MoodCalendar
						year={currentYear}
						month={currentMonth}
						entries={monthEntries}
						onMonthChange={(month) => console.log("Month changed:", month)}
					/>
				</View>

				{/* Bottom spacing for tab bar */}
				<View style={{ height: space[8] }} />
			</ScrollView>
		</ScreenWrapper>
	);
};

export default StatsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: space[6],
	},
	header: {
		marginTop: space[5],
		marginBottom: space[4],
	},
	title: {
		fontSize: s(32),
		fontWeight: "600",
	},
	weekSelector: {
		marginBottom: space[6],
	},
	weekHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: space[4],
	},
	weekNavigation: {
		flexDirection: "row",
		gap: space[2],
	},
	navButton: {
		width: s(36),
		height: s(36),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
	chartContainer: {
		marginBottom: space[4],
	},
	section: {
		marginBottom: space[6],
	},
	sectionTitle: {
		marginBottom: space[4],
		fontWeight: "600",
	},
});
