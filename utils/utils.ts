export const formatDate = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

export const formatDateForDb = (date: string) => {
  const newDate = new Date(date)
  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`}

import * as Crypto from "expo-crypto"

export const generateUUID = () => {
	const bytes = new Uint8Array(16)
	Crypto.getRandomValues(bytes)
	bytes[6] = (bytes[6] & 0x0f) | 0x40 // version 4
	bytes[8] = (bytes[8] & 0x3f) | 0x80 // variant 10

	const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
	return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(
		12,
		16
	)}-${hex.substring(16, 20)}-${hex.substring(20)}`
}

export const translateTradeType = (target: string) => {
	switch (target) {
		case "Market":
			return "成行"
		case "Limit":
			return "指値"
		default:
			return ""
	}
}

export const translateTradeSide = (target: string) => {
	switch (target) {
		case "Buy":
			return "買い"
		case "Sell":
			return "売り"
		default:
			return ""
	}
}

export const translateCurrencyType = (target: string) => {
	switch (target) {
		case "Dollar":
			return "ドル"
		case "Euro":
			return "ユーロ"
		case "Pound":
		  return "ポンド"
		default:
			return ""
	}
}