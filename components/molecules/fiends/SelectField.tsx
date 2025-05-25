import React, { ComponentProps } from 'react'
import { Input, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Text } from '@/components/atoms'
import { Button, ButtonText } from '@/components/ui/button'
import {
	Menu,
	MenuItem,
	MenuItemLabel,
	MenuSeparator,
} from '@/components/ui/menu'
import { Pressable } from '@/components/ui/pressable'

type ISelectField = ComponentProps<typeof Menu>

interface Option<ValueType> {
	value: ValueType
	label: string
	iconProps?: IIconProps
}

interface ISelectFieldProps<ValueType>
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	value?: ValueType
	options: Option<ValueType>[]
	placement?: ISelectField['placement']
	renderButton?: (data: {
		optionSelected?: Option<ValueType>
		isOpen: boolean
	}) => JSX.Element
	onChange?: (option: Option<ValueType>) => void
	size?: ComponentProps<typeof Input>['size']
	placeholder?: string
	helper?: string
	error?: string
	isDisabled?: boolean
	isReadOnly?: boolean
	leftIconProps?: Partial<IIconProps>
	rightIconProps?: Partial<IIconProps>
}

export const SelectField = <ValueType extends string | number>({
	label,
	options,
	placement,
	renderButton,
	size,
	helper,
	error,
	isDisabled,
	isReadOnly,
	value,
	leftIconProps,
	rightIconProps,
	onChange,
	...props
}: ISelectFieldProps<ValueType>) => (
	<VStack {...props}>
		{label && (
			<Text size="md" color="typography_500">
				{label}
			</Text>
		)}
		<Input
			size={size}
			variant="rounded"
			isDisabled={isDisabled}
			isInvalid={!!error}
			isReadOnly={isReadOnly}
			className="bg-primary-0"
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

			<Menu
				placement={placement}
				offset={14}
				disabledKeys={['Settings']}
				trigger={({ ...triggerProps }) => {
					const optionSelected = options.find((e) => e.value === value)

					return renderButton ? (
						<Pressable {...triggerProps} className="px-4">
							{renderButton?.({
								optionSelected,
								isOpen: !!triggerProps?.['aria-expanded'],
							})}
						</Pressable>
					) : (
						<Button {...triggerProps} className="px-4">
							<ButtonText>{optionSelected?.label}</ButtonText>
						</Button>
					)
				}}
				style={{ borderRadius: 24 }}
			>
				{options.map((op, i) => (
					<React.Fragment key={String(op.value)}>
						<MenuItem
							textValue={op.label}
							style={{ borderRadius: 24 }}
							className="hover:dark:bg-background-300 duration-500"
							onPress={() => onChange?.(op)}
						>
							{op.iconProps && <Icon {...op.iconProps} />}
							<MenuItemLabel size="sm">{op.label}</MenuItemLabel>
						</MenuItem>
						{i < options.length - 1 && <MenuSeparator />}
					</React.Fragment>
				))}
			</Menu>

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
