import { ThemeProvider } from "@/contexts";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<ThemeProvider defaultMode="light">
			<Stack>
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
