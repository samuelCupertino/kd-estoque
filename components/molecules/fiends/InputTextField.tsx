import React, { ComponentProps, forwardRef } from 'react'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { Popover } from '@/components/molecules/Popover'
import { HStack } from '@/components/ui/hstack'
import { formatExtraSpaces } from '@/utils/formatString'
import { twMerge } from 'tailwind-merge'

export type IInputField = ComponentProps<typeof InputField>

export interface IInputTextFieldProps
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
	type?: IInputField['type']
	onBlur?: IInputField['onBlur']
	leftIconProps?: { onPress?: () => void } & Partial<IIconProps>
	rightIconProps?: { onPress?: () => void } & Partial<IIconProps>
	renderLeft?: () => JSX.Element
	renderRight?: () => JSX.Element
	onSubmitEditing?: IInputField['onSubmitEditing']
	onChange?: IInputField['onChangeText']
}

export const InputTextField = forwardRef<IInputField, IInputTextFieldProps>(
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
			type = 'text',
			onBlur,
			leftIconProps,
			rightIconProps,
			renderLeft,
			renderRight,
			onSubmitEditing,
			onChange,
			...props
		},
		ref,
	) => {
		const sizeResp = useBreakpoint(isBreakPoint(size) ? size : { base: size })

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

						{renderLeft && <InputSlot>{renderLeft()}</InputSlot>}

						<InputField
							ref={ref}
							placeholder={placeholder}
							type={type}
							value={value}
							onBlur={onBlur}
							onChangeText={(e) => onChange?.(formatExtraSpaces(e))}
							onSubmitEditing={onSubmitEditing}
							returnKeyType="send"
							className="text-md placeholder:color-typography-400 dark:placeholder:color-typography-200"
						/>

						{renderRight && <InputSlot>{renderRight()}</InputSlot>}

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
