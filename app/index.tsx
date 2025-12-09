import IconButton from "@/components/common/IconButton";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { moderateScale } from "@/utils/responsive";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const SplashScreen = () => {
	return (
		<ScreenWrapper useGradient={true}>
			<View style={{ flex: 1, justifyContent: "flex-start" }}>
				<IconButton
					icon={
						<MaterialIcons
							name="shuffle"
							size={moderateScale(24)}
							color="#3D2070"
						/>
					}
					label="Phát ngẫu nhiên"
					variant="tonal"
					onPress={() => console.log("Shuffle pressed")}
				/>
			</View>
		</ScreenWrapper>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
