import React, { ComponentProps, forwardRef } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { HStack } from '@/components/ui/hstack'
import { Popover } from '@/components/molecules/Popover'
import { formatExtraSpaces } from '@/utils/formatString'
import { Box } from '@/components/ui/box'

type ITextareaInput = ComponentProps<typeof TextareaInput>

interface IInputTexareatFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children' | 'ref'> {
	label?: string
	size?: ITextareaInput['size']
	placeholder?: string
	helper?: string
	warning?: string
	error?: string
	isDisabled?: boolean
	isReadOnly?: boolean
	isLoading?: boolean
	value?: ITextareaInput['value']
	leftIconProps?: { onPress?: () => void } & Partial<IIconProps>
	rightIconProps?: { onPress?: () => void } & Partial<IIconProps>
	renderLeft?: () => JSX.Element
	renderRight?: () => JSX.Element
	onChange?: ITextareaInput['onChangeText']
	onBlur?: ITextareaInput['onBlur']
	ref?: ITextareaInput['ref']
}

export const InputTexareatField = forwardRef<
	ITextareaInput,
	IInputTexareatFieldProps
>(
	(
		{
			label,
			size,
			placeholder,
			helper,
			warning,
			error,
			isDisabled,
			isReadOnly,
			isLoading,
			value,
			leftIconProps,
			rightIconProps,
			renderLeft,
			renderRight,
			onChange,
			onBlur,
			...props
		},
		ref,
	) => (
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
				<Textarea
					size="md"
					isReadOnly={isReadOnly}
					isInvalid={!!error}
					isDisabled={isDisabled}
					className="rounded-2xl duration-500"
				>
					{leftIconProps && (
						<Pressable
							onPress={leftIconProps?.onPress}
							className="absolute bottom-2 -left-1"
						>
							<Icon
								name="Search"
								color="typography_400"
								size={size}
								className="ml-3"
								{...leftIconProps}
							/>
						</Pressable>
					)}

					{renderLeft && (
						<Box className="absolute bottom-2 -left-1">{renderLeft()}</Box>
					)}

					<TextareaInput
						ref={ref}
						placeholder={placeholder}
						size={size}
						className="bg-primary-0 dark:bg-background-50 rounded-2xl text-md placeholder:color-typography-400 dark:placeholder:color-typography-200"
						value={value}
						onChangeText={(e) => onChange?.(formatExtraSpaces(e))}
						onBlur={onBlur}
						style={{ textAlignVertical: 'top', textAlign: 'left' }}
					/>

					{renderRight && (
						<Box className="absolute bottom-0 -right-1">{renderRight()}</Box>
					)}

					{rightIconProps && (
						<Pressable
							onPress={rightIconProps?.onPress}
							className="absolute bottom-2 -right-1"
						>
							<Icon
								name="Search"
								color="typography_400"
								size={size}
								className="mr-3"
								{...rightIconProps}
							/>
						</Pressable>
					)}
				</Textarea>
			</Skeleton>

			{!label && helper && (
				<Text size="sm" color="typography_400">
					{helper}
				</Text>
			)}
			{warning && (
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
	),
)
