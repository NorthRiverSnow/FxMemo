import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/use-color-scheme"
import { createTables } from "@/sqlite/config"

// biome-ignore lint/style/useComponentExportOnlyModules: フレームワーク初期設定
export const unstable_settings = {
	anchor: "(tabs)",
}

export default function RootLayout() {
	const colorScheme = useColorScheme()
	createTables()

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="modal" options={{ presentation: "modal", headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	)
}
