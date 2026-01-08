import IconButton from "@/components/common/IconButton";
import Typo from "@/components/common/Typo";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useTheme } from "@/hooks/useTheme";
import { space, vSpace, sizes, shadows } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

interface OnboardingSlide {
	id: string;
	icon: keyof typeof MaterialIcons.glyphMap;
	title: string;
	description: string;
}

const slides: OnboardingSlide[] = [
	{
		id: "1",
		icon: "edit-note",
		title: "Viết nhật ký cảm xúc",
		description:
			"Ghi lại những khoảnh khắc, suy nghĩ và cảm xúc của bạn mỗi ngày. Đơn giản, an toàn và riêng tư.",
	},
	{
		id: "2",
		icon: "psychology",
		title: "Phân tích cảm xúc",
		description:
			"Khám phá và hiểu rõ hơn về trạng thái cảm xúc của bạn qua các biểu đồ và phân tích thông minh.",
	},
	{
		id: "3",
		icon: "music-note",
		title: "Gợi ý âm nhạc",
		description:
			"Nhận những gợi ý nhạc phù hợp với tâm trạng của bạn. Vì tâm tư nào cũng mang dáng hình thanh âm.",
	},
];

const OnboardingScreen = () => {
	const { theme } = useTheme();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef<FlatList>(null);

	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index || 0);
		}
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const handleNext = () => {
		if (currentIndex < slides.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true,
			});
		} else {
			router.replace("/welcome");
		}
	};

	const handleSkip = () => {
		router.replace("/welcome");
	};

	const renderSlide = ({ item }: { item: OnboardingSlide }) => (
		<View style={[styles.slide, { width }]}>
			<View
				style={[
					styles.iconCircle,
					{ backgroundColor: theme.primary.default },
				]}>
				<MaterialIcons
					name={item.icon}
					size={sizes.icon["3xl"]}
					color={theme.text.onPrimary}
				/>
			</View>

			<Typo
				variant="titleLarge"
				color={theme.text.primary}
				align="center"
				style={styles.title}>
				{item.title}
			</Typo>

			<Typo
				variant="bodyLarge"
				color={theme.text.primary}
				align="center"
				numberOfLines={4}
				style={[styles.description, { width: width * 0.85 }]}>
				{item.description}
			</Typo>
		</View>
	);

	const renderDots = () => (
		<View style={styles.dotsContainer}>
			{slides.map((_, index) => {
				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width,
				];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 24, 10],
					extrapolate: "clamp",
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						key={index}
						style={[
							styles.dot,
							{
								width: dotWidth,
								opacity,
								backgroundColor: theme.primary.default,
							},
						]}
					/>
				);
			})}
		</View>
	);

	return (
		<ScreenWrapper useGradient={true}>
			<View style={styles.container}>
				{/* Skip Button */}
				<Pressable
					style={styles.skipButton}
					onPress={handleSkip}>
					<Typo
						variant="labelLarge"
						color={theme.text.primary}
						style={{ fontSize: s(24) }}>
						Bỏ qua
					</Typo>
				</Pressable>

				{/* Slides */}
				<Animated.FlatList
					ref={flatListRef}
					data={slides}
					renderItem={renderSlide}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					bounces={false}
					keyExtractor={(item) => item.id}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false },
					)}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					scrollEventThrottle={32}
				/>

				{/* Bottom Section */}
				<View style={styles.bottomSection}>
					{renderDots()}

					{/* Next/Get Started Button */}
					<View style={styles.buttonContainer}>
						<IconButton
							icon={
								<MaterialIcons
									name={
										currentIndex === slides.length - 1
											? "check"
											: "arrow-forward"
									}
									size={sizes.icon.lg}
									color={theme.text.onPrimary}
								/>
							}
							label={
								currentIndex === slides.length - 1
									? "Bắt đầu"
									: "Tiếp theo"
							}
							variant="filled"
							onPress={handleNext}
							style={styles.nextButton}
						/>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	skipButton: {
		position: "absolute",
		top: vSpace[5],
		right: vSpace[5],
		zIndex: 10,
		padding: space[4],
	},
	slide: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: space[10],
	},
	iconCircle: {
		width: sizes.iconContainer.md,
		height: sizes.iconContainer.md,
		borderRadius: sizes.iconContainer.md / 2,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: space[10],
		...shadows.lg,
	},
	title: {
		marginBottom: space[5],
		fontSize: s(32),
		lineHeight: s(42),
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
		fontWeight: "700",
	},
	description: {
		lineHeight: s(26),
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
		fontWeight: "700",
		fontSize: s(20),
	},
	bottomSection: {
		paddingBottom: space[10],
		paddingHorizontal: vSpace[5],
	},
	dotsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: s(30),
		height: s(20),
	},
	dot: {
		height: s(10),
		borderRadius: s(5),
		marginHorizontal: s(4),
	},
	buttonContainer: {
		alignItems: "center",
	},
	nextButton: {
		minWidth: s(200),
	},
});
