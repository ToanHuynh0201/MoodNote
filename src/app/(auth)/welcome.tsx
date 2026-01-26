import { IconButton, ScreenWrapper, Typo } from "@/components";
import { space, radius, sizes, shadows } from "@/constants/spacing";
import { fontSizes } from "@/constants/typography";
import { useTheme } from "@/hooks";
import { s } from "@/utils/scaling";
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
								backgroundColor: theme.primary.default,
								shadowColor: theme.shadow.color,
							},
						]}>
						<MaterialIcons
							name="favorite"
							size={s(80)}
							color={theme.text.onPrimary}
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
						color={theme.primary.default}
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
								size={sizes.icon.lg}
								color={theme.text.onPrimary}
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
								size={sizes.icon.lg}
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
		paddingVertical: s(60),
		paddingHorizontal: space[7],
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	iconContainer: {
		width: sizes.iconContainer.sm,
		height: sizes.iconContainer.sm,
		borderRadius: radius["3xl"],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: space[8],
		...shadows.lg,
	},
	welcomeTitle: {
		marginBottom: space[2],
		fontSize: fontSizes["2xl"],
		textShadowColor: "rgba(0, 0, 0, 0.15)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
		fontWeight: "500",
	},
	appName: {
		fontSize: fontSizes["6xl"],
		marginBottom: space[6],
		paddingVertical: space[2],
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 6,
	},
	description: {
		lineHeight: s(26),
		paddingHorizontal: space[7],
		textShadowColor: "rgba(0, 0, 0, 0.1)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
		fontSize: fontSizes.xl,
		fontWeight: "500",
	},
	buttonContainer: {
		width: "100%",
		gap: space[4],
	},
	button: {
		width: "100%",
	},
});
