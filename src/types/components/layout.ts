import { ViewStyle } from "react-native";
import { Edge } from "react-native-safe-area-context";

export interface ScreenWrapperProps {
	children: React.ReactNode;
	style?: ViewStyle; // Style tùy chỉnh cho content
	contentContainerStyle?: ViewStyle; // Style cho bên trong ScrollView
	scroll?: boolean; // Có cho phép cuộn không?
	safeAreaEdges?: Edge[]; // Các cạnh cần Safe Area (['top', 'bottom', 'left', 'right'])
}
