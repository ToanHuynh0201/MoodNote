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
import { Typo, TextInput, Button, LoadingSpinner } from "@/components";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
import { ScreenWrapper } from "@/components/layout";

const RegisterScreen = () => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
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
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    } else if (name.trim().length < 2) {
      newErrors.name = "Họ tên phải có ít nhất 2 ký tự";
    }

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

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // TODO: Implement actual registration logic with backend
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);
  };

  const handleLogin = () => {
    router.push("/login");
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
                  Đăng ký
                </Typo>
                <Typo
                  variant="bodyMedium"
                  color={theme.text.secondary}
                  style={styles.subtitle}
                >
                  Tạo tài khoản mới để bắt đầu
                </Typo>
              </View>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <TextInput
                label="Họ và tên"
                placeholder="Nhập họ và tên của bạn"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                error={errors.name}
                leftIcon="person"
                autoCapitalize="words"
              />

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

              <TextInput
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: undefined });
                }}
                error={errors.confirmPassword}
                leftIcon="lock"
                rightIcon={
                  showConfirmPassword ? "visibility-off" : "visibility"
                }
                onRightIconPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />

              <Button
                label="Đăng ký"
                onPress={handleRegister}
                variant="filled"
                disabled={loading}
                style={styles.registerButton}
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
                hoặc đăng ký với
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

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Typo variant="bodyMedium" color={theme.text.secondary}>
                Đã có tài khoản?{" "}
              </Typo>
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                <Typo variant="bodyMedium" color={theme.primary}>
                  Đăng nhập ngay
                </Typo>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingSpinner
        visible={loading}
        fullScreen={true}
        messages={["Đang đăng ký...", "Vui lòng đợi..."]}
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
  registerButton: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
});

export default RegisterScreen;
