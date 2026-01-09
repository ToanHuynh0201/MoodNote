import { useTheme } from "@/hooks";
import { Tabs } from "expo-router";
import React from "react";
import { CustomTabBar } from "@/components/layout";

const TabLayout = () => {
	const { theme } = useTheme();

	return (
		<Tabs
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarLabel: "Home",
				}}
			/>
			<Tabs.Screen
				name="stats"
				options={{
					title: "Statistics",
					tabBarLabel: "Stats",
				}}
			/>
			{/* Center tab - placeholder for floating action button */}
			<Tabs.Screen
				name="add"
				options={{
					title: "Add",
					tabBarLabel: "Add",
					href: null, // Hide from navigation
				}}
			/>
			<Tabs.Screen
				name="music"
				options={{
					title: "Music",
					tabBarLabel: "Music",
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarLabel: "Profile",
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
