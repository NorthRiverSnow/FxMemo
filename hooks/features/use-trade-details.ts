import { deleteTradeData } from "@/sqlite/delete-deal"
import { selectTradeDetails } from "@/sqlite/trade-details"
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useState } from "react"
import { Alert } from "react-native"
import type { TradeSchemaType } from "../schemas/add-deal"
import { useThemeColor } from "../use-theme-color"

type Params = { tradeId: string }
export const useTradeDetails = () => {
	const params = useLocalSearchParams<Params>()
	const router = useRouter()
	const [data, setData] = useState<TradeSchemaType | undefined>(undefined)
	const fontColor = useThemeColor({}, "text")
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const ret = await selectTradeDetails(params.tradeId)
				setData(ret)
			}
			fetchData()
		}, [params.tradeId]),
	)
	const handleDelete = useCallback(() => {
		Alert.alert(
			"確認",
			"本当にこの取引を削除しますか？",
			[
				{
					text: "キャンセル",
					style: "cancel",
				},
				{
					text: "削除する",
					style: "destructive",
					onPress: async () => {
						const ret = await deleteTradeData(params.tradeId)
						if (ret) {
							router.back()
						} else {
							setErrorMessage("取引の削除に失敗しました。")
						}
					},
				},
			],
			{ cancelable: true },
		)
	}, [params.tradeId, router])
	return {
		data,
		handleDelete,
		errorMessage,
		fontColor,
		router,
	}
}
