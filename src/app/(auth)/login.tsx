import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { Typo, TextInput, IconButton, LoadingSpinner } from "@/components";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
import { ScreenWrapper } from "@/components/layout";

const LoginScreen = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
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
    if (!validateForm()) {
      return;
    }

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
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={[
                  styles.backButton,
                  { backgroundColor: theme.surface.primary },
                ]}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={moderateScale(24)}
                  color={theme.text.primary}
                />
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <Typo
                  variant="headlineLarge"
                  color={theme.text.primary}
                  style={styles.title}
                >
                  Đăng nhập
                </Typo>
                <Typo
                  variant="bodyMedium"
                  color={theme.text.secondary}
                  style={styles.subtitle}
                >
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
                  if (errors.email) setErrors({ ...errors, email: undefined });
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
                    setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                leftIcon="lock"
                rightIcon={showPassword ? "visibility-off" : "visibility"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
                activeOpacity={0.7}
              >
                <Typo variant="labelMedium" color={theme.primary}>
                  Quên mật khẩu?
                </Typo>
              </TouchableOpacity>

              <IconButton
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
                style={[styles.divider, { backgroundColor: theme.border.main }]}
              />
              <Typo
                variant="labelSmall"
                color={theme.text.tertiary}
                style={styles.dividerText}
              >
                hoặc
              </Typo>
              <View
                style={[styles.divider, { backgroundColor: theme.border.main }]}
              />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[
                  styles.socialButton,
                  { backgroundColor: theme.surface.primary },
                ]}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="g-translate"
                  size={moderateScale(24)}
                  color={theme.text.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.socialButton,
                  { backgroundColor: theme.surface.primary },
                ]}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="facebook"
                  size={moderateScale(24)}
                  color={theme.text.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.socialButton,
                  { backgroundColor: theme.surface.primary },
                ]}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="apple"
                  size={moderateScale(24)}
                  color={theme.text.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Typo variant="bodyMedium" color={theme.text.secondary}>
                Chưa có tài khoản?{" "}
              </Typo>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Typo variant="bodyMedium" color={theme.primary}>
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
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(20),
  },
  header: {
    marginBottom: verticalScale(32),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },
  titleContainer: {
    marginBottom: verticalScale(8),
  },
  title: {
    marginBottom: verticalScale(8),
  },
  subtitle: {
    opacity: 0.8,
  },
  form: {
    marginBottom: verticalScale(24),
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(24),
  },
  loginButton: {
    marginTop: verticalScale(8),
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(24),
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: scale(16),
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(16),
    marginBottom: verticalScale(24),
  },
  socialButton: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    alignItems: "center",
    justifyContent: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
});

export default LoginScreen;
