import { ThemeProvider } from "@/contexts";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		"Segoe UI": require("../../assets/fonts/Segoe_UI.ttf"),
		"Segoe UI Italic": require("../../assets/fonts/Segoe_UI_Italic.ttf"),
		"Segoe UI Bold": require("../../assets/fonts/Segoe_UI_Bold.ttf"),
		"Segoe UI Bold Italic": require("../../assets/fonts/Segoe_UI_Bold_Italic.ttf"),
		Pacifico: require("../../assets/fonts/Pacifico.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<ThemeProvider defaultMode="light">
			<Stack>
				<Stack.Screen
					name="splash"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="onboarding"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="welcome"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="index"
					options={{ headerShown: false }}
				/>
			</Stack>
		</ThemeProvider>
	);
}
