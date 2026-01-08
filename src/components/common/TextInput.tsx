import { useTheme } from "@/hooks";
import { componentSizes, borderRadius } from "@/constants/design";
import { moderateScale } from "@/utils/responsive";
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
		marginBottom: componentSizes.input.containerMargin,
	},
	label: {
		marginBottom: componentSizes.input.labelMargin,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1.5,
		borderRadius: borderRadius.md,
		paddingHorizontal: componentSizes.input.padding,
		height: componentSizes.input.height,
	},
	input: {
		flex: 1,
		fontSize: moderateScale(16),
		fontFamily: "Segoe UI",
	},
	leftIcon: {
		marginRight: componentSizes.input.iconMargin,
	},
	rightIcon: {
		marginLeft: componentSizes.input.iconMargin,
		padding: componentSizes.input.iconPadding,
	},
	error: {
		marginTop: componentSizes.input.errorMargin,
		marginLeft: componentSizes.input.errorMarginLeft,
	},
});
