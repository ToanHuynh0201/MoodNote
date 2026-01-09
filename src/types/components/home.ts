export interface DiaryEntryCardProps {
	title: string;
	preview: string;
	date: string;
	onPress?: () => void;
}

export interface HomeStatsCardProps {
	icon: React.ReactNode;
	days: number;
	label: string;
	accentColor?: string;
}
