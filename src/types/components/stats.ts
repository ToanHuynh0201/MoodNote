import { MoodEntry } from "@/types/mood";

/**
 * Props for MoodChart component
 * Displays a weekly mood trend chart with 7 data points
 */
export interface MoodChartProps {
	/** Array of 7 mood entries representing a week */
	entries: MoodEntry[];
	/** Label showing the week range (e.g., "1/12 - 7/12") */
	weekLabel: string;
}

/**
 * Props for MoodCalendar component
 * Displays a monthly calendar grid with mood indicators
 */
export interface MoodCalendarProps {
	/** Year to display (e.g., 2024) */
	year: number;
	/** Month to display (0-11, where 0 = January) */
	month: number;
	/** Mood entries for the month */
	entries: MoodEntry[];
	/** Callback when month selector is pressed */
	onMonthChange?: (month: number) => void;
}

/**
 * Props for WeekOverview component
 * Displays a horizontal row of 7 mood icons for the week
 */
export interface WeekOverviewProps {
	/** Array of 7 mood entries representing a week */
	entries: MoodEntry[];
	/** Callback when a day is pressed */
	onDayPress?: (entry: MoodEntry) => void;
}
