/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native"

const tintColorLight = "#0a7ea4"
const tintColorDark = "#fff"
const basicColorLight = "#687076"
const basicColorDark = "#9BA1A6"
const submitButtonColor = "#3B82F6"
const disabledButtonColor = "#a8a8a8ff"
const buttonTextColor = "#FFFFFF"
const disabledTextColor = "#727272ff"

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: tintColorLight,
		icon: basicColorLight,
		tabIconDefault: basicColorLight,
		tabIconSelected: tintColorLight,
		border: basicColorLight,
		submitButtonColor: submitButtonColor,
		disabledButtonColor: disabledButtonColor,
		buttonTextColor: buttonTextColor,
		disabledTextColor: disabledTextColor,
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: basicColorDark,
		tabIconDefault: basicColorDark,
		tabIconSelected: tintColorDark,
		border: basicColorDark,
		submitButtonColor: submitButtonColor,
		disabledButtonColor: disabledButtonColor,
		buttonTextColor: buttonTextColor,
		disabledTextColor: disabledTextColor,
	},
}

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
})
