import { StyleSheet, type TextProps } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

export type ThemedTextProps = TextProps & {
	text: string
	label: string
	lightColor?: string
	darkColor?: string
}

export function ThemedLabelAndArea({ text, label, lightColor, darkColor }: ThemedTextProps) {
	return (
		<ThemedView style={styles.labelAndText} lightColor={lightColor} darkColor={darkColor}>
			<ThemedText style={styles.label} type="label" lightColor={lightColor} darkColor={darkColor}>
				{label}
			</ThemedText>
			<ThemedText style={styles.text}>{text}</ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	labelAndText: {
		flexDirection: "column",
		justifyContent: "flex-start",
		marginLeft: 12,
	},
	label: {
		marginRight: 12,
	},
	text: {
		marginLeft: 24,
	},
})
