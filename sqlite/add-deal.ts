import type { TradeSchemaType } from "@/hooks/schemas/add-deal"
import { formatDate, generateUUID } from "@/utils/utils"
import type { SQLiteDatabase } from "expo-sqlite"
import { db } from "./config"
import type { TechnicalAnalysisTable } from "./dto/technical-analysis.dto"
import type { TradesTable } from "./dto/trade.dto"

const transformTrade = (data: TradeSchemaType, uuid: string) => ({
	tradeId: uuid,
	tradeDate: formatDate(data.tradeDate),
	tradePrice: data.tradePrice,
	currencyType: data.currencyType,
	tradeSide: data.tradeSide,
	tradeType: data.tradeType,
	lotSize: data.lotSize,
	news: data.news || null,
})

const transformTechnicalAnalysis = (
	data: TradeSchemaType,
	tradeId: string,
	technicalId: string,
) => ({
	technicalAnalysisId: technicalId,
	tradeId: tradeId,
	bollingerBand: data.technicalAnalysis.bollingerBand || null,
	rsi: data.technicalAnalysis.rsi || null,
	macd: data.technicalAnalysis.macd || null,
	formation: data.technicalAnalysis.formation || null,
	supportResistance: data.technicalAnalysis.supportResistance || null,
})

const insertDataIntoTrades = (data: TradesTable, db: SQLiteDatabase) =>
	db.runAsync(
		`INSERT INTO trades (
					tradeId,
					tradeDate,
					currencyType,
					tradeSide,
					tradeType,
					tradePrice,
					lotSize,
					news
				)VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			data.tradeId,
			data.tradeDate,
			data.currencyType,
			data.tradeSide,
			data.tradeType,
			data.tradePrice,
			data.lotSize,
			data.news,
		],
	)

const insertTechnicalAnalysis = (data: TechnicalAnalysisTable, db: SQLiteDatabase) =>
	db.runAsync(
		`INSERT INTO technical_analysis (
					technicalAnalysisId,
					tradeId,
					bollingerBand,
					rsi,
					macd,
					formation,
					supportResistance
				)
				VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[
			data.technicalAnalysisId,
			data.tradeId,
			data.bollingerBand,
			data.rsi,
			data.macd,
			data.formation,
			data.supportResistance,
		],
	)

export const insertTrade = async (data: TradeSchemaType): Promise<boolean> => {
	const uuid = generateUUID()
	const technicalAnalysisId = generateUUID()
	const newTrade: TradesTable = transformTrade(data, uuid)
	const newTechnicalAnalysis: TechnicalAnalysisTable = transformTechnicalAnalysis(
		data,
		uuid,
		technicalAnalysisId,
	)

	try {
		await db.withTransactionAsync(async () => {
			await insertDataIntoTrades(newTrade, db)
			await insertTechnicalAnalysis(newTechnicalAnalysis, db)
		})
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}
