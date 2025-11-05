import type { SQLiteDatabase } from "expo-sqlite"
import { db } from "./config"

const deleteTrade = (tradeId: string, db: SQLiteDatabase) =>
	db.runAsync("DELETE FROM trades WHERE tradeId = ?", [tradeId])

const deleteTechnicalAnalysis = (tradeId: string, db: SQLiteDatabase) =>
	db.runAsync("DELETE FROM technical_analysis WHERE tradeId = ?", [tradeId])

export const deleteTradeData = async (tradeId: string): Promise<boolean> => {
	try {
		await db.withTransactionAsync(async () => {
			await deleteTrade(tradeId, db)
			await deleteTechnicalAnalysis(tradeId, db)
		})
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}
