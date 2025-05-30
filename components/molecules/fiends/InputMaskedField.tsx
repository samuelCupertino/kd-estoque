import React, { ComponentProps, forwardRef, useState } from 'react'
import { Input, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { twMerge } from 'tailwind-merge'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { Popover } from '@/components/molecules/Popover'
import { HStack } from '@/components/ui/hstack'
import { Platform, TextInput } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import MaskInput from 'react-native-mask-input'

type IInputField = ComponentProps<typeof MaskInput>

const inputMasks = {
	phone: [
		'(',
		/\d/,
		/\d/,
		')',
		' ',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		/\d/,
		/\d/,
		/\d/,
	],
	date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
}

type InputMasks = keyof typeof inputMasks

interface IInputMaskedFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'mask'> {
	label?: string
	mask: InputMasks
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
	onBlur?: IInputField['onBlur']
	leftIconProps?: { onPress?: () => void } & Partial<IIconProps>
	rightIconProps?: { onPress?: () => void } & Partial<IIconProps>
	keyboardType?: IInputField['keyboardType']
	onChange?: (text: string, maskedText: string) => void
}

export const InputMaskedField = forwardRef<TextInput, IInputMaskedFieldProps>(
	(
		{
			label,
			mask,
			size = { base: 'xl', md: 'lg' },
			placeholder,
			helper,
			warning,
			error,
			isDisabled,
			isReadOnly,
			isLoading,
			value,
			onBlur,
			leftIconProps,
			rightIconProps,
			keyboardType,
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
									size="md"
									{...leftIconProps}
									className={twMerge('ml-3', leftIconProps.className)}
								/>
								<Pressable
									onPress={leftIconProps?.onPress}
									className="absolute w-20 h-24"
								/>
							</InputSlot>
						)}

						<MaskInput
							ref={ref}
							value={value}
							onChangeText={(masked, unmasked) => onChange?.(unmasked, masked)}
							onBlur={(e) => {
								setIsFocused(false)
								onBlur?.(e)
							}}
							onFocus={() => setIsFocused(true)}
							mask={inputMasks[mask]}
							placeholder={placeholder}
							placeholderTextColor={placeholderColor}
							keyboardType={keyboardType}
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
