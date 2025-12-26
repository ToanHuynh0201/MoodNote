import { BORDER_RADIUS, SIZES, SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks";
import { moderateScale, scale, verticalScale } from "@/utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import Typo from "./Typo";

interface TextInputProps extends RNTextInputProps {
	label?: string;
	error?: string;
	leftIcon?: keyof typeof MaterialIcons.glyphMap;
	rightIcon?: keyof typeof MaterialIcons.glyphMap;
	onRightIconPress?: () => void;
	containerStyle?: object;
}

const TextInput = ({
	label,
	error,
	leftIcon,
	rightIcon,
	onRightIconPress,
	containerStyle,
	style,
	...props
}: TextInputProps) => {
	const { theme } = useTheme();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<Typo
					variant="labelMedium"
					color={error ? theme.error : theme.text.secondary}
					style={styles.label}>
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
				]}>
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
						activeOpacity={0.7}>
						<MaterialIcons
							name={rightIcon}
							size={moderateScale(20)}
							color={theme.text.secondary}
						/>
					</TouchableOpacity>
				)}
			</View>

			{error && (
				<Typo
					variant="labelSmall"
					color={theme.error}
					style={styles.error}>
					{error}
				</Typo>
			)}
		</View>
	);
};

export default TextInput;

const styles = StyleSheet.create({
	container: {
		marginBottom: verticalScale(SPACING.input.marginBottom),
	},
	label: {
		marginBottom: verticalScale(SPACING.margin.xs),
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1.5,
		borderRadius: moderateScale(BORDER_RADIUS.md),
		paddingHorizontal: scale(SPACING.input.padding),
		height: verticalScale(SIZES.input.height),
	},
	input: {
		flex: 1,
		fontSize: moderateScale(SPACING.input.padding),
		fontFamily: "Segoe UI",
	},
	leftIcon: {
		marginRight: scale(SPACING.gap.sm),
	},
	rightIcon: {
		marginLeft: scale(SPACING.gap.sm),
		padding: moderateScale(SPACING.micro.xs),
	},
	error: {
		marginTop: verticalScale(SPACING.micro.xs),
		marginLeft: scale(SPACING.micro.xs),
	},
});
