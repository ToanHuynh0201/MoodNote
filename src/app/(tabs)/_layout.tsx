import { useTheme } from "@/hooks";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.background.secondary,
					borderTopColor: theme.border.light,
				},
				tabBarActiveTintColor: theme.primary,
				tabBarInactiveTintColor: theme.text.tertiary,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
				}}
			/>
		</Tabs>
	);
}
