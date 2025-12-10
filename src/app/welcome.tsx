import { IconButton, ScreenWrapper, Typo } from "@/components";
import { useTheme } from "@/hooks";
import { moderateScale } from "@/utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
	const { theme } = useTheme();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideUpAnim = useRef(new Animated.Value(30)).current;
	const buttonAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Main entrance animation
		Animated.sequence([
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 600,
					useNativeDriver: true,
				}),
				Animated.timing(slideUpAnim, {
					toValue: 0,
					duration: 600,
					useNativeDriver: true,
				}),
			]),
			Animated.timing(buttonAnim, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const handleGetStarted = () => {
		// TODO: Check if user is logged in, navigate accordingly
		router.replace("/(tabs)");
	};

	return (
		<ScreenWrapper useGradient={true}>
			<View style={styles.container}>
				{/* Main Content */}
				<Animated.View
					style={[
						styles.contentContainer,
						{
							opacity: fadeAnim,
							transform: [{ translateY: slideUpAnim }],
						},
					]}>
					{/* Welcome Icon with Circle Background */}
					<View
						style={[
							styles.iconContainer,
							{
								backgroundColor: theme.primaryDark,
							},
						]}>
						<MaterialIcons
							name="favorite"
							size={moderateScale(80)}
							color={theme.text.inverse}
						/>
					</View>

					{/* Welcome Text */}
					<Typo
						variant="displayMedium"
						color={theme.text.dark}
						align="center"
						style={styles.welcomeTitle}>
						Chào mừng đến với
					</Typo>

					<Typo
						variant="displayLarge"
						decorative={true}
						color={theme.text.dark}
						align="center"
						style={styles.appName}>
						MoodNote
					</Typo>

					<Typo
						variant="bodyLarge"
						color={theme.text.primary}
						align="center"
						style={styles.description}>
						Hãy bắt đầu hành trình khám phá cảm xúc và tìm kiếm
						thanh âm cho tâm hồn bạn
					</Typo>
				</Animated.View>

				{/* Bottom Buttons */}
				<Animated.View
					style={[
						styles.buttonContainer,
						{
							opacity: buttonAnim,
							transform: [
								{
									translateY: buttonAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [20, 0],
									}),
								},
							],
						},
					]}>
					<IconButton
						icon={
							<MaterialIcons
								name="login"
								size={moderateScale(24)}
								color={theme.text.inverse}
							/>
						}
						label="Đăng nhập"
						variant="filled"
						onPress={handleGetStarted}
						style={styles.button}
					/>

					<IconButton
						icon={
							<MaterialIcons
								name="person-add"
								size={moderateScale(24)}
								color={theme.primaryDark}
							/>
						}
						label="Đăng ký"
						variant="outlined"
						onPress={handleGetStarted}
						style={[styles.button, styles.secondaryButton]}
					/>
				</Animated.View>
			</View>
		</ScreenWrapper>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingVertical: moderateScale(60),
		paddingHorizontal: moderateScale(20),
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		width: moderateScale(140),
		height: moderateScale(140),
		borderRadius: moderateScale(70),
		justifyContent: "center",
		alignItems: "center",
		marginBottom: moderateScale(40),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 8,
	},
	welcomeTitle: {
		marginBottom: moderateScale(8),
		fontSize: moderateScale(28),
		textShadowColor: "rgba(0, 0, 0, 0.15)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
		fontWeight: "500",
	},
	appName: {
		fontSize: moderateScale(56),
		marginBottom: moderateScale(24),
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 6,
	},
	description: {
		lineHeight: moderateScale(26),
		paddingHorizontal: moderateScale(20),
		textShadowColor: "rgba(0, 0, 0, 0.1)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
		fontSize: moderateScale(17),
		fontWeight: "500",
	},
	buttonContainer: {
		width: "100%",
		gap: moderateScale(14),
	},
	button: {
		width: "100%",
	},
	secondaryButton: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderWidth: 2,
		borderColor: "rgba(124, 90, 200, 0.3)",
	},
});
