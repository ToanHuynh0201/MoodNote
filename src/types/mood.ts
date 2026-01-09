export type MoodType =
	| "very_sad"
	| "sad"
	| "neutral"
	| "happy"
	| "very_happy";

export interface MoodEntry {
	date: Date;
	mood: MoodType;
	intensity?: number; // 1-5 scale
}

export interface WeekData {
	startDate: Date;
	endDate: Date;
	entries: MoodEntry[];
}

export interface MonthData {
	year: number;
	month: number; // 0-11
	entries: MoodEntry[];
}

// Map mood types to emotion colors from theme
export const MOOD_EMOTION_MAP: Record<
	MoodType,
	keyof import("@/constants/colors/semantic").EmotionTokens
> = {
	very_sad: "sad",
	sad: "anxious",
	neutral: "calm",
	happy: "happy",
	very_happy: "excited",
};

// Mood intensity for chart plotting (1-5 scale)
export const MOOD_INTENSITY: Record<MoodType, number> = {
	very_sad: 1,
	sad: 2,
	neutral: 3,
	happy: 4,
	very_happy: 5,
};
