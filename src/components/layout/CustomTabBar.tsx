import { radius, shadows, sizes, space } from "@/constants/spacing";
import { useTheme } from "@/hooks/useTheme";
import { s, spacing } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActionMenu, ActionMenuItem } from "@/components/common";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	const { theme } = useTheme();
	const [showActionMenu, setShowActionMenu] = useState(false);

	// Tìm index của tab trung tâm (thường là tab thứ 3 trong 5 tabs)
	const centerIndex = Math.floor(state.routes.length / 2);

	// Define action menu items
	const actionMenuItems: ActionMenuItem[] = [
		{
			icon: "create-outline",
			label: "Write Diary Entry",
			onPress: () => {
				// TODO: Navigate to diary entry screen
				console.log("Write Diary Entry");
			},
			color: theme.emotions.calm,
		},
		{
			icon: "happy-outline",
			label: "Record Mood",
			onPress: () => {
				// TODO: Navigate to mood recording screen
				console.log("Record Mood");
			},
			color: theme.emotions.happy,
		},
		{
			icon: "camera-outline",
			label: "Add Photo Memory",
			onPress: () => {
				// TODO: Navigate to photo upload screen
				console.log("Add Photo Memory");
			},
			color: theme.emotions.excited,
		},
		{
			icon: "musical-notes-outline",
			label: "Create Playlist",
			onPress: () => {
				// TODO: Navigate to playlist creation
				console.log("Create Playlist");
			},
			color: theme.primary.default,
		},
	];

	const handleCenterButtonPress = () => {
		setShowActionMenu(true);
	};

	return (
		<View
			style={[
				styles.tabBarContainer,
				{
					backgroundColor: theme.surface.raised,
					borderTopColor: theme.border.subtle,
				},
			]}>
			{/* Shadow overlay */}
			<View
				style={[
					styles.shadowContainer,
					{
						...shadows.md,
						shadowColor: theme.shadow.color,
					},
				]}
			/>

			{/* Tab items */}
			<View style={styles.tabBar}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const isFocused = state.index === index;
					const isCenterTab = index === centerIndex;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key,
						});
					};

					// Icon mapping - customize theo routes của bạn
					const getIcon = () => {
						switch (route.name) {
							case "index":
								return isFocused ? "home" : "home-outline";
							case "stats":
								return isFocused
									? "stats-chart"
									: "stats-chart-outline";
							case "add":
								return "add";
							case "music":
								return isFocused
									? "musical-notes"
									: "musical-notes-outline";
							case "profile":
								return isFocused ? "person" : "person-outline";
							default:
								return "ellipse";
						}
					};

					// Render center floating button
					if (isCenterTab) {
						return (
							<TouchableOpacity
								key={route.key}
								accessibilityRole="button"
								accessibilityLabel="Add new entry"
								onPress={handleCenterButtonPress}
								style={styles.centerButtonContainer}>
								<View
									style={[
										styles.centerButton,
										{
											backgroundColor:
												theme.primary.default,
											...shadows.lg,
											shadowColor: theme.primary.default,
										},
									]}>
									<Ionicons
										name={getIcon() as any}
										size={s(32)}
										color={theme.text.onPrimary}
									/>
								</View>
							</TouchableOpacity>
						);
					}

					// Render regular tabs
					return (
						<TouchableOpacity
							key={route.key}
							accessibilityRole="button"
							accessibilityState={
								isFocused ? { selected: true } : {}
							}
							accessibilityLabel={
								options.tabBarAccessibilityLabel
							}
							onPress={onPress}
							onLongPress={onLongPress}
							style={styles.tabItem}>
							<View
								style={[
									styles.iconContainer,
									isFocused && {
										backgroundColor:
											theme.primary.default + "15", // 15% opacity
									},
								]}>
								<Ionicons
									name={getIcon() as any}
									size={sizes.icon.lg}
									color={
										isFocused
											? theme.primary.default
											: theme.text.tertiary
									}
								/>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Action Menu */}
			<ActionMenu
				visible={showActionMenu}
				onClose={() => setShowActionMenu(false)}
				items={actionMenuItems}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBarContainer: {
		position: "relative",
		borderTopWidth: 1,
	},
	shadowContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	tabBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: space[4],
		paddingTop: spacing(12),
		paddingBottom: spacing(Platform.OS === "ios" ? 24 : 12),
		height: spacing(Platform.OS === "ios" ? 88 : 64),
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	iconContainer: {
		width: s(48),
		height: s(48),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: radius.full,
	},
	centerButtonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: spacing(-28), // Nổi lên trên tab bar
	},
	centerButton: {
		width: s(64),
		height: s(64),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
});
