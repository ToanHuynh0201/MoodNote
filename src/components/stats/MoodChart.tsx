import { useTheme } from "@/hooks/useTheme";
import { MOOD_INTENSITY, MoodEntry } from "@/types/mood";
import { MoodChartProps } from "@/types/components";
import { spacing } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";

const CHART_HEIGHT = 180;
const CHART_PADDING = 20;
const DOT_RADIUS = 18;

export const MoodChart: React.FC<MoodChartProps> = ({ entries, weekLabel }) => {
	const { theme } = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const chartWidth = screenWidth - spacing(40); // Account for screen padding

	// Calculate chart dimensions
	const innerWidth = chartWidth - CHART_PADDING * 2;
	const innerHeight = CHART_HEIGHT - CHART_PADDING * 2;

	// Generate points for the mood line
	const { points, pathData, backgroundPathData } = useMemo(() => {
		if (entries.length === 0)
			return { points: [], pathData: "", backgroundPathData: "" };

		const stepX = innerWidth / (entries.length - 1 || 1);
		const maxY = 5; // Mood intensity range is 1-5
		const minY = 1;
		const range = maxY - minY;

		const pts = entries.map((entry, index) => {
			const x = CHART_PADDING + index * stepX;
			const intensity = MOOD_INTENSITY[entry.mood];
			// Invert Y axis (higher mood = higher on screen)
			const y =
				CHART_PADDING +
				innerHeight -
				((intensity - minY) / range) * innerHeight;
			return { x, y, entry };
		});

		// Create smooth curve using quadratic bezier curves
		let path = `M ${pts[0].x} ${pts[0].y}`;
		for (let i = 0; i < pts.length - 1; i++) {
			const current = pts[i];
			const next = pts[i + 1];
			const midX = (current.x + next.x) / 2;
			const midY = (current.y + next.y) / 2;

			// Quadratic curve to midpoint, then to next point
			path += ` Q ${current.x} ${current.y}, ${midX} ${midY}`;
			path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
		}

		// Background path (lighter opacity for depth)
		const bgPath = path;

		return { points: pts, pathData: path, backgroundPathData: bgPath };
	}, [entries, innerWidth, innerHeight]);

	// Get mood icon name
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

	// Get day label (Thứ 2, Thứ 3, etc.)
	const getDayLabel = (date: Date): string => {
		const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
		return days[date.getDay()];
	};

	return (
		<View style={styles.container}>
			<Svg
				width={chartWidth}
				height={CHART_HEIGHT}>
				{/* Background curve with lower opacity */}
				{backgroundPathData && (
					<Path
						d={backgroundPathData}
						stroke={theme.primary.default}
						strokeWidth={2}
						fill="none"
						opacity={0.2}
					/>
				)}

				{/* Main mood curve */}
				{pathData && (
					<Path
						d={pathData}
						stroke={theme.primary.default}
						strokeWidth={3}
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				)}

				{/* Mood points with icons */}
				{points.map((point, index) => (
					<G key={index}>
						{/* Circle background */}
						<Circle
							cx={point.x}
							cy={point.y}
							r={DOT_RADIUS}
							fill={theme.primary.default}
						/>
						{/* Day label below */}
						<SvgText
							x={point.x}
							y={CHART_HEIGHT - 8}
							fontSize={12}
							fill={theme.text.secondary}
							textAnchor="middle">
							{getDayLabel(point.entry.date)}
						</SvgText>
					</G>
				))}
			</Svg>

			{/* Render mood icons on top using absolute positioning */}
			{points.map((point, index) => (
				<View
					key={`icon-${index}`}
					style={[
						styles.iconContainer,
						{
							left: point.x - DOT_RADIUS + CHART_PADDING / 2,
							top: point.y - DOT_RADIUS,
						},
					]}>
					<Ionicons
						name={getMoodIcon(entries[index].mood)}
						size={20}
						color={theme.text.onPrimary}
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: CHART_HEIGHT,
	},
	iconContainer: {
		position: "absolute",
		width: DOT_RADIUS * 2,
		height: DOT_RADIUS * 2,
		alignItems: "center",
		justifyContent: "center",
	},
});
