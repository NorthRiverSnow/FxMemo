import type { ParallaxScrollViewHandle } from "@/components/parallax-scroll-view"
import { getDefaultTradeValue } from "@/constants/trade-details"
import { insertTrade } from "@/sqlite/add-deal"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { TradeSchema, type TradeSchemaType } from "../schemas/add-deal"

export const useAddDeal = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<TradeSchemaType>({
		resolver: valibotResolver(TradeSchema),
		mode: "onChange",
		defaultValues: getDefaultTradeValue(),
	})
	const [resultMessage, setResultMessage] = useState("")

	const parallaxRef = useRef<ParallaxScrollViewHandle>(null)

	const onSubmit = async (data: TradeSchemaType) => {
		const ret = await insertTrade(data)
		ret === true
			? setResultMessage("登録が完了しました。")
			: setResultMessage("登録が失敗しました。")
		parallaxRef.current?.scrollToTop()
		if (ret === true) reset()
	}

	const onError = () => {
		parallaxRef.current?.scrollToTop()
	}

	return {
		register,
		control,
		handleSubmit: handleSubmit(onSubmit, onError),
		formState: { errors },
		parallaxRef,
		resultMessage,
		disabled: !isValid,
	}
}
