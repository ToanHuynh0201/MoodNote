import {
	borderRadius,
	componentSizes,
	spacingScale,
	verticalSpacing,
} from "@/constants/design";
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
							size={24}
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
								size={20}
								color={
									isLiked
										? theme.accent.soft
										: theme.text.secondary
								}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onInfo}
							style={styles.actionButton}>
							<Ionicons
								name="information-circle-outline"
								size={20}
								color={theme.text.secondary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onShare}
							style={styles.actionButton}>
							<Ionicons
								name="share-outline"
								size={20}
								color={theme.text.secondary}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={onPlay}
				style={[styles.playButton, { backgroundColor: theme.primary }]}>
				<Ionicons
					name="play"
					size={24}
					color="#FFFFFF"
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: verticalSpacing.sm,
		paddingVertical: verticalSpacing.xs,
	},
	content: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	cover: {
		width: componentSizes.icon.xLarge,
		height: componentSizes.icon.xLarge,
		borderRadius: borderRadius.sm,
		marginRight: spacingScale.md,
		alignItems: "center",
		justifyContent: "center",
	},
	info: {
		flex: 1,
	},
	title: {
		fontWeight: "600",
		marginBottom: verticalSpacing.xxs,
	},
	artist: {
		marginBottom: verticalSpacing.xs,
	},
	actions: {
		flexDirection: "row",
		gap: spacingScale.md,
	},
	actionButton: {
		padding: spacingScale.xxs,
	},
	playButton: {
		width: componentSizes.button.height,
		height: componentSizes.button.height,
		borderRadius: borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: spacingScale.sm,
	},
});
