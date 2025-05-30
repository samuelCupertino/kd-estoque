import React, { ComponentProps, forwardRef, useState } from 'react'
import { Input, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import {
	ButtonCircle,
	Icon,
	IIconProps,
	Skeleton,
	Text,
} from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { twMerge } from 'tailwind-merge'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { Popover } from '@/components/molecules/Popover'
import { HStack } from '@/components/ui/hstack'
import CurrencyInput from 'react-native-currency-input'
import { TextInput } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

type IInputField = ComponentProps<typeof CurrencyInput>

interface IInputNumberFieldProps
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

export const InputNumberField = forwardRef<TextInput, IInputNumberFieldProps>(
	(
		{
			label,
			size = { base: 'xl', md: 'lg' },
			placeholder,
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
		const placeholderColor = useThemeColor('typography_200')

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

						<HStack className="items-center">
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
								precision={0}
								minValue={minValue}
								maxValue={maxValue}
								keyboardType="numeric"
								placeholderTextColor={placeholderColor}
								style={{
									fontSize: 14,
									paddingHorizontal: 14,
									color: textColor,
									flex: 1,
									zIndex: 0,
								}}
							/>

							<HStack className="gap-1">
								<ButtonCircle
									size={{ base: 'md', md: 'sm' }}
									className="!bg-background-100 dark:!bg-background-300"
									iconProps={{ name: 'Minus' }}
									isDisabled={(value || 0) <= minValue}
									onPress={() =>
										onChange?.(Math.max((value || 0) - 1, minValue))
									}
								/>
								<ButtonCircle
									size={{ base: 'md', md: 'sm' }}
									className="!bg-background-100 dark:!bg-background-300"
									iconProps={{ name: 'Plus' }}
									isDisabled={(value || 0) >= maxValue}
									onPress={() =>
										onChange?.(Math.min((value || 0) + 1, maxValue))
									}
								/>
							</HStack>
						</HStack>

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
