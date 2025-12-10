import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "fade",
				animationDuration: 200,
				contentStyle: { backgroundColor: "transparent" },
			}}>
			<Stack.Screen
				name="welcome"
				options={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200,
				}}
			/>
			<Stack.Screen
				name="login"
				options={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200,
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200,
				}}
			/>
		</Stack>
	);
}
