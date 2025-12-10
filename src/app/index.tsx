import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
	useEffect(() => {
		// Redirect to splash screen
		router.replace("/(public)/splash");
	}, []);

	return null;
}
