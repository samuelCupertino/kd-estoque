import React, { ComponentProps, forwardRef, useState } from 'react'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { IIconProps } from '@/components/atoms'
import { IBreakPoint } from '@/hooks/useBreakpoint'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform, TextInput } from 'react-native'
import { format as formatFNS, isValid, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { InputMaskedField } from './InputMaskedField'

type IInputField = ComponentProps<typeof InputField>

export interface IInputDateFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	mode?: 'date' | 'time'
	format?: string
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
	value?: string
	onBlur?: IInputField['onBlur']
	leftIconProps?: { onPress?: () => void } & Partial<IIconProps>
	rightIconProps?: { onPress?: () => void } & Partial<IIconProps>
	onChange?: (newValue: string) => void
}

export const InputDateField = forwardRef<TextInput, IInputDateFieldProps>(
	(
		{
			label,
			mode = 'date',
			format = 'dd/MM/yyyy',
			size = { base: 'xl', md: 'lg' },
			placeholder = 'Selecione tocando no icone ou escreva aqui…',
			helper = 'Toque no ícone de calendário no canto inferior esquerdo para selecionar uma data ou insira manualmente a data.',
			warning,
			error,
			isDisabled,
			isReadOnly,
			isLoading,
			value,
			onBlur,
			leftIconProps,
			rightIconProps,
			onChange,
			...props
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(false)

		return (
			<VStack {...props}>
				<InputMaskedField
					ref={ref}
					size={size}
					label={label}
					helper={helper}
					warning={warning}
					error={error}
					mask="date"
					value={value}
					placeholder={placeholder}
					onBlur={onBlur}
					keyboardType="numeric"
					isDisabled={isDisabled}
					isReadOnly={isReadOnly}
					isLoading={isLoading}
					onChange={(newValue) => {
						onChange?.(newValue)
						setIsOpen(false)
					}}
					rightIconProps={rightIconProps}
					leftIconProps={{
						name: 'CalendarDays',
						onPress: () => setIsOpen(true),
						...leftIconProps,
					}}
				/>

				{Platform.OS === 'web' && (
					<input
						type="date"
						onChange={(e) => {
							const newDate = parseISO(e.target.value)
							if (!isValid(newDate)) return
							const dateStr = formatFNS(newDate, format, { locale: ptBR })
							onChange?.(dateStr)
						}}
						style={{
							position: 'absolute',
							width: 40,
							height: 44,
							bottom: 0,
							fontSize: 34,
							padding: 0,
							opacity: 0,
							cursor: 'pointer',
						}}
					/>
				)}

				{Platform.OS !== 'web' && isOpen && (
					<DateTimePicker
						mode={mode}
						display={Platform.OS === 'ios' ? 'spinner' : 'default'}
						value={value && isValid(value) ? new Date(value) : new Date()}
						onChange={(ev, newDate) => {
							setIsOpen(false)
							if (ev.type !== 'set' || !newDate || !isValid(newDate)) return
							const dateStr = formatFNS(newDate, format, { locale: ptBR })
							onChange?.(dateStr)
						}}
					/>
				)}
			</VStack>
		)
	},
)
