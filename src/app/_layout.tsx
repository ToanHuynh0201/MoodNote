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
		<ThemeProvider defaultMode="dark">
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200,
					contentStyle: { backgroundColor: "transparent" },
				}}>
				<Stack.Screen
					name="(public)"
					options={{
						animation: "fade",
						animationDuration: 200,
					}}
				/>
				<Stack.Screen
					name="(auth)"
					options={{
						animation: "fade",
						animationDuration: 200,
					}}
				/>
				<Stack.Screen
					name="(tabs)"
					options={{
						animation: "fade",
						animationDuration: 200,
					}}
				/>

				<Stack.Screen
					name="index"
					options={{
						animation: "fade",
						animationDuration: 200,
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
