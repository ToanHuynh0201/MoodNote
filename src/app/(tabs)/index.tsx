import { ScreenWrapper, Typo, HomeStatsCard, DiaryEntryCard, PlaylistCard } from "@/components";
import { spacingScale, verticalSpacing } from "@/constants/design";
import { useAuth, useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from "react-native";

// Mock data
const MOCK_STATS = [
	{
		id: 1,
		days: 18,
		label: "Cuối mỗi ngày",
		icon: "happy",
		color: "#8B5CF6", // Purple
	},
	{
		id: 2,
		days: 20,
		label: "Giữ chuỗi\nbạn nhà",
		icon: "flame",
		color: "#F97316", // Orange/Fire
	},
	{
		id: 3,
		days: 2,
		label: "Buồn rồi,\nqua nhanh thôi",
		icon: "sad",
		color: "#60A5FA", // Blue
	},
];

const MOCK_DIARY_ENTRIES = [
	{
		id: 1,
		title: "Nhật kí đi date với anh Z",
		preview: "Tụi mình đi ăn trót đoạn. Anh nói, chuyện ít mà cảu nào ra cảu đó, kiểu người không màu mè những lời có ở trong lướng. Mình nghe mà thấy... hơi muốn nghe hoài...",
		date: "20:12\n24/12/2025",
	},
	{
		id: 2,
		title: "Nhật kí đi date với anh Z",
		preview: "Tụi mình đi ăn trót đoạn. Anh nói, chuyện ít mà cảu nào ra cảu đó, kiểu người không màu mè những lời có ở trong lướng. Mình nghe mà thấy... hơi muốn nghe hoài...",
		date: "20:12\n24/12/2025",
	},
	{
		id: 3,
		title: "Nhật kí đi date với anh Z",
		preview: "Tụi mình đi ăn trót đoạn. Anh nói, chuyện ít mà cảu nào ra cảu đó, kiểu người không màu mè những lời có ở trong lướng. Mình nghe mà thấy... hơi muốn nghe hoài...",
		date: "20:12\n24/12/2025",
	},
];

const MOCK_PLAYLIST = [
	{
		id: 1,
		title: "Lẻ lưu ly",
		artist: "Vũ Phụng Tiên x DT Tập Rap x Drum7",
		coverUrl: "https://i.scdn.co/image/ab67616d0000b273f7b7e7e7e7e7e7e7e7e7e7e7",
		isLiked: true,
	},
	{
		id: 2,
		title: "Rơi tự do",
		artist: "Lýhan",
		coverUrl: "https://i.scdn.co/image/ab67616d0000b273f7b7e7e7e7e7e7e7e7e7e7e7",
		isLiked: false,
	},
	{
		id: 3,
		title: "Phép màu",
		artist: "Mayday x Minh Tóc",
		coverUrl: "https://i.scdn.co/image/ab67616d0000b273f7b7e7e7e7e7e7e7e7e7e7e7",
		isLiked: true,
	},
	{
		id: 4,
		title: "Pin dự phòng",
		artist: "Dương Domic",
		coverUrl: "https://i.scdn.co/image/ab67616d0000b273f7b7e7e7e7e7e7e7e7e7e7e7",
		isLiked: false,
	},
];

const HomeScreen = () => {
	const { theme } = useTheme();
	const { user } = useAuth();

	const renderStatIcon = (iconName: string, color: string) => {
		let name: keyof typeof Ionicons.glyphMap;

		switch (iconName) {
			case "happy":
				name = "happy-outline";
				break;
			case "flame":
				name = "flame";
				break;
			case "sad":
				name = "sad-outline";
				break;
			default:
				name = "ellipse-outline";
		}

		return <Ionicons name={name} size={32} color="#FFFFFF" />;
	};

	return (
		<ScreenWrapper>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Image
							source={{ uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Bunnie" }}
							style={styles.avatar}
						/>
						<View>
							<Typo variant="headlineSmall" color={theme.text.primary} style={styles.greeting}>
								Hi, {user?.name || "Bunnie"}!
							</Typo>
							<Typo variant="bodySmall" color={theme.text.secondary}>
								Ngày hôm nay của bạn có ổn không?
							</Typo>
						</View>
					</View>
				</View>

				{/* Stats Cards */}
				<View style={styles.statsContainer}>
					{MOCK_STATS.map((stat) => (
						<HomeStatsCard
							key={stat.id}
							icon={renderStatIcon(stat.icon, stat.color)}
							days={stat.days}
							label={stat.label}
							accentColor={stat.color}
						/>
					))}
				</View>

				{/* Recent Diary Entries */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Typo variant="titleLarge" color={theme.text.primary}>
							Nhật kí gần đây
						</Typo>
						<TouchableOpacity>
							<Typo variant="labelMedium" color={theme.text.tertiary}>
								xem thêm
							</Typo>
						</TouchableOpacity>
					</View>
					{MOCK_DIARY_ENTRIES.map((entry) => (
						<DiaryEntryCard
							key={entry.id}
							title={entry.title}
							preview={entry.preview}
							date={entry.date}
							onPress={() => console.log("Open diary entry", entry.id)}
						/>
					))}
				</View>

				{/* Recent Playlist */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Typo variant="titleLarge" color={theme.text.primary}>
							Playlist gần đây
						</Typo>
						<TouchableOpacity>
							<Typo variant="labelMedium" color={theme.text.tertiary}>
								xem thêm
							</Typo>
						</TouchableOpacity>
					</View>
					{MOCK_PLAYLIST.map((song) => (
						<PlaylistCard
							key={song.id}
							title={song.title}
							artist={song.artist}
							coverUrl={song.coverUrl}
							isLiked={song.isLiked}
							onPress={() => console.log("Open song", song.id)}
							onLike={() => console.log("Like song", song.id)}
							onInfo={() => console.log("Song info", song.id)}
							onShare={() => console.log("Share song", song.id)}
							onPlay={() => console.log("Play song", song.id)}
						/>
					))}
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacingScale.xl,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: verticalSpacing.lg,
		marginBottom: verticalSpacing.md,
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacingScale.md,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	greeting: {
		fontWeight: "600",
	},
	statsContainer: {
		flexDirection: "row",
		gap: spacingScale.sm,
		marginBottom: verticalSpacing.xl,
	},
	section: {
		marginBottom: verticalSpacing.xl,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: verticalSpacing.md,
	},
});
