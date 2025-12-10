import Typo from "@/components/common/Typo";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useTheme } from "@/hooks/useTheme";
import { moderateScale } from "@/utils/responsive";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

// Floating music note component
const FloatingNote = ({ delay, startX, endX, duration, symbol }: any) => {
	const { theme } = useTheme();
	const translateY = useRef(new Animated.Value(height + 50)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const translateX = useRef(new Animated.Value(startX)).current;
	const rotate = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		setTimeout(() => {
			Animated.loop(
				Animated.parallel([
					Animated.timing(translateY, {
						toValue: -100,
						duration: duration,
						useNativeDriver: true,
					}),
					Animated.sequence([
						Animated.timing(opacity, {
							toValue: 0.7,
							duration: duration * 0.2,
							useNativeDriver: true,
						}),
						Animated.timing(opacity, {
							toValue: 0,
							duration: duration * 0.3,
							delay: duration * 0.5,
							useNativeDriver: true,
						}),
					]),
					Animated.timing(translateX, {
						toValue: endX,
						duration: duration,
						useNativeDriver: true,
					}),
					Animated.timing(rotate, {
						toValue: 1,
						duration: duration,
						useNativeDriver: true,
					}),
				]),
			).start();
		}, delay);
	}, []);

	const rotateInterpolate = rotate.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<Animated.View
			style={[
				styles.floatingNote,
				{
					opacity,
					transform: [
						{ translateY },
						{ translateX },
						{ rotate: rotateInterpolate },
					],
				},
			]}>
			<Typo
				variant="displayMedium"
				color={theme.text.primary}
				style={styles.noteSymbol}>
				{symbol}
			</Typo>
		</Animated.View>
	);
};

// Particle component
const Particle = ({ delay, startX, startY, endX, endY }: any) => {
	const { theme } = useTheme();
	const translateX = useRef(new Animated.Value(startX)).current;
	const translateY = useRef(new Animated.Value(startY)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const scale = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		setTimeout(() => {
			Animated.loop(
				Animated.parallel([
					Animated.sequence([
						Animated.timing(opacity, {
							toValue: 0.8,
							duration: 1000,
							useNativeDriver: true,
						}),
						Animated.timing(opacity, {
							toValue: 0,
							duration: 1000,
							useNativeDriver: true,
						}),
					]),
					Animated.sequence([
						Animated.spring(scale, {
							toValue: 1,
							tension: 20,
							useNativeDriver: true,
						}),
						Animated.timing(scale, {
							toValue: 0,
							duration: 1000,
							useNativeDriver: true,
						}),
					]),
					Animated.timing(translateX, {
						toValue: endX,
						duration: 2000,
						useNativeDriver: true,
					}),
					Animated.timing(translateY, {
						toValue: endY,
						duration: 2000,
						useNativeDriver: true,
					}),
				]),
			).start();
		}, delay);
	}, []);

	return (
		<Animated.View
			style={[
				styles.particle,
				{
					backgroundColor: theme.accent.lavender,
					opacity,
					transform: [{ translateX }, { translateY }, { scale }],
				},
			]}
		/>
	);
};

// Sound wave component
const SoundWave = ({ delay }: any) => {
	const scaleY = useRef(new Animated.Value(0.3)).current;
	const { theme } = useTheme();
	useEffect(() => {
		setTimeout(() => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(scaleY, {
						toValue: 1,
						duration: 400,
						useNativeDriver: true,
					}),
					Animated.timing(scaleY, {
						toValue: 0.3,
						duration: 400,
						useNativeDriver: true,
					}),
				]),
			).start();
		}, delay);
	}, []);

	return (
		<Animated.View
			style={[
				styles.soundWave,
				{
					backgroundColor: theme.primary,
					transform: [{ scaleY }],
					marginHorizontal: moderateScale(3),
				},
			]}
		/>
	);
};

// Typewriter effect component for slogan
const TypewriterText = ({ text, startDelay }: any) => {
	const { theme } = useTheme();
	const [displayedText, setDisplayedText] = React.useState("");
	const [showCursor, setShowCursor] = React.useState(true);

	useEffect(() => {
		// Start typing after delay
		const typingTimeout = setTimeout(() => {
			let currentIndex = 0;
			const typingInterval = setInterval(() => {
				if (currentIndex <= text.length) {
					setDisplayedText(text.slice(0, currentIndex));
					currentIndex++;
				} else {
					clearInterval(typingInterval);
				}
			}, 60); // Speed of typing (60ms per character)

			return () => clearInterval(typingInterval);
		}, startDelay);

		// Blinking cursor effect
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500);

		return () => {
			clearTimeout(typingTimeout);
			clearInterval(cursorInterval);
		};
	}, [text, startDelay]);

	return (
		<View style={styles.typewriterContainer}>
			<Text
				style={[
					styles.typewriterText,
					{
						color: theme.text.primary,
					},
				]}>
				{displayedText}
				{displayedText.length < text.length && (
					<Text
						style={[
							styles.cursor,
							{
								opacity: showCursor ? 1 : 0,
								color: theme.primary,
							},
						]}>
						|
					</Text>
				)}
			</Text>
		</View>
	);
};

