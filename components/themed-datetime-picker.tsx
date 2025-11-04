import { useThemeColor } from "@/hooks/use-theme-color"
import { formatDate } from "@/utils/utils"
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { type Dispatch, type SetStateAction, useState } from "react"
import { Platform, Pressable, StyleSheet, type ViewProps } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"
import { IconSymbol } from "./ui/icon-symbol"

export type ThemedDatePickerProps = {
	label?: string
	date: Date
	setDate: Dispatch<SetStateAction<Date>>
	errorMessage?: string
	lightColor?: string
	darkColor?: string
} & ViewProps

export function ThemedDatetimePicker({
	label,
	date,
	setDate,
	lightColor,
	darkColor,
	style,
	...rest
}: ThemedDatePickerProps) {
	const [show, setShow] = useState(false)
	const fontColor = useThemeColor({ light: lightColor, dark: darkColor }, "text")
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background")
	const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border")
	const displayMode = Platform.OS === "ios" ? "inline" : "default"

	const onChange: (event: DateTimePickerEvent, date?: Date | undefined) => void = (
		_event,
		selectedDate,
	) => {
		const currentDate = selectedDate
		setDate(currentDate || date)
		setShow(false)
	}

	const setShowDatePicker = () => setShow(!show)

	return (
		<ThemedView style={[styles.container, style]}>
			<ThemedView style={styles.labelAndInput}>
				{label && (
					<ThemedText style={styles.label} type="label">
						{label}
					</ThemedText>
				)}
				<Pressable onPress={setShowDatePicker}>
					<ThemedView
						style={[
							{
								backgroundColor,
								borderColor,
							},
							{ ...styles.input },
						]}
					>
						<ThemedText {...rest}>{formatDate(date)}</ThemedText>
						<IconSymbol
							name="calendar.circle.fill"
							color={fontColor}
							size={24}
							style={styles.icon}
						/>
					</ThemedView>
				</Pressable>
			</ThemedView>
			{show && (
				<ThemedView style={styles.datePickerContainer}>
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode="date"
						onChange={onChange}
						display={displayMode}
						locale="jp-JA"
					/>
				</ThemedView>
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
	},
	datePickerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
})
