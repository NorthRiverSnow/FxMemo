import { useThemeColor } from "@/hooks/use-theme-color"
import { ActivityIndicator, Pressable, StyleSheet } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

type ThemedSubmitButtonProps = {
	title?: string
	onPress: () => void
	loading?: boolean
	disabled?: boolean
	lightColor?: string
	darkColor?: string
}

export function ThemedSubmitButton({
	title = "登録",
	onPress,
	loading = false,
	disabled = false,
	lightColor,
	darkColor,
}: ThemedSubmitButtonProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "submitButtonColor")
	const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "buttonTextColor")
	const disabledBackgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"disabledButtonColor",
	)
	const disabledTextColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"disabledTextColor",
	)

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled || loading}
			style={[
				styles.button,
				{
					backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
				},
			]}
		>
			<ThemedView style={styles.content}>
				{loading ? (
					<ActivityIndicator color={textColor} />
				) : (
					<ThemedText
						style={[
							{
								color: disabled ? disabledTextColor : textColor,
								backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
							},
						]}
						type="button"
					>
						{title}
					</ThemedText>
				)}
			</ThemedView>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		marginTop: 16,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
})
