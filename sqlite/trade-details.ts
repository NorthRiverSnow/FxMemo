import { getDefaultTradeValue } from "@/constants/trade-details"
import type { TradeSchemaType } from "@/hooks/schemas/add-deal"
import { db } from "./config"
import type { TechnicalAnalysisTable } from "./dto/technical-analysis.dto"
import type { TradesTable } from "./dto/trade.dto"

type SelectedTradeDetails = TradesTable & TechnicalAnalysisTable

const transform = (data: SelectedTradeDetails): TradeSchemaType => {
	return {
		tradePrice: data.tradePrice,
		lotSize: data.lotSize,
		tradeDate: new Date(data.tradeDate.replaceAll("/", "-")),
		currencyType: data.currencyType as "Dollar" | "Pound" | "Euro",
		tradeSide: data.tradeSide as "Buy" | "Sell",
		tradeType: data.tradeType as "Limit" | "Market",
		news: data.news || "",
		technicalAnalysis: {
			rsi: data.rsi || "",
			bollingerBand: data.bollingerBand || "",
			formation: data.formation || "",
			macd: data.macd || "",
			supportResistance: data.supportResistance || "",
		},
	}
}

export const selectTradeDetails = async (tradeId: string) => {
	let ret: TradeSchemaType = getDefaultTradeValue()
	await db.withTransactionAsync(async () => {
		const trades = await db.getAllAsync<SelectedTradeDetails>(
			`
			SELECT
				t.tradeId,
				t.tradeDate,
				t.currencyType,
				t.tradeSide,
				t.tradeType,
				t.tradePrice,
				t.lotSize,
				t.news,
				ta.technicalAnalysisId,
				ta.bollingerBand,
				ta.rsi,
				ta.macd,
				ta.formation,
				ta.supportResistance
			FROM trades t
			INNER JOIN technical_analysis ta
				ON t.tradeId = ta.tradeId
			WHERE t.tradeId = ?`,
			[tradeId],
		)
		const data = trades[0]
		ret = transform(data)
	})

	return ret
}
