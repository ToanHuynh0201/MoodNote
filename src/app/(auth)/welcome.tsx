import { IconButton, ScreenWrapper, Typo } from "@/components";
import { useTheme } from "@/hooks";
import { componentSizes, borderRadius, spacingScale, verticalSpacing } from "@/constants/design";
import { moderateScale, moderateVerticalScale } from "@/utils/responsive";
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

	const handleLogin = () => {
		router.push("/login");
	};

	const handleRegister = () => {
		router.push("/register");
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
								backgroundColor: theme.primary,
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
						color={theme.text.primary}
						align="center"
						style={styles.welcomeTitle}>
						Chào mừng đến với
					</Typo>

					<Typo
						variant="displayLarge"
						decorative={true}
						color={theme.primary}
						align="center"
						style={styles.appName}>
						MoodNote
					</Typo>

					<Typo
						variant="bodyLarge"
						color={theme.text.primary}
						align="center"
						style={styles.description}
						numberOfLines={3}>
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
						onPress={handleLogin}
						style={styles.button}
					/>

					<IconButton
						icon={
							<MaterialIcons
								name="person-add"
								size={moderateScale(24)}
								color={theme.text.primary}
							/>
						}
						label="Đăng kí"
						variant="tonal"
						onPress={handleRegister}
						style={styles.button}
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
		paddingHorizontal: componentSizes.screen.paddingVertical,
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		width: componentSizes.iconContainer.small,
		height: componentSizes.iconContainer.small,
		borderRadius: borderRadius.xxl,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacingScale.xxxxl,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 8,
	},
	welcomeTitle: {
		marginBottom: verticalSpacing.sm,
		fontSize: moderateScale(28),
		textShadowColor: "rgba(0, 0, 0, 0.15)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
		fontWeight: "500",
	},
	appName: {
		fontSize: moderateScale(56),
		marginBottom: verticalSpacing.xl,
		paddingVertical: moderateVerticalScale(10),
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 6,
	},
	description: {
		lineHeight: moderateScale(26),
		paddingHorizontal: componentSizes.screen.paddingVertical,
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
});
