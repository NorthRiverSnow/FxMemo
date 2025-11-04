export type TechnicalAnalysisTable = {
	technicalAnalysisId: string
	tradeId: string
	bollingerBand: string | null
	rsi: string | null
	macd: string | null
	formation: string | null
	supportResistance: string | null
}

export type TechnicalAnalysis = {
	technicalAnalysisId: string
	tradeId: string
	bollingerBand: string
	rsi: string
	macd: string
	formation: string
	supportResistance: string
}
