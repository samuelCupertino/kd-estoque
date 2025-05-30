import React, { ComponentProps, forwardRef, useState } from 'react'
import { Alert, Platform, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import {
	GridContainer,
	GridContainerItem,
	Text,
	Icon,
	Button,
	Skeleton,
	CollapseContainer,
} from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { HStack } from '@/components/ui/hstack'
import { Popover } from '@/components/molecules/Popover'
import { Modal } from '@/components/molecules/Modal'
import { twMerge } from 'tailwind-merge'

interface IInputImagesFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	placeholder?: string
	helper?: string
	warning?: string
	error?: string
	min?: IBreakPoint<number> | number
	max?: IBreakPoint<number> | number
	isDisabled?: boolean
	isLoading?: boolean
	value?: string[]
	onChange?: (newValue: string[]) => void
	renderAddImageModalContentEnd?: () => JSX.Element
}

interface IImageContainerProps {
	width: number
	height: number
	uri?: string
	onPress: () => void
}

const ImageContainer = ({
	uri,
	width,
	height,
	onPress,
}: IImageContainerProps) => (
	<Pressable
		className="rounded-xl overflow-hidden bg-background-0 border-2 border-dashed border-background-500 hover:border-background-800 duration-500"
		style={{ width, height }}
		onPress={onPress}
	>
		<Box className="w-full h-full justify-center items-center pointer-events-none">
			{uri ? (
				<>
					<Image source={{ uri }} className="w-full h-full" />
					<Icon
						name="XCircle"
						size="xl"
						color="error_300"
						className="absolute"
					/>
				</>
			) : (
				<Icon name="PlusCircle" size="xl" color="typography_700" />
			)}
		</Box>
	</Pressable>
)

export const InputImagesField = forwardRef<TextInput, IInputImagesFieldProps>(
	(
		{
			label,
			value,
			helper,
			warning,
			error,
			min = { base: 4, md: 6 },
			max = 9,
			onChange,
			renderAddImageModalContentEnd,
			isDisabled,
			isLoading,
			...props
		},
		ref,
	) => {
		const minResp = useBreakpoint(isBreakPoint(min) ? min : { base: min })
		const maxResp = useBreakpoint(isBreakPoint(max) ? max : { base: max })
		const [images, setImages] = useState<string[]>(value ?? [])
		const imagesFields = [
			...images,
			...Array.from({ length: minResp - images.length }, () => undefined),
			...(images.length >= minResp && images.length < maxResp
				? [undefined]
				: []),
		]

		const handlePhotoGallery = async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert(
					'Permissão necessária',
					'Permita o acesso à galeria para selecionar imagens.',
				)
				return
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsMultipleSelection: true,
				quality: 1,
			})
			if (result.canceled) return

			const selectedUris = result.assets.map((asset) => asset.uri)
			const newImages = [...images, ...selectedUris]
			setImages(newImages)
			onChange?.(newImages)
		}

		const handlePhotoCamera = async () => {
			const { status } = await ImagePicker.requestCameraPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert(
					'Permissão necessária',
					'Permita o acesso à câmera para tirar fotos.',
				)
				return
			}

			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			})

			if (!result.canceled) {
				const photoUri = result.assets[0].uri
				const newImages = [...images, photoUri]
				setImages(newImages)
				onChange?.(newImages)
			}
		}

		const handleDeleteIndex = (deleteIndex: number) => {
			const newImages = images.filter((_, i) => i !== deleteIndex)
			setImages(newImages)
			onChange?.(newImages)
		}

		return (
			<VStack pointerEvents={isDisabled ? 'none' : 'auto'} {...props}>
				{label && (
					<Popover
						text={helper}
						offset={-10}
						renderButton={() => (
							<HStack className="items-center gap-1 pb-1 mr-auto">
								<Text size="md" color="typography_600">
									{label}
								</Text>
								{helper && (
									<Icon size="sm" name="HelpCircle" color="typography_400" />
								)}
							</HStack>
						)}
					/>
				)}

				{/* Fazer o ref focar aqui */}
				<TextInput
					ref={ref}
					className="absolute opacity-0"
					showSoftInputOnFocus={false}
				/>

				<Skeleton isLoading={isLoading}>
					<CollapseContainer isOpen={true} duration={200}>
						<Box
							className={twMerge(
								'rounded-xl p-2 overflow-hidden bg-background-100 dark:bg-background-50 border',
								error
									? 'border-error-600  dark:border-error-600'
									: 'border-background-200 dark:border-background-100',
							)}
						>
							<GridContainer cols={12} gap={4}>
								{imagesFields.map((uri, i) => (
									<GridContainerItem key={i} cols={{ base: 3, md: 2 }}>
										{({ width, height }) => (
											<Modal
												iconName="GalleryThumbnails"
												title="Adicionar imagens"
												subtitle="Escolha a forma de inserir"
												renderButton={({
													setIsOpen: setIsOpenAddImageModal,
												}) => (
													<ImageContainer
														uri={uri}
														width={width ?? 0}
														height={height ?? 0}
														onPress={() => {
															if (uri) return handleDeleteIndex(i)
															setIsOpenAddImageModal(true)
														}}
													/>
												)}
											>
												{({ setIsOpen: setIsOpenAddImageModal }) => (
													<VStack className="gap-2 h-full flex-1 p-4">
														{Platform.OS !== 'web' && (
															<Button
																baseColor="secondary"
																iconProps={{ name: 'Camera' }}
																onPress={() => {
																	handlePhotoCamera()
																	setIsOpenAddImageModal(false)
																}}
															>
																Tirar Uma Foto
															</Button>
														)}
														<Button
															baseColor="secondary"
															iconProps={{ name: 'Images' }}
															onPress={() => {
																handlePhotoGallery()
																setIsOpenAddImageModal(false)
															}}
														>
															Selecionar da Galeria
														</Button>
														{renderAddImageModalContentEnd?.()}
													</VStack>
												)}
											</Modal>
										)}
									</GridContainerItem>
								))}
							</GridContainer>
						</Box>
					</CollapseContainer>
				</Skeleton>

				{!label && helper && (
					<Text size="sm" color="typography_400">
						{helper}
					</Text>
				)}
				{!error && warning && (
					<Text size="sm" color="warning_600">
						{warning}
					</Text>
				)}
				{error && (
					<Text size="sm" color="error_600">
						{error}
					</Text>
				)}
			</VStack>
		)
	},
)
