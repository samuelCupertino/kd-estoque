import React, { ComponentProps, forwardRef, useState } from 'react'
import { Input, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { twMerge } from 'tailwind-merge'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { Popover } from '@/components/molecules/Popover'
import { HStack } from '@/components/ui/hstack'
import CurrencyInput from 'react-native-currency-input'
import { Platform, TextInput } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

type IInputField = ComponentProps<typeof CurrencyInput>

interface IInputMoneyRealFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	size?:
		| IBreakPoint<ComponentProps<typeof Input>['size']>
		| ComponentProps<typeof Input>['size']
	placeholder?: string
	helper?: string
	warning?: string
	error?: string
	isDisabled?: boolean
	isReadOnly?: boolean
	isLoading?: boolean
	value?: IInputField['value']
	minValue?: number
	maxValue?: number
	onBlur?: IInputField['onBlur']
	leftIconProps?: { onPress?: () => void } & Partial<IIconProps>
	rightIconProps?: { onPress?: () => void } & Partial<IIconProps>
	onSubmitEditing?: IInputField['onSubmitEditing']
	onChange?: IInputField['onChangeValue']
}

export const InputMoneyRealField = forwardRef<
	TextInput,
	IInputMoneyRealFieldProps
>(
	(
		{
			label,
			size = { base: 'xl', md: 'lg' },
			placeholder = 'R$ 0,00',
			helper,
			warning,
			error,
			isDisabled,
			isReadOnly,
			isLoading,
			value,
			minValue = 0,
			maxValue = 999999999999999,
			onBlur,
			leftIconProps,
			rightIconProps,
			onChange,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false)
		const sizeResp = useBreakpoint(isBreakPoint(size) ? size : { base: size })
		const textColor = useThemeColor('typography_600')
		const placeholderColor = useThemeColor({
			light: 'typography_400',
			dark: 'typography_200',
		})

		return (
			<VStack {...props}>
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

				<Skeleton isLoading={isLoading}>
					<Input
						size={sizeResp}
						variant="rounded"
						isDisabled={isDisabled}
						isInvalid={!!error}
						isReadOnly={isReadOnly}
						isFocused={isFocused}
						className="bg-primary-0 dark:bg-background-50 duration-500"
					>
						{leftIconProps && (
							<InputSlot>
								<Icon
									name="Search"
									color="typography_400"
									size={sizeResp}
									{...leftIconProps}
									className={twMerge('ml-3', leftIconProps.className)}
								/>
								<Pressable
									onPress={leftIconProps?.onPress}
									className="absolute w-20 h-24"
								/>
							</InputSlot>
						)}

						<CurrencyInput
							ref={ref}
							placeholder={placeholder}
							value={value ?? null}
							onChangeValue={onChange}
							onBlur={(e) => {
								setIsFocused(false)
								onBlur?.(e)
							}}
							onFocus={() => setIsFocused(true)}
							prefix="R$ "
							delimiter="."
							separator=","
							precision={2}
							minValue={minValue}
							maxValue={maxValue}
							keyboardType="numeric"
							placeholderTextColor={placeholderColor}
							style={{
								fontSize: 14,
								paddingHorizontal: 14,
								color: textColor,
								flex: 1,
								borderWidth: 0,
								...(Platform.OS === 'web' && { outlineStyle: 'none' }),
							}}
						/>

						{rightIconProps && (
							<InputSlot>
								<Icon
									name="Search"
									color="typography_400"
									size={sizeResp}
									{...rightIconProps}
									className={twMerge('mr-3', rightIconProps.className)}
								/>

								<Pressable
									onPress={rightIconProps?.onPress}
									className="absolute w-20 h-24"
								/>
							</InputSlot>
						)}
					</Input>
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
