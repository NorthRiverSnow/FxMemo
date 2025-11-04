import { ParallaxScrollView } from "@/components/parallax-scroll-view"
import { ThemedDatetimePicker } from "@/components/themed-datetime-picker"
import { ThemedNumberInput } from "@/components/themed-number-input"
import { ThemedPicker } from "@/components/themed-picker"
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view"
import { ThemedSubmitButton } from "@/components/themed-submit-button"
import { ThemedTextAreaInput } from "@/components/themed-texi-area-input"
import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { currencies } from "@/constants/currencies"
import { tradeSide } from "@/constants/trade-side"
import { tradeType } from "@/constants/trade-type"
import { useAddDeal } from "@/hooks/features/use-add-deal"
import { Controller } from "react-hook-form"
import { StyleSheet } from "react-native"

export default function AddDealScreen() {
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		parallaxRef,
		resultMessage,
		disabled,
	} = useAddDeal()
	return (
		<ThemedSafeAreaView style={{ flex: 1 }}>
			<ParallaxScrollView
				headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
				ref={parallaxRef}
			>
				{resultMessage && <ThemedText>{resultMessage}</ThemedText>}
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">取引追加</ThemedText>
				</ThemedView>
				<Controller
					control={control}
					name="tradeDate"
					render={({ field: { onChange, value } }) => (
						<ThemedDatetimePicker
							label="取引日付："
							date={value}
							setDate={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.tradeDate?.message && (
					<ThemedText type="error">{errors.tradeDate?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="currencyType"
					render={({ field: { onChange, value } }) => (
						<ThemedPicker
							label="取引通貨："
							selectedValue={value}
							setSelectedValue={onChange}
							pickerItems={currencies}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.currencyType?.message && (
					<ThemedText type="error">{errors.currencyType?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="tradeType"
					render={({ field: { onChange, value } }) => (
						<ThemedPicker
							label="取引タイプ："
							selectedValue={value}
							setSelectedValue={onChange}
							pickerItems={tradeType}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.tradeType?.message && (
					<ThemedText type="error">{errors.tradeType?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="tradeSide"
					render={({ field: { onChange, value } }) => (
						<ThemedPicker
							label="注文："
							selectedValue={value}
							setSelectedValue={onChange}
							pickerItems={tradeSide}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.tradeSide?.message && (
					<ThemedText type="error">{errors.tradeSide?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="tradePrice"
					render={({ field: { onChange, value } }) => (
						<ThemedNumberInput
							label="取得価格："
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.tradePrice?.message && (
					<ThemedText type="error">{errors.tradePrice?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="lotSize"
					render={({ field: { onChange, value } }) => (
						<ThemedNumberInput
							label="ロット数："
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.lotSize?.message && <ThemedText type="error">{errors.lotSize?.message}</ThemedText>}
				<Controller
					control={control}
					name="technicalAnalysis.bollingerBand"
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="ボリンガーバンド"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.technicalAnalysis?.bollingerBand?.message && (
					<ThemedText type="error">{errors.technicalAnalysis?.bollingerBand?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="technicalAnalysis.macd"
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="Macd"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.technicalAnalysis?.macd?.message && (
					<ThemedText type="error">{errors.technicalAnalysis?.macd?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="technicalAnalysis.rsi"
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="RSI"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.technicalAnalysis?.formation?.message && (
					<ThemedText type="error">{errors.technicalAnalysis?.rsi?.message}</ThemedText>
				)}
				<Controller
					control={control}
					name="technicalAnalysis.formation"
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="フォーメーション"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.technicalAnalysis?.formation?.message && (
					<ThemedText type="error">{errors.technicalAnalysis?.formation?.message}</ThemedText>
				)}
				<Controller
					{...register("technicalAnalysis.supportResistance")}
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="抵抗/支持ライン"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.technicalAnalysis?.supportResistance?.message && (
					<ThemedText type="error">
						{errors.technicalAnalysis?.supportResistance?.message}
					</ThemedText>
				)}
				<Controller
					control={control}
					name="news"
					render={({ field: { onChange, value } }) => (
						<ThemedTextAreaInput
							label="ニュース"
							value={value}
							setValue={onChange}
							style={styles.inputCommon}
						/>
					)}
				/>
				{errors.news?.message && <ThemedText type="error">{errors.news?.message}</ThemedText>}
				<ThemedSubmitButton onPress={handleSubmit} disabled={disabled} />
			</ParallaxScrollView>
		</ThemedSafeAreaView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	BuyTag: {
		backgroundColor: "#f44336",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	SellTag: {
		backgroundColor: "#2196f3",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	MarketTag: {
		backgroundColor: "#4caf50",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	LimitTag: {
		backgroundColor: "#9c27b0",
		color: "white",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignSelf: "flex-start",
		marginTop: 4,
		marginRight: 8,
	},
	inputCommon: {
		marginLeft: 20,
	},
})
