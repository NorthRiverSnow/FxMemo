import { forwardRef, type PropsWithChildren, type ReactElement, useImperativeHandle } from "react"
import { StyleSheet, useColorScheme } from "react-native"
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollOffset,
} from "react-native-reanimated"

import { ThemedView } from "@/components/themed-view"
import { useThemeColor } from "@/hooks/use-theme-color"

const HEADER_HEIGHT = 0

type Props = PropsWithChildren<{
	headerImage?: ReactElement
	headerBackgroundColor: { dark: string; light: string }
}>

export type ParallaxScrollViewHandle = {
	scrollToTop: () => void
}

export const ParallaxScrollView = forwardRef<ParallaxScrollViewHandle, Props>(
	({ children, headerBackgroundColor }, ref) => {
		const backgroundColor = useThemeColor({}, "background")
		const colorScheme = useColorScheme() ?? "light"
		const scrollRef = useAnimatedRef<Animated.ScrollView>()
		const scrollOffset = useScrollOffset(scrollRef)
		const headerAnimatedStyle = useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateY: interpolate(scrollOffset.value, [-0, 0, 0], [-0 / 2, 0, 0 * 0.75]),
					},
					{
						scale: interpolate(scrollOffset.value, [-0, 0, 0], [2, 1, 1]),
					},
				],
			}
		})

		useImperativeHandle(ref, () => ({
			scrollToTop: () => {
				scrollRef.current?.scrollTo({ y: 0, animated: true })
			},
		}))

		return (
			<Animated.ScrollView
				ref={scrollRef}
				style={{ backgroundColor, flex: 1 }}
				scrollEventThrottle={16}
			>
				<Animated.View
					style={[
						styles.header,
						{ backgroundColor: headerBackgroundColor[colorScheme] },
						headerAnimatedStyle,
					]}
				/>
				<ThemedView style={styles.content}>{children}</ThemedView>
			</Animated.ScrollView>
		)
	},
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 0,
		overflow: "hidden",
	},
	content: {
		flex: 1,
		padding: 32,
		gap: 16,
		overflow: "hidden",
	},
})
