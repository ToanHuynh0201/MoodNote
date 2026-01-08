import { useTheme } from "@/hooks";
import { sizes, radius, space, vSpace } from "@/constants/spacing";
import { fontSizes, FONTS } from "@/constants/typography";
import { s } from "@/utils/scaling";
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
					color={error ? theme.status.error : theme.text.secondary}
					style={styles.label}>
					{label}
				</Typo>
			)}

			<View
				style={[
					styles.inputContainer,
					{
						backgroundColor: theme.surface.base,
						borderColor: error
							? theme.status.error
							: isFocused
								? theme.primary.default
								: theme.border.default,
					},
				]}>
				{leftIcon && (
					<MaterialIcons
						name={leftIcon}
						size={sizes.icon.md}
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
							size={sizes.icon.md}
							color={theme.text.secondary}
						/>
					</TouchableOpacity>
				)}
			</View>

			{error && (
				<Typo
					variant="labelSmall"
					color={theme.status.error}
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
		marginBottom: vSpace[4], // 16px
	},
	label: {
		marginBottom: vSpace[3], // 8px
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1.5,
		borderRadius: radius.lg,
		paddingHorizontal: sizes.input.paddingX,
		height: sizes.input.height,
	},
	input: {
		flex: 1,
		fontSize: fontSizes.lg, // 16px
		fontFamily: FONTS.regular,
	},
	leftIcon: {
		marginRight: space[4], // 12px
	},
	rightIcon: {
		marginLeft: space[4], // 12px
		padding: s(4),
	},
	error: {
		marginTop: vSpace[2], // 4px
		marginLeft: space[2], // 4px
	},
});
