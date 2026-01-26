import { radius, shadows, space } from "@/constants/spacing";
import { FONTS, fontSizes } from "@/constants/typography";
import { useTheme } from "@/hooks/useTheme";
import { ActionMenuProps } from "@/types";
import { s, spacing } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Animated,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export const ActionMenu = ({ visible, onClose, items }: ActionMenuProps) => {
	const { theme } = useTheme();
	const [scaleAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (visible) {
			Animated.spring(scaleAnim, {
				toValue: 1,
				useNativeDriver: true,
				tension: 50,
				friction: 7,
			}).start();
		} else {
			Animated.timing(scaleAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start();
		}
	}, [visible]);

	if (!visible) return null;

	return (
		<Modal
			transparent
			visible={visible}
			animationType="none">
			<Pressable
				style={styles.overlay}
				onPress={onClose}>
				<View style={styles.menuContainer}>
					<Animated.View
						style={[
							styles.menu,
							{
								backgroundColor: theme.surface.elevated,
								borderColor: theme.border.subtle,
								...shadows.lg,
								shadowColor: theme.shadow.color,
								transform: [{ scale: scaleAnim }],
							},
						]}>
						{/* Triangle pointer */}
						<View
							style={[
								styles.triangle,
								{
									borderTopColor: theme.surface.elevated,
								},
							]}
						/>

						{/* Menu items */}
						{items.map((item, index) => (
							<React.Fragment key={index}>
								<TouchableOpacity
									style={styles.menuItem}
									onPress={() => {
										item.onPress();
										onClose();
									}}
									activeOpacity={0.7}>
									<View
										style={[
											styles.iconCircle,
											{
												backgroundColor:
													item.color ||
													theme.primary.default,
											},
										]}>
										<Ionicons
											name={item.icon}
											size={s(20)}
											color={theme.text.onPrimary}
										/>
									</View>
									<Text
										style={[
											styles.menuItemText,
											{
												color: theme.text.primary,
											},
										]}>
										{item.label}
									</Text>
								</TouchableOpacity>
								{index < items.length - 1 && (
									<View
										style={[
											styles.separator,
											{
												backgroundColor:
													theme.border.subtle,
											},
										]}
									/>
								)}
							</React.Fragment>
						))}
					</Animated.View>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	menuContainer: {
		width: "100%",
		alignItems: "center",
		paddingBottom: spacing(100), // Space above tab bar
	},
	menu: {
		width: spacing(280),
		borderRadius: radius.xl,
		borderWidth: 1,
		paddingVertical: space[2],
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.25,
		shadowRadius: 16,
		elevation: 12,
	},
	triangle: {
		position: "absolute",
		bottom: spacing(-12),
		alignSelf: "center",
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: s(12),
		borderRightWidth: s(12),
		borderTopWidth: s(12),
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: space[5],
		paddingVertical: space[4],
		gap: space[4],
	},
	iconCircle: {
		width: s(40),
		height: s(40),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
	menuItemText: {
		fontSize: fontSizes.base,
		fontFamily: FONTS.regular,
		flex: 1,
	},
	separator: {
		height: 1,
		marginHorizontal: space[5],
	},
});
