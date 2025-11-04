export type TradesTable = {
	tradeId: string
	tradeDate: string
	currencyType: string
	tradeSide: string
	tradeType: string
	tradePrice: string
	lotSize: string
	news: string | null
}

export type Trade = {
	tradeId: string
	tradeDate: Date
	currencyType: string
	tradeSide: string
	tradeType: string
	tradePrice: string
	lotSize: string
	news: string
}
