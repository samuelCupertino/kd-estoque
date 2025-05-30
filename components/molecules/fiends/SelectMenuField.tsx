import React, { ComponentProps, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text, WrapInput } from '@/components/atoms'
import {
	Menu,
	MenuItem,
	MenuItemLabel,
	MenuSeparator,
} from '@/components/ui/menu'
import { Pressable } from '@/components/ui/pressable'
import { HStack } from '@/components/ui/hstack'
import { Popover } from '@/components/molecules/Popover'

type ISelectMenuField = ComponentProps<typeof Menu>

export interface ISelectMenuOption<T> {
	value: T
	label: string
	iconProps?: IIconProps
}

export interface ISelectMenuFieldProps<T>
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	value?: T
	options: ISelectMenuOption<T>[]
	placement?: ISelectMenuField['placement']
	renderButton?: (data: {
		optionSelected?: ISelectMenuOption<T>
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
	renderButtonText?: (data: {
		optionSelected?: ISelectMenuOption<T>
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => string
	onChange?: (option: ISelectMenuOption<T>) => void
	size?: ComponentProps<typeof Input>['size']
	placeholder?: string
	helper?: string
	warning?: string
	error?: string
	isDisabled?: boolean
	isReadOnly?: boolean
	isLoading?: boolean
	leftIconProps?: Partial<IIconProps>
	rightIconProps?: Partial<IIconProps>
}

export const SelectMenuField = <T extends string | number>({
	label,
	options,
	placement,
	renderButton,
	renderButtonText,
	size,
	helper,
	warning,
	error,
	isDisabled,
	isReadOnly,
	isLoading,
	value,
	leftIconProps,
	rightIconProps,
	onChange,
	...props
}: ISelectMenuFieldProps<T>) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [optionSelected, setOptionSelected] =
		React.useState<ISelectMenuOption<T>>()

	useEffect(() => {
		const newOptionSelected = options.find((e) => e.value === value)
		setOptionSelected(newOptionSelected)
	}, [options, value])

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
				<WrapInput
					styled={!renderButton}
					leftIconProps={leftIconProps}
					rightIconProps={rightIconProps}
					isDisabled={isDisabled}
					isReadOnly={isReadOnly}
					size={size}
				>
					<Menu
						placement={placement}
						offset={14}
						disabledKeys={['Settings']}
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						className="max-w-[600px]"
						trigger={({ ...triggerProps }) =>
							renderButton ? (
								<Pressable {...triggerProps}>
									{renderButton?.({
										optionSelected,
										setIsOpen,
										isOpen: !!triggerProps?.['aria-expanded'],
									})}
								</Pressable>
							) : (
								<Pressable {...triggerProps}>
									<Pressable onPress={() => setIsOpen(true)}>
										<HStack className="items-center px-4 gap-1">
											<Text size="sm">
												{renderButtonText?.({
													optionSelected,
													setIsOpen,
													isOpen: !!triggerProps?.['aria-expanded'],
												}) ?? optionSelected?.label}
											</Text>
											<Icon
												name={isOpen ? 'ChevronUp' : 'ChevronDown'}
												color="typography_400"
												className="-mr-2"
											/>
										</HStack>
									</Pressable>
								</Pressable>
							)
						}
						style={{ borderRadius: 24 }}
					>
						{options.map((op, i) => (
							<React.Fragment key={String(op.value)}>
								<MenuItem
									textValue={op.label}
									style={{ borderRadius: 24 }}
									className="hover:dark:bg-background-300 duration-500"
									onPress={() => {
										setOptionSelected(op)
										onChange?.(op)
									}}
								>
									{op.iconProps && <Icon {...op.iconProps} />}
									<MenuItemLabel size="md">{op.label}</MenuItemLabel>
								</MenuItem>
								{i < options.length - 1 && (
									<MenuSeparator style={{ margin: 4 }} />
								)}
							</React.Fragment>
						))}
					</Menu>
				</WrapInput>
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
	)
}
