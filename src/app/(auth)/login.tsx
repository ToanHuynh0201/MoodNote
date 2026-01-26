import { Button, LoadingSpinner, TextInput, Typo } from "@/components";
import { ScreenWrapper } from "@/components/layout";
import { radius, sizes, space } from "@/constants/spacing";
import { useTheme } from "@/hooks";
import { spacing } from "@/utils/scaling";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Animated,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const LoginScreen = () => {
	const { theme } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);
	const [loading, setLoading] = useState(false);

	// Animation values
	const fadeAnim = new Animated.Value(0);
	const slideAnim = new Animated.Value(30);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const validateForm = () => {
		const newErrors: { email?: string; password?: string } = {};

		// Email validation
		if (!email.trim()) {
			newErrors.email = "Vui lòng nhập email";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Email không hợp lệ";
		}

		// Password validation
		if (!password) {
			newErrors.password = "Vui lòng nhập mật khẩu";
		} else if (password.length < 6) {
			newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async () => {
		// if (!validateForm()) {
		// 	return;
		// }

		setLoading(true);

		// TODO: Implement actual login logic with backend
		setTimeout(() => {
			setLoading(false);
			router.replace("/(tabs)");
		}, 2000);
	};

	const handleForgotPassword = () => {
		// TODO: Navigate to forgot password screen
		console.log("Forgot password");
	};

	const handleSignUp = () => {
		router.push("/register");
	};

	return (
		<ScreenWrapper useGradient={true}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled">
					<Animated.View
						style={[
							styles.container,
							{
								opacity: fadeAnim,
								transform: [{ translateY: slideAnim }],
							},
						]}>
						{/* Header */}
						<View style={styles.header}>
							<TouchableOpacity
								onPress={() => router.back()}
								style={[
									styles.backButton,
									{ backgroundColor: theme.surface.raised },
								]}
								activeOpacity={0.7}>
								<MaterialIcons
									name="arrow-back"
									size={sizes.icon.lg}
									color={theme.text.primary}
								/>
							</TouchableOpacity>

							<View style={styles.titleContainer}>
								<Typo
									variant="headlineLarge"
									color={theme.text.primary}
									style={styles.title}>
									Đăng nhập
								</Typo>
								<Typo
									variant="bodyMedium"
									color={theme.text.secondary}
									style={styles.subtitle}>
									Chào mừng bạn trở lại!
								</Typo>
							</View>
						</View>

						{/* Form */}
						<View style={styles.form}>
							<TextInput
								label="Email"
								placeholder="Nhập email của bạn"
								value={email}
								onChangeText={(text) => {
									setEmail(text);
									if (errors.email)
										setErrors({
											...errors,
											email: undefined,
										});
								}}
								error={errors.email}
								leftIcon="email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoComplete="email"
							/>

							<TextInput
								label="Mật khẩu"
								placeholder="Nhập mật khẩu của bạn"
								value={password}
								onChangeText={(text) => {
									setPassword(text);
									if (errors.password)
										setErrors({
											...errors,
											password: undefined,
										});
								}}
								error={errors.password}
								leftIcon="lock"
								rightIcon={
									showPassword
										? "visibility-off"
										: "visibility"
								}
								onRightIconPress={() =>
									setShowPassword(!showPassword)
								}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
							/>

							<TouchableOpacity
								onPress={handleForgotPassword}
								style={styles.forgotPassword}
								activeOpacity={0.7}>
								<Typo
									variant="labelMedium"
									color={theme.primary.default}>
									Quên mật khẩu?
								</Typo>
							</TouchableOpacity>

							<Button
								label="Đăng nhập"
								onPress={handleLogin}
								variant="filled"
								disabled={loading}
								style={styles.loginButton}
							/>
						</View>

						{/* Divider */}
						<View style={styles.dividerContainer}>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.border.default },
								]}
							/>
							<Typo
								variant="labelSmall"
								color={theme.text.tertiary}
								style={styles.dividerText}>
								hoặc
							</Typo>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.border.default },
								]}
							/>
						</View>

						{/* Social Login */}
						<View style={styles.socialContainer}>
							<TouchableOpacity
								style={[
									styles.socialButton,
									{ backgroundColor: theme.surface.raised },
								]}
								activeOpacity={0.7}>
								<MaterialIcons
									name="g-translate"
									size={sizes.icon.lg}
									color={theme.text.primary}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.socialButton,
									{ backgroundColor: theme.surface.raised },
								]}
								activeOpacity={0.7}>
								<MaterialIcons
									name="facebook"
									size={sizes.icon.lg}
									color={theme.text.primary}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.socialButton,
									{ backgroundColor: theme.surface.raised },
								]}
								activeOpacity={0.7}>
								<MaterialIcons
									name="apple"
									size={sizes.icon.lg}
									color={theme.text.primary}
								/>
							</TouchableOpacity>
						</View>

						{/* Sign Up Link */}
						<View style={styles.signUpContainer}>
							<Typo
								variant="bodyMedium"
								color={theme.text.secondary}>
								Chưa có tài khoản?{" "}
							</Typo>
							<TouchableOpacity
								onPress={handleSignUp}
								activeOpacity={0.7}>
								<Typo
									variant="labelMedium"
									color={theme.primary.default}>
									Đăng ký ngay
								</Typo>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</ScrollView>
			</KeyboardAvoidingView>

			<LoadingSpinner
				visible={loading}
				fullScreen={true}
				messages={["Đang đăng nhập...", "Vui lòng đợi..."]}
			/>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	keyboardView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: space[7],
		paddingTop: space[5],
	},
	header: {
		marginBottom: space[7],
	},
	backButton: {
		width: sizes.icon["2xl"],
		height: sizes.icon["2xl"],
		borderRadius: radius["2xl"],
		alignItems: "center",
		justifyContent: "center",
		marginBottom: space[5],
	},
	titleContainer: {
		marginBottom: space[3],
	},
	title: {
		marginBottom: space[3],
	},
	subtitle: {
		opacity: 0.8,
	},
	form: {
		marginBottom: space[6],
	},
	forgotPassword: {
		alignSelf: "flex-end",
		marginTop: spacing(-8),
		marginBottom: space[6],
	},
	loginButton: {
		marginTop: space[3],
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: space[6],
	},
	divider: {
		flex: 1,
		height: 1,
	},
	dividerText: {
		marginHorizontal: space[5],
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: sizes.social.gap,
		marginBottom: space[6],
	},
	socialButton: {
		width: sizes.social.size,
		height: sizes.social.size,
		borderRadius: radius["3xl"],
		alignItems: "center",
		justifyContent: "center",
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: space[6],
	},
});

export default LoginScreen;
