import { ParallaxScrollView } from "@/components/parallax-scroll-view"
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view"
import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { selectTradeList } from "@/sqlite/deal-list"
import type { Trade } from "@/sqlite/dto/trade.dto"
import { formatDate, translateTradeSide, translateTradeType } from "@/utils/utils"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback, useState } from "react"
import { Pressable, StyleSheet } from "react-native"

const getCurrencyIconName = (currencyType: string) => {
	switch (currencyType) {
		case "Dollar":
			return "dollarsign.circle.fill"
		case "Euro":
			return "eurosign.circle.fill"
		case "Pound":
			return "sterlingsign.circle.fill"
		default:
			return "questionmark.circle.fill"
	}
}

const getStyle = (tagType: string) => {
	switch (tagType) {
		case "Buy":
			return styles.buyTag
		case "Sell":
			return styles.sellTag
		case "Market":
			return styles.marketTag
		case "Limit":
			return styles.limitTag
		default:
			return {}
	}
}

export default function HomeScreen() {
	const [tradeList, setTradeList] = useState<Trade[]>([])
	const router = useRouter()

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const ret = await selectTradeList()
				setTradeList(ret)
			}
			fetchData()
		}, []),
	)
	return (
		<ThemedSafeAreaView style={{ flex: 1 }}>
			<ParallaxScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">取引一覧</ThemedText>
				</ThemedView>
				{tradeList.map((x) => (
					<Pressable
						key={x.tradeId}
						onPress={() => router.push(`/trade-details?tradeId=${x.tradeId}`)}
					>
						<ThemedView style={styles.titleContainer}>
							<IconSymbol name={getCurrencyIconName(x.currencyType)} color="#f3ca00" size={50} />
							<ThemedText>
								日付：{formatDate(x.tradeDate)}
								{/** biome-ignore lint/style/useConsistentCurlyBraces: 改行挿入のため */}
								{"\n"}
								価格：{x.tradePrice}　数量：{x.lotSize}
							</ThemedText>
							<ThemedView
								style={{ flexDirection: "row", marginTop: 20, marginLeft: 4, alignItems: "center" }}
							>
								<ThemedText style={getStyle(x.tradeSide)} type="small">
									{translateTradeSide(x.tradeSide)}
								</ThemedText>
								<ThemedText style={getStyle(x.tradeType)} type="small">
									{translateTradeType(x.tradeType)}
								</ThemedText>
							</ThemedView>
						</ThemedView>
					</Pressable>
				))}
			</ParallaxScrollView>
		</ThemedSafeAreaView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	buyTag: {
		backgroundColor: "#f44336",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	sellTag: {
		backgroundColor: "#2196f3",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	marketTag: {
		backgroundColor: "#4caf50",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	limitTag: {
		backgroundColor: "#9c27b0",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
})
