import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
import Typo from "./Typo";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: object;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typo
          variant="labelMedium"
          color={error ? theme.error : theme.text.secondary}
          style={styles.label}
        >
          {label}
        </Typo>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.surface.primary,
            borderColor: error
              ? theme.error
              : isFocused
              ? theme.primary
              : theme.border.main,
          },
        ]}
      >
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={moderateScale(20)}
            color={theme.text.secondary}
            style={styles.leftIcon}
          />
        )}

        <RNTextInput
          style={[
            styles.input,
            {
              color: theme.text.primary,
            },
            style,
          ]}
          placeholderTextColor={theme.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={rightIcon}
              size={moderateScale(20)}
              color={theme.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Typo variant="labelSmall" color={theme.error} style={styles.error}>
          {error}
        </Typo>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },
  label: {
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    height: verticalScale(52),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: "Segoe UI",
  },
  leftIcon: {
    marginRight: scale(12),
  },
  rightIcon: {
    marginLeft: scale(12),
    padding: moderateScale(4),
  },
  error: {
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
});