const SplashScreen = () => {
	const { theme } = useTheme();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.3)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;
	const pulseAnim = useRef(new Animated.Value(1)).current;
	const shimmerAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Main animation sequence
		Animated.sequence([
			// Logo appears and scales up
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					tension: 20,
					friction: 7,
					useNativeDriver: true,
				}),
			]),
			// Slogan slides up after logo
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true,
			}),
		]).start();

		// Continuous pulse animation for logo
		Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 1.05,
					duration: 1500,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: true,
				}),
			]),
		).start();

		// Shimmer effect
		Animated.loop(
			Animated.timing(shimmerAnim, {
				toValue: 1,
				duration: 3000,
				useNativeDriver: true,
			}),
		).start();

		// Navigate to onboarding after 2.5 seconds
		const timer = setTimeout(() => {
			router.replace("/onboarding");
		}, 5500);

		return () => clearTimeout(timer);
	}, []);

	// Generate floating notes
	const musicNotes = ["♪", "♫", "♬", "♩", "♭", "♮", "♯"];
	const floatingNotes = Array.from({ length: 15 }, (_, i) => ({
		id: i,
		delay: i * 1000,
		startX: (Math.random() * 2 - 1) * width,
		endX: (Math.random() * 2 - 1) * width,
		startY: (Math.random() * 2 - 1) * height,
		endY: (Math.random() * 2 - 1) * height * 2,
		duration: 600 + Math.random() * 6000,
		symbol: musicNotes[Math.floor(Math.random() * musicNotes.length)],
	}));

	// Generate particles
	const particles = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		delay: i * 200,
		startX: -20 + Math.random() * 40,
		startY: -20 + Math.random() * 40,
		endX: -40 + Math.random() * 80,
		endY: -40 + Math.random() * 80,
	}));

	// Generate sound waves
	const waves = Array.from({ length: 8 }, (_, i) => ({
		id: i,
		delay: i * 100,
		index: i,
	}));

	// Slogan text for typewriter effect
	const sloganText = "Vì tâm tư nào cũng mang dáng hình thanh âm.";
	const baseDelay = 1600; // Start after logo animation completes

	return (
		<ScreenWrapper useGradient={true}>
			<View style={styles.container}>
				{/* Floating Music Notes Background */}
				{floatingNotes.map((note) => (
					<FloatingNote
						key={note.id}
						{...note}
					/>
				))}

				{/* Center Content */}
				<View style={styles.centerContent}>
					{/* Logo Area with Pulse */}
					<Animated.View
						style={[
							styles.logoContainer,
							{
								opacity: fadeAnim,
								transform: [
									{
										scale: Animated.multiply(
											scaleAnim,
											pulseAnim,
										),
									},
								],
							},
						]}>
						{/* App Name with decorative font */}
						<Typo
							variant="displayLarge"
							decorative
							color={theme.text.dark}
							style={styles.appName}>
							MoodNote
						</Typo>

						{/* Music Note Icon using text */}
						<View style={styles.iconContainer}>
							<Typo
								variant="displayLarge"
								color={theme.text.primary}
								style={styles.musicIcon}>
								♪
							</Typo>

							{/* Particles around icon */}
							{particles.map((particle) => (
								<Particle
									key={particle.id}
									{...particle}
								/>
							))}
						</View>

						{/* Sound Waves */}
						<View style={styles.soundWavesContainer}>
							{waves.map((wave) => (
								<SoundWave
									key={wave.id}
									{...wave}
								/>
							))}
						</View>
					</Animated.View>

					{/* Slogan with Typewriter Effect */}
					<Animated.View
						style={[
							styles.sloganContainer,
							{
								opacity: fadeAnim,
								transform: [{ translateY: slideAnim }],
							},
						]}>
						<TypewriterText
							text={sloganText}
							startDelay={baseDelay}
						/>
					</Animated.View>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: moderateScale(20),
	},
	centerContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	// Floating music notes
	floatingNote: {
		position: "absolute",
		zIndex: 1,
	},
	noteSymbol: {
		fontSize: moderateScale(32),
		textShadowColor: "rgba(255, 255, 255, 0.4)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	// Particles
	particle: {
		position: "absolute",
		width: moderateScale(6),
		height: moderateScale(6),
		borderRadius: moderateScale(3),
		// backgroundColor: "rgba(255, 255, 255, 0.9)",
		shadowColor: "#FFFFFF",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
		elevation: 5,
	},
	// Sound waves
	soundWave: {
		width: moderateScale(4),
		height: moderateScale(40),
		// backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: moderateScale(2),
		shadowColor: "#FFFFFF",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.6,
		shadowRadius: 4,
	},
	soundWavesContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: moderateScale(20),
		height: moderateScale(50),
	},
	// Logo and main content
	logoContainer: {
		alignItems: "center",
		marginBottom: moderateScale(60),
		position: "relative",
		overflow: "visible",
	},
	shimmerOverlay: {
		position: "absolute",
		top: 0,
		left: -width,
		width: moderateScale(100),
		height: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		transform: [{ skewX: "-20deg" }],
	},
	appName: {
		fontSize: moderateScale(56),
		textShadowColor: "rgba(255, 255, 255, 0.8)",
		textShadowOffset: { width: 0, height: 3 },
		textShadowRadius: 10,
		textAlign: "center",
		zIndex: 2,
	},
	iconContainer: {
		marginTop: moderateScale(10),
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		width: moderateScale(80),
		height: moderateScale(80),
	},
	musicIcon: {
		fontSize: moderateScale(52),
		textShadowColor: "rgba(255, 255, 255, 0.8)",
		textShadowOffset: { width: 0, height: 3 },
		textShadowRadius: 10,
		zIndex: 2,
	},
	// Slogan with Typewriter
	sloganContainer: {
		position: "absolute",
		bottom: moderateScale(100),
		width: width * 0.9,
		paddingVertical: moderateScale(16),
		paddingHorizontal: moderateScale(24),
		alignItems: "center",
	},
	typewriterContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	typewriterText: {
		fontStyle: "italic",
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
		fontWeight: "500",
		fontSize: moderateScale(18),
		lineHeight: moderateScale(26),
		letterSpacing: 0.5,
		textAlign: "center",
	},
	cursor: {
		fontStyle: "normal",
		fontWeight: "300",
		fontSize: moderateScale(18),
	},
});
