import { useThemeColor } from "@/hooks/use-theme-color"
import type { Dispatch, SetStateAction } from "react"
import { StyleSheet, TextInput, type ViewProps } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

export type ThemedPickerProps = {
	label?: string
	value: string
	setValue: Dispatch<SetStateAction<string>>
	lightColor?: string
	darkColor?: string
} & ViewProps

export function ThemedNumberInput({
	label,
	value,
	setValue,
	lightColor,
	darkColor,
	style,
	..._rest
}: ThemedPickerProps) {
	const fontColor = useThemeColor({ light: lightColor, dark: darkColor }, "text")
	const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border")

	const onValueChange: (itemValue: string) => void = (itemValue) => {
		setValue(itemValue)
	}

	return (
		<ThemedView style={[styles.labelAndInput, style]}>
			{label && (
				<ThemedText style={styles.label} type="label">
					{label}
				</ThemedText>
			)}
			<ThemedView
				style={[
					{
						borderColor,
					},
					styles.input,
				]}
			>
				<TextInput style={{ color: fontColor }} value={value} onChangeText={onValueChange} />
			</ThemedView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	labelAndInput: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	input: {
		fontSize: 16,
		lineHeight: 24,
		borderWidth: 1,
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 14,
		alignSelf: "flex-start",
		flexDirection: "row",
	},
	label: {
		marginRight: 12,
	},
})
