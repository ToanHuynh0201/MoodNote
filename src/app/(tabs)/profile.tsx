import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo, ThemeToggle } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { space, vSpace, radius } from "@/constants/spacing";
import { s, vSpacing } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface MenuItem {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	onPress: () => void;
	showArrow?: boolean;
	color?: string;
}

export default function ProfileScreen() {
	const { theme, isDark, toggleTheme } = useTheme();
	const { user, logout } = useAuth();

	const menuItems: MenuItem[] = [
		{
			icon: "person-outline",
			label: "Tài khoản",
			onPress: () => {
				// TODO: Navigate to account settings
				console.log("Account settings");
			},
			showArrow: true,
		},
		{
			icon: "settings-outline",
			label: "Cài đặt",
			onPress: () => {
				// TODO: Navigate to settings
				console.log("Settings");
			},
			showArrow: true,
		},
		{
			icon: "help-circle-outline",
			label: "Hỗ trợ",
			onPress: () => {
				// TODO: Navigate to support
				console.log("Support");
			},
			showArrow: true,
		},
		{
			icon: "lock-closed-outline",
			label: "Bảo mật",
			onPress: () => {
				// TODO: Navigate to security settings
				console.log("Security");
			},
			showArrow: true,
		},
		{
			icon: "log-out-outline",
			label: "Đăng xuất",
			onPress: async () => {
				await logout();
				router.replace("/(auth)/welcome");
			},
			showArrow: false,
			color: theme.status.error,
		},
	];

	return (
		<ScreenWrapper>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				{/* Header with Title */}
				<View style={styles.header}>
					<Typo
						variant="headlineLarge"
						style={{ 
							color: isDark ? theme.text.onPrimary : theme.primary.default,
							textAlign: "center" 
						}}>
						Tài khoản
					</Typo>
				</View>

				{/* Avatar Section */}
				<View style={styles.avatarSection}>
					<View
						style={[
							styles.avatarContainer,
							{
								backgroundColor: theme.surface.base,
							},
						]}>
						{user?.avatar ? (
							<Image
								source={{ uri: user.avatar }}
								style={styles.avatar}
							/>
						) : (
							<Ionicons
								name="person"
								size={s(60)}
								color={theme.text.tertiary}
							/>
						)}
					</View>

					{/* User Info */}
					<Typo
						variant="titleLarge"
						style={{ 
							color: isDark ? theme.text.onPrimary : theme.primary.default,
							marginTop: vSpace[4] 
						}}>
						{user?.username || "Bunnie"}
					</Typo>
					<View style={styles.streakContainer}>
						<Typo
							variant="bodyMedium"
							style={{ 
								color: isDark ? theme.text.onPrimary : theme.primary.default 
							}}>
							{user?.streak || 20}
						</Typo>
						<Ionicons
							name="flame"
							size={s(16)}
							color={theme.emotions.excited}
						/>
					</View>
				</View>

				{/* Theme Toggle Card */}
				<View
					style={[
						styles.menuItemCard,
						{
							backgroundColor: isDark 
								? theme.surface.elevated + "80" 
								: theme.surface.base + "E6",
							borderColor: isDark ? theme.border.subtle : theme.border.default,
						},
					]}>
					<View style={styles.menuItemLeft}>
						<Ionicons
							name={isDark ? "moon" : "sunny"}
							size={s(24)}
							color={isDark ? theme.text.onPrimary : theme.primary.default}
						/>
						<Typo
							variant="bodyLarge"
							style={{ 
								color: isDark ? theme.text.onPrimary : theme.primary.default 
							}}>
							Chế độ {isDark ? "tối" : "sáng"}
						</Typo>
					</View>
					<ThemeToggle isDark={isDark} onToggle={toggleTheme} />
				</View>

				{/* Menu Items - Each with own card */}
				{menuItems.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.menuItemCard,
							{
								backgroundColor: isDark 
									? theme.surface.elevated + "80" 
									: theme.surface.base + "E6",
								borderColor: isDark ? theme.border.subtle : theme.border.default,
							},
						]}
						onPress={item.onPress}
						activeOpacity={0.7}>
						<View style={styles.menuItemLeft}>
							<Ionicons
								name={item.icon}
								size={s(24)}
								color={item.color || (isDark ? theme.text.onPrimary : theme.primary.default)}
							/>
							<Typo
								variant="bodyLarge"
								style={{
									color: item.color || (isDark ? theme.text.onPrimary : theme.primary.default),
								}}>
								{item.label}
							</Typo>
						</View>
						{item.showArrow && (
							<Ionicons
								name="chevron-forward"
								size={s(20)}
								color={isDark ? theme.text.onPrimary : theme.primary.default}
							/>
						)}
					</TouchableOpacity>
				))}

				{/* Spacing at bottom */}
				<View style={{ height: vSpacing(120) }} />
			</ScrollView>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: space[7],
	},
	header: {
		paddingTop: vSpace[8],
		paddingBottom: vSpace[6],
		alignItems: "center",
	},
	avatarSection: {
		alignItems: "center",
		marginBottom: vSpace[8],
	},
	avatarContainer: {
		width: s(120),
		height: s(120),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	avatar: {
		width: "100%",
		height: "100%",
	},
	streakContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: space[2],
		marginTop: vSpace[2],
	},
	menuItemCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: space[5],
		paddingVertical: vSpace[4],
		borderRadius: radius.xl,
		borderWidth: 1,
		marginBottom: vSpace[3],
	},
	menuItemLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: space[4],
		flex: 1,
	},
});
