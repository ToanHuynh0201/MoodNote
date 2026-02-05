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
import useForm from "@/hooks/useForm";
import { registerSchema } from "@/validation/auth";
import { Typo, TextInput, Button, LoadingSpinner } from "@/components";
import { space, radius, sizes } from "@/constants/spacing";
import { ScreenWrapper } from "@/components/layout";

const RegisterScreen = () => {
  const { theme } = useTheme();
  const { values, errors, loading, setLoading, setFieldValue, validate } =
    useForm({
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },
      schema: registerSchema,
    });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleRegister = async () => {
    if (!validate()) {
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
                  { backgroundColor: theme.surface.raised },
                ]}
                activeOpacity={0.7}
              >
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
                value={values.name}
                onChangeText={(text) =>
                  setFieldValue("name", text)
                }
                error={errors.name}
                leftIcon="person"
                autoCapitalize="words"
              />

              <TextInput
                label="Email"
                placeholder="Nhập email của bạn"
                value={values.email}
                onChangeText={(text) =>
                  setFieldValue("email", text)
                }
                error={errors.email}
                leftIcon="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <TextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn"
                value={values.password}
                onChangeText={(text) =>
                  setFieldValue("password", text)
                }
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
                value={values.confirmPassword}
                onChangeText={(text) =>
                  setFieldValue("confirmPassword", text)
                }
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
                style={[styles.divider, { backgroundColor: theme.border.default }]}
              />
              <Typo
                variant="labelSmall"
                color={theme.text.tertiary}
                style={styles.dividerText}
              >
                hoặc đăng ký với
              </Typo>
              <View
                style={[styles.divider, { backgroundColor: theme.border.default }]}
              />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[
                  styles.socialButton,
                  { backgroundColor: theme.surface.raised },
                ]}
                activeOpacity={0.7}
              >
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
                activeOpacity={0.7}
              >
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
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="apple"
                  size={sizes.icon.lg}
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
                <Typo variant="bodyMedium" color={theme.primary.default}>
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
  registerButton: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: space[6],
  },
});

export default RegisterScreen;
