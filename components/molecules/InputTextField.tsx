import React, { ComponentProps } from 'react'
import { Input, InputField } from '../ui/input'
import { VStack } from '../ui/vstack'
import { Text } from '../atoms'

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
	onSubmitEditing: IInputField['onSubmitEditing']
	onChange: IInputField['onChangeText']
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
	onSubmitEditing,
	onChange,
	...props
}: IInputTextFieldProps) => (
	<VStack className="flex-1" {...props}>
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
			className="h-auto flex-1"
		>
			<InputField
				placeholder={placeholder}
				type={type}
				value={value}
				onBlur={onBlur}
				onChangeText={onChange}
				onSubmitEditing={onSubmitEditing}
				returnKeyType="send"
			/>
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
