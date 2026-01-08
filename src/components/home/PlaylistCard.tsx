import { space, vSpace, radius, sizes } from "@/constants/spacing";
import { useTheme } from "@/hooks";
import { PlaylistCardProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typo } from "../common";

export const PlaylistCard = ({
	title,
	artist,
	coverUrl,
	onPress,
	onLike,
	onInfo,
	onShare,
	onPlay,
	isLiked = false,
}: PlaylistCardProps) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[styles.container]}
			onPress={onPress}
			activeOpacity={0.7}>
			<View style={styles.content}>
				{coverUrl ? (
					<Image
						source={{ uri: coverUrl }}
						style={styles.cover}
					/>
				) : (
					<View
						style={[
							styles.cover,
							{ backgroundColor: theme.surface.elevated },
						]}>
						<Ionicons
							name="musical-notes"
							size={sizes.icon.lg}
							color={theme.text.tertiary}
						/>
					</View>
				)}

				<View style={styles.info}>
					<Typo
						variant="titleMedium"
						style={styles.title}
						color={theme.text.primary}
						numberOfLines={1}>
						{title}
					</Typo>
					<Typo
						variant="bodySmall"
						style={styles.artist}
						color={theme.text.secondary}
						numberOfLines={1}>
						{artist}
					</Typo>

					<View style={styles.actions}>
						<TouchableOpacity
							onPress={onLike}
							style={styles.actionButton}>
							<Ionicons
								name={isLiked ? "heart" : "heart-outline"}
								size={sizes.icon.md}
								color={
									isLiked
										? theme.secondary.default
										: theme.text.secondary
								}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onInfo}
							style={styles.actionButton}>
							<Ionicons
								name="information-circle-outline"
								size={sizes.icon.md}
								color={theme.text.secondary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onShare}
							style={styles.actionButton}>
							<Ionicons
								name="share-outline"
								size={sizes.icon.md}
								color={theme.text.secondary}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={onPlay}
				style={[
					styles.playButton,
					{ backgroundColor: theme.primary.default },
				]}>
				<Ionicons
					name="play"
					size={sizes.icon.lg}
					color={theme.text.onPrimary}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: vSpace[2],
		paddingVertical: vSpace[1],
	},
	content: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	cover: {
		width: sizes.icon.xl,
		height: sizes.icon.xl,
		borderRadius: radius.sm,
		marginRight: space[4],
		alignItems: "center",
		justifyContent: "center",
	},
	info: {
		flex: 1,
	},
	title: {
		fontWeight: "600",
		marginBottom: vSpace[1],
	},
	artist: {
		marginBottom: vSpace[1],
	},
	actions: {
		flexDirection: "row",
		gap: space[4],
	},
	actionButton: {
		padding: space[1],
	},
	playButton: {
		width: sizes.button.height,
		height: sizes.button.height,
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: space[3],
	},
});
