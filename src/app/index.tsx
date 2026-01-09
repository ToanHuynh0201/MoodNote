import { router } from "expo-router";
import { useEffect } from "react";

const Index = () => {
	useEffect(() => {
		// Redirect to splash screen after Root Layout is mounted
		const timeout = setTimeout(() => {
			router.replace("/(public)/splash");
		}, 0);

		return () => clearTimeout(timeout);
	}, []);

	return null;
};

export default Index;
