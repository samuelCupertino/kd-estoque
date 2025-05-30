import React, { useState, useEffect, forwardRef } from 'react'
import {
	BarcodeScanningResult,
	CameraType,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import {
	IInputField,
	IInputTextFieldProps,
	InputTextField,
} from './InputTextField'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms'
import { VStack } from '@/components/ui/vstack'
import { Platform } from 'react-native'
import { formatExtraSpaces } from '@/utils/formatString'

type IBarcode = { type: string; value: string }

interface IInputBarcodeFieldProps extends Omit<IInputTextFieldProps, 'ref'> {
	onChageBarcode?: (newBarcode: IBarcode) => void
}

export const InputBarcodeField = forwardRef<
	IInputField,
	IInputBarcodeFieldProps
>(({ onChange, onChageBarcode, ...props }, ref) => {
	const [permission, requestPermission] = useCameraPermissions()
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [cameraSelected, setCameraSelected] = useState<CameraType>('back')

	useEffect(() => {
		if (!permission && Platform.OS !== 'web') requestPermission()
	}, [permission, requestPermission])

	const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
		onChange?.(data)
		onChageBarcode?.({ type, value: data })
		setIsOpenModal(false)
	}

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				iconName="ScanBarcode"
				title="Escanear código"
				subtitle="Ajuste o código de barras"
				renderFooter={() => (
					<Button
						baseColor="secondary"
						iconProps={{ name: 'SwitchCamera' }}
						onPress={() => {
							setCameraSelected(cameraSelected === 'back' ? 'front' : 'back')
						}}
					>
						Trocar Câmera
					</Button>
				)}
			>
				<VStack className="flex-1 p-4">
					<CameraView
						style={{ minHeight: 150, width: '100%', borderRadius: 12 }}
						facing={cameraSelected}
						barcodeScannerSettings={{
							barcodeTypes: [
								'ean13',
								'ean8',
								'upc_a',
								'upc_e',
								'code39',
								'code128',
							],
						}}
						onBarcodeScanned={handleBarCodeScanned}
					/>
				</VStack>
			</Modal>

			<InputTextField
				ref={ref}
				label="Código de barras"
				{...(Platform.OS === 'web'
					? { placeholder: 'Informe o codigo de barras' }
					: {
							helper:
								'Toque no ícone de código de barras no canto inferior esquerdo para escanear uma imagem ou insira manualmente o código no campo.',
							placeholder: 'Escaneie tocando no icone ou escreva aqui…',
							leftIconProps: {
								name: 'ScanBarcode',
								size: 'md',
								onPress: () => setIsOpenModal(true),
							},
						})}
				onChange={(e) => onChange?.(formatExtraSpaces(e))}
				{...props}
			/>
		</>
	)
})
