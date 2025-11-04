import { StyleSheet, type TextProps } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

export type ThemedTextProps = TextProps & {
	text: string
	label: string
	lightColor?: string
	darkColor?: string
}

export function ThemedLabelAndText({ text, label, lightColor, darkColor }: ThemedTextProps) {
	return (
		<ThemedView style={styles.labelAndText} lightColor={lightColor} darkColor={darkColor}>
			<ThemedText style={styles.label} type="label" lightColor={lightColor} darkColor={darkColor}>
				{label}
			</ThemedText>
			<ThemedText>{text}</ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	labelAndText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		marginLeft: 12,
	},
	input: {
		fontSize: 16,
		lineHeight: 24,
		paddingVertical: 10,
		paddingHorizontal: 14,
		alignSelf: "flex-start",
		flexDirection: "row",
	},
	label: {
		marginRight: 12,
	},
})
