import { SafeAreaView, type SafeAreaViewProps } from "react-native-safe-area-context"

import { useThemeColor } from "@/hooks/use-theme-color"

export type ThemedViewProps = SafeAreaViewProps & {
	lightColor?: string
	darkColor?: string
}

export function ThemedSafeAreaView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background")

	return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
}
