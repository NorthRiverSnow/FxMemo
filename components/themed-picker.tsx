import { useThemeColor } from "@/hooks/use-theme-color"
import { Picker } from "@react-native-picker/picker"
import { type Dispatch, type SetStateAction, useState } from "react"
import { Pressable, StyleSheet, type ViewProps } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"
import { IconSymbol } from "./ui/icon-symbol"

export type ThemedPickerProps = {
	label?: string
	selectedValue: string
	setSelectedValue: Dispatch<SetStateAction<string>>
	pickerItems: PickerItems
	lightColor?: string
	darkColor?: string
} & ViewProps

export type PickerItems = {
	value: string
	label: string
}[]

const getLabelFromValue = (value: string, targetList: PickerItems) =>
	targetList.find((x) => x.value === value)?.label

export function ThemedPicker({
	label,
	selectedValue,
	setSelectedValue,
	pickerItems,
	lightColor,
	darkColor,
	style,
	...rest
}: ThemedPickerProps) {
	const [show, setShow] = useState(false)
	const fontColor = useThemeColor({ light: lightColor, dark: darkColor }, "text")
	const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border")

	const onValueChange: (itemValue: string) => void = (itemValue) => {
		setSelectedValue(itemValue)
		setShow(false)
	}

	const setShowPicker = () => setShow(!show)

	return (
		<ThemedView style={[styles.container, style]}>
			<ThemedView style={styles.labelAndInput}>
				{label && (
					<ThemedText style={styles.label} type="label">
						{label}
					</ThemedText>
				)}
				<Pressable onPress={() => setShowPicker()}>
					<ThemedView
						style={[
							{
								borderColor,
							},
							styles.input,
						]}
					>
						<ThemedText {...rest}>{getLabelFromValue(selectedValue, pickerItems)}</ThemedText>
						<IconSymbol
							name="arrowtriangle.down.fill"
							color={fontColor}
							size={16}
							style={styles.icon}
						/>
					</ThemedView>
				</Pressable>
			</ThemedView>
			{show && (
				<Picker
					testID="picker"
					selectedValue={selectedValue}
					onValueChange={onValueChange}
					style={styles.pickerContainer}
				>
					<Picker.Item label=" " value="__placeholder__" />
					{pickerItems.map((x) => (
						<Picker.Item key={x.value} label={x.label} value={x.value} />
					))}
				</Picker>
			)}
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
	},
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
	icon: {
		marginLeft: 14,
		marginTop: 4,
	},
	pickerContainer: {
		width: "100%",
		height: 150,
	},
})
