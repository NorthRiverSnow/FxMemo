import type { TradeSchemaType } from "@/hooks/schemas/add-deal"

export const getDefaultTradeValue = (): TradeSchemaType => ({
	tradeDate: new Date(),
	currencyType: "Dollar",
	tradeSide: "Buy",
	tradeType: "Limit",
	tradePrice: "",
	lotSize: "1",
	technicalAnalysis: {
		bollingerBand: "",
		rsi: "",
		macd: "",
		formation: "",
		supportResistance: "",
	},
	news: "",
})
