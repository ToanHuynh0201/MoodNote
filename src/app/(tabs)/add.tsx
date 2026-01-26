import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { ScreenWrapper } from "@/components/layout";
import { Typo } from "@/components/common";
import { useTheme } from "@/hooks/useTheme";
import { space, radius } from "@/constants/spacing";
import { s } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddScreen = () => {
	const { theme } = useTheme();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSave = () => {
		// TODO: Save diary entry
		console.log("Save entry:", { title, content });
		router.back();
	};

	const handleVoiceInput = () => {
		// TODO: Implement voice input
		console.log("Voice input");
	};

	const handleAttachImage = () => {
		// TODO: Implement image picker
		console.log("Attach image");
	};

	const handleCamera = () => {
		// TODO: Implement camera
		console.log("Open camera");
	};

	return (
		<ScreenWrapper>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={100}>
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}>
					{/* Header with Save Button */}
					<View style={styles.header}>
						<TouchableOpacity
							onPress={handleSave}
							style={[
								styles.saveButton,
								{ backgroundColor: theme.primary.default },
							]}>
							<Ionicons
								name="checkmark"
								size={s(24)}
								color={theme.text.onPrimary}
							/>
						</TouchableOpacity>
					</View>

					{/* Text Formatting Toolbar */}
					<View
						style={[
							styles.toolbar,
							{ backgroundColor: theme.surface.elevated },
						]}>
						<TouchableOpacity style={styles.toolbarButton}>
							<Typo
								variant="bodyLarge"
								style={{
									color: theme.text.primary,
									fontWeight: "bold",
								}}>
								B
							</Typo>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolbarButton}>
							<Typo
								variant="bodyLarge"
								style={{
									color: theme.text.primary,
									fontStyle: "italic",
								}}>
								I
							</Typo>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolbarButton}>
							<Typo
								variant="bodyLarge"
								style={{
									color: theme.text.primary,
									textDecorationLine: "underline",
								}}>
								U
							</Typo>
						</TouchableOpacity>

						<View style={styles.toolbarSpacer} />

						{/* Alignment buttons */}
						<TouchableOpacity style={styles.toolbarButton}>
							<Ionicons
								name="text-outline"
								size={s(20)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolbarButton}>
							<Ionicons
								name="list-outline"
								size={s(20)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolbarButton}>
							<Ionicons
								name="reorder-three-outline"
								size={s(20)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.toolbarButton}>
							<Ionicons
								name="menu-outline"
								size={s(20)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
					</View>

					{/* Title Input */}
					<TextInput
						style={[
							styles.titleInput,
							{ color: theme.text.primary },
						]}
						placeholder="Tiêu đề..."
						placeholderTextColor={theme.text.tertiary}
						value={title}
						onChangeText={setTitle}
					/>

					{/* Content Input */}
					<TextInput
						style={[
							styles.contentInput,
							{ color: theme.text.secondary },
						]}
						placeholder="Hôm nay bạn có điều gì thú vị?"
						placeholderTextColor={theme.text.disabled}
						value={content}
						onChangeText={setContent}
						multiline
						textAlignVertical="top"
					/>
				</ScrollView>

				{/* Bottom Action Bar */}
				<View
					style={[
						styles.bottomBar,
						{ backgroundColor: theme.surface.base },
					]}>
					<View style={styles.leftActions}>
						<TouchableOpacity
							onPress={handleVoiceInput}
							style={[
								styles.actionButton,
								{ backgroundColor: theme.primary.default },
							]}>
							<Ionicons
								name="mic-outline"
								size={s(24)}
								color={theme.text.onPrimary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleAttachImage}
							style={[
								styles.actionButton,
								{ backgroundColor: theme.primary.default },
							]}>
							<Ionicons
								name="image-outline"
								size={s(24)}
								color={theme.text.onPrimary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleCamera}
							style={[
								styles.actionButton,
								{ backgroundColor: theme.primary.default },
							]}>
							<Ionicons
								name="camera-outline"
								size={s(24)}
								color={theme.text.onPrimary}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.rightActions}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={[
								styles.navButton,
								{ backgroundColor: theme.surface.elevated },
							]}>
							<Ionicons
								name="chevron-back-outline"
								size={s(24)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => console.log("Next")}
							style={[
								styles.navButton,
								{ backgroundColor: theme.surface.elevated },
							]}>
							<Ionicons
								name="chevron-forward-outline"
								size={s(24)}
								color={theme.text.primary}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: space[5],
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingTop: space[3],
		paddingBottom: space[2],
	},
	saveButton: {
		width: s(48),
		height: s(48),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
	toolbar: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: space[2],
		paddingHorizontal: space[3],
		borderRadius: radius.lg,
		marginBottom: space[4],
		gap: space[1],
	},
	toolbarButton: {
		width: s(36),
		height: s(36),
		alignItems: "center",
		justifyContent: "center",
	},
	toolbarSpacer: {
		flex: 1,
	},
	titleInput: {
		fontSize: s(20),
		fontWeight: "600",
		marginBottom: space[3],
		paddingVertical: space[2],
	},
	contentInput: {
		fontSize: s(16),
		lineHeight: s(24),
		minHeight: s(400),
		paddingBottom: space[8],
	},
	bottomBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: space[5],
		paddingVertical: space[3],
		borderTopWidth: 0,
	},
	leftActions: {
		flexDirection: "row",
		gap: space[3],
	},
	rightActions: {
		flexDirection: "row",
		gap: space[3],
	},
	actionButton: {
		width: s(48),
		height: s(48),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
	navButton: {
		width: s(48),
		height: s(48),
		borderRadius: radius.full,
		alignItems: "center",
		justifyContent: "center",
	},
});
