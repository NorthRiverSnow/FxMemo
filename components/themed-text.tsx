import { useThemeColor } from "@/hooks/use-theme-color"
import { StyleSheet, Text, type TextProps } from "react-native"

export type ThemedTextProps = TextProps & {
	lightColor?: string
	darkColor?: string
	type?:
		| "default"
		| "title"
		| "defaultSemiBold"
		| "subtitle"
		| "link"
		| "small"
		| "label"
		| "error"
		| "button"
}

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text")

	return (
		<Text
			style={[
				{ color },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				type === "label" ? styles.label : undefined,
				type === "error" ? styles.error : undefined,
				type === "button" ? styles.button : undefined,
				style,
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	small: {
		fontSize: 12,
		lineHeight: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
	label: {
		fontSize: 20,
	},
	error: {
		fontSize: 12,
		lineHeight: 20,
		color: "#ff0000",
	},
	button: {
		fontWeight: "600",
		fontSize: 16,
		textAlign: "center",
		letterSpacing: 0.5,
	},
})
