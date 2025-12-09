import Typo from "@/components/common/Typo";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useTheme } from "@/hooks/useTheme";

import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

const SplashScreen = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const { theme, themeMode, toggleTheme } = useTheme();
	return (
		<ScreenWrapper useGradient={true}>
			<View style={{ flex: 1, justifyContent: "flex-start" }}>
				<Typo>{themeMode}</Typo>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
					onValueChange={() => {
						toggleTheme();
						setIsEnabled((previousState) => !previousState);
					}}
					value={isEnabled}></Switch>
			</View>
		</ScreenWrapper>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
