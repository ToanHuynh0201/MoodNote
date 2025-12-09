import { ViewStyle } from "react-native";
import { Edge } from "react-native-safe-area-context";

export interface ScreenWrapperProps {
	children: React.ReactNode;
	style?: ViewStyle; // Style tùy chỉnh cho content
	safeAreaEdges?: Edge[]; // Các cạnh cần Safe Area (['top', 'bottom', 'left', 'right'])
}
