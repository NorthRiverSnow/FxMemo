import { ParallaxScrollView } from "@/components/parallax-scroll-view"
import { ThemedLabelAndText } from "@/components/themed-label-and-text"
import { ThemedLabelAndArea } from "@/components/themed-label-and-textArea"
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view"
import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { useTradeDetails } from "@/hooks/features/use-trade-details"
import {
	formatDate,
	translateCurrencyType,
	translateTradeSide,
	translateTradeType,
} from "@/utils/utils"
import { Pressable, StyleSheet } from "react-native"
export default function tradeDealScreen() {
	const { data, errorMessage, handleDelete, fontColor, router } = useTradeDetails()
	return (
		<ThemedSafeAreaView style={{ flex: 1 }}>
			<ParallaxScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
				<ThemedText>{errorMessage}</ThemedText>
				<ThemedView style={styles.titleContainer}>
					<Pressable onPress={() => router.back()}>
						<IconSymbol name="chevron.left" color={fontColor} size={20} />
					</Pressable>
					<ThemedText type="title">取引詳細</ThemedText>
					<Pressable onPress={handleDelete} style={styles.deleteIcon}>
						<IconSymbol name="trash" color={fontColor} size={20} />
					</Pressable>
				</ThemedView>
				{data && (
					<>
						<ThemedLabelAndText text={formatDate(data.tradeDate)} label="取引日付：" />
						<ThemedLabelAndText
							text={translateCurrencyType(data.currencyType)}
							label="取引通貨："
						/>
						<ThemedLabelAndText text={translateTradeType(data.tradeType)} label="取引タイプ：" />
						<ThemedLabelAndText text={translateTradeSide(data.tradeSide)} label="注文：" />
						<ThemedLabelAndText text={data.tradePrice} label="取得価格：" />
						<ThemedLabelAndText text={data.lotSize} label="ロット数：" />
						<ThemedLabelAndArea
							text={data.technicalAnalysis.bollingerBand}
							label="ボリンジャーバンド"
						/>
						<ThemedLabelAndArea text={data.technicalAnalysis.macd} label="Macd" />
						<ThemedLabelAndArea text={data.technicalAnalysis.rsi} label="RSI" />
						<ThemedLabelAndArea text={data.technicalAnalysis.formation} label="フォーメーション" />
						<ThemedLabelAndArea
							text={data.technicalAnalysis.supportResistance}
							label="抵抗/支持ライン"
						/>
					</>
				)}
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
	container: {
		flexDirection: "column",
		alignItems: "center",
	},
	labelAndInput: {
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
	deleteIcon: {
		marginLeft: "auto",
		backgroundColor: "red",
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
	},
})
