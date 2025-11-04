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

export function ThemedTextAreaInput({
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
		<ThemedView style={style}>
			{label && (
				<ThemedText style={styles.label} type="label">
					{label}
				</ThemedText>
			)}
			<TextInput
				style={[
					{
						color: fontColor,
						borderColor,
					},
					styles.input,
				]}
				value={value}
				onChangeText={onValueChange}
				multiline
				numberOfLines={5}
				textAlignVertical="top"
			/>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	labelAndInput: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	input: {
		fontSize: 16,
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		minHeight: 100,
		alignSelf: "flex-start",
		flexDirection: "row",
		marginRight: 12,
		width: "100%",
		maxWidth: 400,
		marginVertical: 8,
	},
	label: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		marginRight: 12,
	},
})
