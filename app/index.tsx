import ScreenWrapper from "@/components/layout/ScreenWrapper";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const SplashScreen = () => {
	return (
		<ScreenWrapper>
			<View style={{ flex: 1, justifyContent: "flex-end" }}>
				<Text>SplashScreen</Text>
				<Button title="Hello"></Button>
				<TextInput></TextInput>
			</View>
		</ScreenWrapper>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
