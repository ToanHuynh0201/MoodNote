import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, type ThemeColors } from "../constants/theme";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeContextType {
	theme: ThemeColors;
	themeMode: ThemeMode;
	isDark: boolean;
	setThemeMode: (mode: ThemeMode) => void;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined,
);

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	defaultMode = "auto",
}) => {
	const systemColorScheme = useColorScheme();
	const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);

	// Xác định theme hiện tại dựa trên mode
	const isDark =
		themeMode === "auto"
			? systemColorScheme === "dark"
			: themeMode === "dark";

	const theme = isDark ? darkTheme : lightTheme;

	// Toggle giữa light và dark (không bao gồm auto)
	const toggleTheme = () => {
		setThemeMode((prev) => {
			if (prev === "auto") {
				// Nếu đang ở auto, chuyển sang mode ngược lại với system
				return systemColorScheme === "dark" ? "light" : "dark";
			}
			return prev === "light" ? "dark" : "light";
		});
	};

	const value: ThemeContextType = {
		theme,
		themeMode,
		isDark,
		setThemeMode,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

// Export type cho TypeScript
export type { ThemeContextType, ThemeMode };
