import React, { ComponentProps } from 'react'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Text } from '@/components/atoms'

type IInputField = ComponentProps<typeof InputField>

interface IInputTextFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	placeholder?: string
	helper?: string
	error?: string
	isDisabled?: boolean
	isReadOnly?: boolean
	value?: IInputField['value']
	type?: IInputField['type']
	onBlur?: IInputField['onBlur']
	leftIconProps?: Partial<IIconProps>
	rightIconProps?: Partial<IIconProps>
	onSubmitEditing?: IInputField['onSubmitEditing']
	onChange?: IInputField['onChangeText']
}

export const InputTextField = ({
	label,
	placeholder,
	helper,
	error,
	isDisabled,
	isReadOnly,
	value,
	type = 'text',
	onBlur,
	leftIconProps,
	rightIconProps,
	onSubmitEditing,
	onChange,
	...props
}: IInputTextFieldProps) => (
	<VStack {...props}>
		{label && (
			<Text size="md" color="typography_500">
				{label}
			</Text>
		)}
		<Input
			variant="rounded"
			isDisabled={isDisabled}
			isInvalid={!!error}
			isReadOnly={isReadOnly}
			className="h-auto flex-1 bg-primary-0"
		>
			{leftIconProps && (
				<InputSlot>
					<Icon
						name="Search"
						color="typography_400"
						size={24}
						className="ml-3"
						{...leftIconProps}
					/>
				</InputSlot>
			)}

			<InputField
				placeholder={placeholder}
				type={type}
				value={value}
				onBlur={onBlur}
				onChangeText={onChange}
				onSubmitEditing={onSubmitEditing}
				returnKeyType="send"
			/>

			{rightIconProps && (
				<InputSlot>
					<Icon
						name="Search"
						color="typography_400"
						size={24}
						className="mr-3"
						{...rightIconProps}
					/>
				</InputSlot>
			)}
		</Input>
		{helper && (
			<Text size="sm" color="typography_400">
				{helper}
			</Text>
		)}
		{error && (
			<Text size="sm" color="error_600">
				{error}
			</Text>
		)}
	</VStack>
)
