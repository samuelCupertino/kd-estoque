import {
	Drawer,
	IDrawerProps,
	InputBarcodeField,
	InputDateField,
	InputMoneyRealField,
	InputNumberField,
	InputTexareatField,
	InputTextField,
	SelectMenuField,
	SwitchField,
} from '@/components/molecules'
import {
	ButtonCircle,
	Button,
	Stack,
	CollapseContainer,
	Divider,
	Icon,
} from '@/components/atoms'
import { InputImagesField } from '@/components/molecules'
import { VStack } from '@/components/ui/vstack'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { isValid, parse } from 'date-fns'

import {
	isValidCode128,
	isValidCode39,
	isValidEan13,
	isValidEan8,
	isValidUpcA,
	isValidUpcE,
} from '@/utils/validateFn'
import { Pressable } from 'react-native'
import { useState } from 'react'
import { AIGenerateImagesModal } from './AIGenerateImagesModal'

export interface IStockProductsCreateDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

const stockProductsCreateSchema = z.object({
	images: z.array(z.string().url()).default([]).optional(),
	autofillWithAI: z.boolean().optional(),
	name: z
		.string({ required_error: 'O nome é obrigatório' })
		.trim()
		.min(1, 'O nome é obrigatório'),
	quantity: z
		.number({
			required_error: 'A quantidade é obrigatória',
			invalid_type_error: 'A quantidade é obrigatória',
		})
		.min(1, 'Quantidade deve ser maior que zero'),
	barcode: z
		.string()
		.trim()
		.optional()
		.refine(
			(val) => {
				if (!val) return true

				return (
					isValidEan13(val) ||
					isValidEan8(val) ||
					isValidUpcA(val) ||
					isValidUpcE(val) ||
					isValidCode39(val) ||
					isValidCode128(val)
				)
			},
			{
				message:
					'Deve ser um EAN-13, EAN-8, UPC-A, UPC-E, Code 39 ou Code 128 válido.',
			},
		),
	validUntil: z
		.string()
		.trim()
		.optional()
		.refine((val) => !val || isValid(parse(val, 'dd/MM/yyyy', new Date())), {
			message: 'A data deve ser válida.',
		}),
	costPrice: z.number({
		required_error: 'Preço de custo é obrigatório',
		invalid_type_error: 'Preço de custo é obrigatório',
	}),
	salePrice: z.number({
		required_error: 'Preço de venda é obrigatório',
		invalid_type_error: 'Preço de venda é obrigatório',
	}),
	category: z.string({ required_error: 'Categoria é obrigatória' }),
	store: z.string({ required_error: 'Loja é obrigatória' }),
	description: z.string().optional(),
	internalNote: z.string().optional(),
})

type IStockProductsCreateFormData = z.infer<typeof stockProductsCreateSchema>

const defaultValues: Partial<IStockProductsCreateFormData> = {
	images: [],
	autofillWithAI: false,
	name: '',
	quantity: 1,
	costPrice: undefined,
	salePrice: undefined,
	barcode: '',
	validUntil: '',
	category: 'Sem categoria',
	store: 'Papelaria Nova Era',
	description: '',
	internalNote: '',
}

