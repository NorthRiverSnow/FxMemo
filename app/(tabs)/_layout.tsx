import { Tabs } from "expo-router"

import { HapticTab } from "@/components/haptic-tab"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { Colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			initialRouteName="deal-list"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="deal-list"
				options={{
					title: "取引一覧",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="list.bullet.rectangle.portrait" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="add-deal"
				options={{
					title: "取引追加",
					tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle" color={color} />,
				}}
			/>
		</Tabs>
	)
}
