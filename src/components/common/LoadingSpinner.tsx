import { LoadingSpinnerProps } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const LoadingSpinner = ({
	visible = true,
	fullScreen = false,
	messages = ["Đang tải dữ liệu...", "Vui lòng đợi giây lát..."],
	color = "#6C63FF", // Màu tím hiện đại
	secondaryColor = "#FF6584", // Màu hồng
}: LoadingSpinnerProps) => {
	// === LOGIC 1: SÓNG ÂM (WAVES) ===
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
		outputRange: [color, secondaryColor],
	});

	// === LOGIC 2: TEXT THAY ĐỔI (TEXT STREAM) ===
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
				style={[styles.text, { opacity: fadeAnim, color: color }]}>
				{messages[msgIndex]}
			</Animated.Text>
		</View>
	);

	// Nếu là fullScreen, bọc trong Absolute view đè lên tất cả
	if (fullScreen) {
		return (
			<View style={[StyleSheet.absoluteFillObject, styles.overlay]}>
				{Content}
			</View>
		);
	}

	return Content;
};

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: "rgba(255, 255, 255, 0.95)", // Nền trắng mờ che app
		// Nếu app dark mode thì đổi thành 'rgba(0,0,0, 0.9)'
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
		padding: 20,
	},
	waveContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: 60,
		marginBottom: 20,
	},
	bar: {
		width: 6,
		borderRadius: 4,
		marginHorizontal: 4,
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
