import { Stack } from "expo-router";

const PublicLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "fade",
				animationDuration: 200,
				contentStyle: { backgroundColor: "transparent" }
			}}
		>
			<Stack.Screen
				name="splash"
				options={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200
				}}
			/>
			<Stack.Screen
				name="onboarding"
				options={{
					headerShown: false,
					animation: "fade",
					animationDuration: 200
				}}
			/>
		</Stack>
	);
};

export default PublicLayout;
