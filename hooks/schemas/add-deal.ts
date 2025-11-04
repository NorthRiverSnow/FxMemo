import {
	custom,
	type InferInput,
	maxLength,
	minLength,
	object,
	picklist,
	pipe,
	string,
} from "valibot"

const TextAreaSchema = pipe(string(), maxLength(2000, "2000文字以内で入力してください。"))

const TradePriceSchema = pipe(
	string(),
	minLength(1, "取得価格を入力してください。"),
	custom(
		(input) => /^([1-9]\d*)(\.\d+)?$/.test(input as string),
		"取得価格を0以上の数値で入力してください。",
	),
)

const LotSizeSchema = pipe(
	string(),
	minLength(1, "ロット数を入力してください。"),
	custom(
		(input) => /^[1-9]\d*$/.test(input as string),
		"ロット数を0以上の整数で入力してください。",
	),
)

const DateSchema = custom<Date>((value) => {
	if (!(value instanceof Date)) return false
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const target = new Date(value)
	target.setHours(0, 0, 0, 0)
	return target <= today
}, "未来の日付は選択できません。")

const CurrencyTypeSchema = picklist(["Dollar", "Pound", "Euro"], "通過タイプを選択してください。")

const TradeSideSchema = picklist(["Buy", "Sell"], "取引方法を選択してください。")

const TradeTypeSchema = picklist(["Limit", "Market"], "取引タイプを選択してください。")

const TechnicalAnalysisSchema = object({
	bollingerBand: TextAreaSchema,
	rsi: TextAreaSchema,
	macd: TextAreaSchema,
	formation: TextAreaSchema,
	supportResistance: TextAreaSchema,
})

export const TradeSchema = object({
	tradeDate: DateSchema,
	currencyType: CurrencyTypeSchema,
	tradeSide: TradeSideSchema,
	tradeType: TradeTypeSchema,
	tradePrice: TradePriceSchema,
	lotSize: LotSizeSchema,
	technicalAnalysis: TechnicalAnalysisSchema,
	news: TextAreaSchema,
})

export type TradeSchemaType = InferInput<typeof TradeSchema>