export const StockProductsCreateDrawer = ({
	...props
}: IStockProductsCreateDrawerProps) => {
	const [isAILoading, setIsAILoading] = useState(false)
	const { watch, control, handleSubmit, reset, setValue, getValues } =
		useForm<IStockProductsCreateFormData>({
			defaultValues,
			resolver: zodResolver(stockProductsCreateSchema),
		})
	const imagesWatch = watch('images')
	const autofillWithAIWatch = watch('autofillWithAI')
	const costPriceWatch = watch('costPrice')
	const salePriceWatch = watch('salePrice')

	const onSubmit: SubmitHandler<IStockProductsCreateFormData> = (formData) => {
		console.log(formData)
	}

	const handleAIGenerateData = (canGenerate: boolean) => {
		if (!canGenerate) return reset({ ...defaultValues, images: imagesWatch })

		setIsAILoading(true)
		setTimeout(() => {
			reset({
				...getValues(),
				name: 'Secador de cabelo',
				salePrice: 779.99,
				category: 'Beleza e Cuidados Pessoais',
				description:
					'Secador de cabelo elétrico, compacto e leve, ideal para uso doméstico. Potência de 2000W com 2 velocidades e jato de ar frio.',
			})
			setIsAILoading(false)
		}, 2000)
	}

	return (
		<Drawer
			title="Cadastro de produto"
			subtitle="Adicione um novo produto no estoque"
			iconName="Plus"
			onClose={() => reset(defaultValues)}
			renderButton={({ setIsOpen }) => (
				<ButtonCircle
					size="md"
					iconProps={{ name: 'Plus' }}
					className="bg-background-0"
					onPress={() => setIsOpen(true)}
				/>
			)}
			renderFooter={({ setIsOpen }) => (
				<Button
					baseColor="secondary"
					onPress={handleSubmit((formData) => {
						onSubmit(formData)
						setIsOpen(false)
					})}
				>
					Salvar
				</Button>
			)}
			{...props}
		>
			<VStack className="p-4 gap-4">
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange, ...field }, fieldState }) => (
						<InputImagesField
							label="Imagens do produto"
							{...field}
							onChange={(e) => {
								onChange(e)
								if (!e.length) setValue('autofillWithAI', false)
							}}
							error={fieldState.error?.message}
							isDisabled={isAILoading}
							renderAddImageModalContentEnd={() => <AIGenerateImagesModal />}
						/>
					)}
				/>

				<CollapseContainer isOpen={!!imagesWatch?.length} excludeGap={14}>
					<Controller
						name="autofillWithAI"
						control={control}
						render={({ field: { onChange, ...field }, fieldState }) => (
							<SwitchField
								label="Preenchimento automático"
								title="Gerar os dados por IA"
								description="Ao ativar, os campos abaixo serão preenchidos automaticamente pela IA com base nas fotos acima."
								{...field}
								onChange={(isChecked) => {
									onChange(isChecked)
									handleAIGenerateData(isChecked)
								}}
								error={fieldState.error?.message}
								isDisabled={isAILoading}
							/>
						)}
					/>
				</CollapseContainer>

				<Divider title="Dados Obrigatórias" />

				<Stack
					dir={{ base: 'vertical', md: 'horizontal' }}
					className="w-full gap-4"
				>
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<InputTextField
								label="Nome do produto"
								className="flex-1"
								{...(autofillWithAIWatch && {
									helper: '',
									renderRight: () => (
										<SelectMenuField
											options={[
												{
													value: 1,
													label: `Secador de Cabelo`,
												},
												{
													value: 2,
													label: `Secador Elétrico`,
												},
												{
													value: 3,
													label: `Secador Profissional`,
												},
												{
													value: 4,
													label: `Secador Compacto Portátil`,
												},
												{
													value: 5,
													label: `Secador de Cabelo 127V`,
												},
											]}
											onChange={(op) => setValue('name', op.label)}
											renderButton={({ setIsOpen }) => (
												<Pressable
													onPress={() => setIsOpen(true)}
													className="p-3"
												>
													<Icon
														name="BotMessageSquare"
														size="md"
														color="typography_400"
													/>
												</Pressable>
											)}
										/>
									),
								})}
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>

					<Controller
						name="quantity"
						control={control}
						render={({ field, fieldState }) => (
							<InputNumberField
								label="Quantidade"
								className="md:max-w-72"
								minValue={1}
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>
				</Stack>

				<Stack dir="horizontal" className="w-full gap-4">
					<Controller
						name="costPrice"
						control={control}
						render={({ field, fieldState }) => (
							<InputMoneyRealField
								label="Preço de custo"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>

					<Controller
						name="salePrice"
						control={control}
						render={({ field, fieldState }) => (
							<InputMoneyRealField
								label="Preço de venda"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
								warning={
									salePriceWatch < costPriceWatch
										? 'O preço está abaixo do custo.'
										: undefined
								}
							/>
						)}
					/>
				</Stack>

				<Divider title="Dados Complementares" className="my-2" />

				<Stack
					dir={{ base: 'vertical', md: 'horizontal' }}
					className="w-full gap-4"
				>
					<Controller
						name="barcode"
						control={control}
						render={({ field, fieldState }) => (
							<InputBarcodeField
								label="Código de barras"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>

					<Controller
						name="validUntil"
						control={control}
						render={({ field, fieldState }) => (
							<InputDateField
								label="Data de validade"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>
				</Stack>

				<Stack
					dir={{ base: 'vertical', md: 'horizontal' }}
					className="w-full gap-4"
				>
					<Controller
						name="category"
						control={control}
						render={({ field, fieldState }) => (
							<InputTextField
								label="Categoria"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>

					<Controller
						name="store"
						control={control}
						render={({ field, fieldState }) => (
							<InputTextField
								label="Loja"
								className="flex-1"
								{...field}
								error={fieldState.error?.message}
								isLoading={isAILoading}
							/>
						)}
					/>
				</Stack>

				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<InputTexareatField
							label="Descrição"
							helper="Adicione uma descrição do produto, incluindo características, funcionalidades e benefícios."
							{...(autofillWithAIWatch && {
								renderRight: () => (
									<SelectMenuField
										options={[
											{
												value: 1,
												label: `Secador de cabelo elétrico, compacto e leve, ideal para uso doméstico. Potência de 2000W com 2 velocidades e jato de ar frio.`,
											},
											{
												value: 2,
												label: `Secador de cabelo profissional com motor potente de 2000W. Possui tecnologia de íons para redução do frizz e bocal direcionador incluso.`,
											},
											{
												value: 3,
												label: `Equipamento bivolt com potência de 2000W, cabo de 1,8m, 2 níveis de velocidade e botão de jato frio. Design ergonômico e leve.`,
											},
											{
												value: 4,
												label: `Secador com alto desempenho para secagem rápida e proteção dos fios. Ideal para todos os tipos de cabelo, com função de ar frio.`,
											},
											{
												value: 5,
												label: `Secador de cabelo 2000W – acabamento em plástico resistente, leve, silencioso e eficiente. Acompanha bocal direcionador. Ideal para uso diário.`,
											},
										]}
										onChange={(op) => setValue('description', op.label)}
										renderButton={({ setIsOpen }) => (
											<Pressable
												onPress={() => setIsOpen(true)}
												className="pt-5 pl-5 pr-3 pb-2"
											>
												<Icon
													name="BotMessageSquare"
													size="md"
													color="typography_400"
												/>
											</Pressable>
										)}
									/>
								),
							})}
							{...field}
							error={fieldState.error?.message}
							isLoading={isAILoading}
						/>
					)}
				/>

				<Controller
					name="internalNote"
					control={control}
					render={({ field, fieldState }) => (
						<InputTexareatField
							label="Observações internas"
							helper="Adicione informações internas relevantes, como notas de estoque, condições especiais ou instruções específicas para a equipe"
							{...field}
							error={fieldState.error?.message}
							isLoading={isAILoading}
						/>
					)}
				/>
			</VStack>
		</Drawer>
	)
}
