import { db } from "./config"
import type { Trade, TradesTable } from "./dto/trade.dto"

export const selectTradeList = async () => {
	const ret: Trade[] = []
	await db.withTransactionAsync(async () => {
		const trades = await db.getAllAsync<TradesTable>("SELECT * FROM trades")
		const result = trades.map((x) => ({
			...x,
			tradeDate: new Date(x.tradeDate.replaceAll("/", "-")),
			news: x.news || "",
		}))
		ret.push(...result)
	})

	return ret
}
