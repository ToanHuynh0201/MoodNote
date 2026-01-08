import { useTheme } from "@/hooks";
import { LoadingSpinnerProps } from "@/types";
import { componentSizes } from "@/constants/design";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const LoadingSpinner = ({
	visible = true,
	fullScreen = true,
	messages = ["Đang tải dữ liệu...", "Vui lòng đợi giây lát..."],
	color,
	secondaryColor,
}: LoadingSpinnerProps) => {
	const { theme } = useTheme();

	// Sử dụng theme colors nếu không có color được truyền vào
	const primaryColor = color || theme.primary;
	const accentColor = secondaryColor || theme.secondary;
	// SÓNG ÂM (WAVES) ===
	const waveCount = 5;
	const waveAnims = useRef(
		[...Array(waveCount)].map(() => new Animated.Value(0)),
	).current;
	const colorAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!visible) return;

		// Animation: Các thanh sóng nhảy múa
		waveAnims.forEach((anim, index) => {
			const runJump = () => {
				Animated.sequence([
					Animated.timing(anim, {
						toValue: 1,
						duration: 400 + Math.random() * 300, // Random speed
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: false, // Height layout property
					}),
					Animated.timing(anim, {
						toValue: 0.3,
						duration: 400 + Math.random() * 300,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: false,
					}),
				]).start(({ finished }) => {
					if (finished && visible) runJump();
				});
			};
			// Delay nhẹ để tạo hiệu ứng lượn sóng
			setTimeout(() => runJump(), index * 100);
		});

		// Animation: Đổi màu liên tục
		Animated.loop(
			Animated.sequence([
				Animated.timing(colorAnim, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: false,
				}),
				Animated.timing(colorAnim, {
					toValue: 0,
					duration: 2000,
					useNativeDriver: false,
				}),
			]),
		).start();
	}, [visible]);

	const interpolatedColor = colorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [primaryColor, accentColor],
	});

	//TEXT THAY ĐỔI (TEXT STREAM)
	const [msgIndex, setMsgIndex] = useState(0);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!visible) return;

		let isMounted = true;
		const runTextCycle = () => {
			// Fade In
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}).start(() => {
				// Wait
				setTimeout(() => {
					if (!isMounted) return;
					// Fade Out
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 600,
						useNativeDriver: true,
					}).start(() => {
						if (isMounted) {
							setMsgIndex((prev) => (prev + 1) % messages.length);
							runTextCycle();
						}
					});
				}, 1200); // Thời gian đọc chữ
			});
		};

		runTextCycle();
		return () => {
			isMounted = false;
		};
	}, [visible, messages]);

	// === RENDER ===
	if (!visible) return null;

	const Content = (
		<View
			style={[
				styles.container,
				fullScreen && styles.fullScreenContainer,
			]}>
			{/* Visual Sóng Âm */}
			<View style={styles.waveContainer}>
				{waveAnims.map((anim, index) => (
					<Animated.View
						key={index}
						style={[
							styles.bar,
							{
								backgroundColor: interpolatedColor,
								height: anim.interpolate({
									inputRange: [0, 1],
									outputRange: [15, 50], // Min 15px, Max 50px
								}),
							},
						]}
					/>
				))}
			</View>

			{/* Text Thông Báo */}
			<Animated.Text
				style={[
					styles.text,
					{ opacity: fadeAnim, color: primaryColor },
				]}>
				{messages[msgIndex]}
			</Animated.Text>
		</View>
	);

	// Nếu là fullScreen, bọc trong Absolute view đè lên tất cả
	if (fullScreen) {
		return (
			<View
				style={[
					StyleSheet.absoluteFillObject,
					styles.overlay,
					{ backgroundColor: theme.surface.overlay },
				]}>
				{Content}
			</View>
		);
	}

	return Content;
};

const styles = StyleSheet.create({
	overlay: {
		zIndex: 9999,
		justifyContent: "center",
		alignItems: "center",
	},
	fullScreenContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: componentSizes.loading.containerPadding,
	},
	waveContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: componentSizes.loading.waveHeight,
		marginBottom: componentSizes.loading.containerMarginBottom,
	},
	bar: {
		width: componentSizes.loading.barWidth,
		borderRadius: componentSizes.loading.barBorderRadius,
		marginHorizontal: componentSizes.loading.barMargin,
	},
	text: {
		fontSize: 15,
		fontWeight: "600",
		letterSpacing: 0.5,
		textAlign: "center",
		minHeight: 24, // Giữ chỗ để không bị nhảy layout khi text đổi
	},
});

export default LoadingSpinner;
