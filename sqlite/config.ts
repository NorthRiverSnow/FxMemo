import * as SQLite from "expo-sqlite"

export const db = SQLite.openDatabaseSync("trades.db")

export const createTables = () => {
	db.withTransactionSync(() => {
		// db.execSync("DROP TABLE trades")
		// db.execSync("DROP TABLE technical_analysis")
		db.execSync(
			`CREATE TABLE IF NOT EXISTS trades (
        tradeId varchar PRIMARY KEY NOT NULL,
        tradeDate TEXT NOT NULL,
        currencyType TEXT NOT NULL,
        tradeSide TEXT NOT NULL,
        tradeType TEXT NOT NULL,
        tradePrice TEXT NOT NULL,
        lotSize TEXT NOT NULL,
        news TEXT
      )`,
		)

		db.execSync(
			`CREATE TABLE IF NOT EXISTS technical_analysis (
        technicalAnalysisId varchar PRIMARY KEY NOT NULL,
        tradeId INTEGER NOT NULL,
        bollingerBand TEXT,
        rsi TEXT,
        macd TEXT,
        formation TEXT,
        supportResistance TEXT,
        FOREIGN KEY(tradeId) REFERENCES trades(id) ON DELETE CASCADE
      )`,
		)
	})
}
