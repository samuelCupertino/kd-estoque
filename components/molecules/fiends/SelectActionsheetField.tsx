import React, { ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import {
	Icon,
	IIconProps,
	Text,
	Button,
	WrapInput,
	Skeleton,
} from '@/components/atoms'
import { Menu, MenuSeparator } from '@/components/ui/menu'
import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ActionsheetItem,
	ActionsheetItemText,
} from '@/components/ui/actionsheet'
import { HStack } from '@/components/ui/hstack'
import { Popover } from '@/components/molecules/Popover'

type ISelectActionsheetField = ComponentProps<typeof Menu>

interface Option<T> {
	value: T
	label: string
	iconProps?: IIconProps
}

export interface ISelectActionsheetFieldProps<T>
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	value?: T
	options: Option<T>[]
	placement?: ISelectActionsheetField['placement']
	renderButton?: (data: {
		optionSelected?: Option<T>
		setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
		isOpen: boolean
	}) => JSX.Element
	onChange?: (option: Option<T>) => void
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
	styled?: boolean
}

export const SelectActionsheetField = <T extends string | number>({
	label,
	options,
	renderButton,
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
	styled = true,
	onChange,
	...props
}: ISelectActionsheetFieldProps<T>) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const optionSelected = options.find((e) => e.value === value)

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
					styled={styled}
					leftIconProps={leftIconProps}
					rightIconProps={rightIconProps}
					isDisabled={isDisabled}
					isReadOnly={isReadOnly}
					size={size}
				>
					<>
						{renderButton?.({ isOpen: isOpen, setIsOpen, optionSelected }) ?? (
							<Button className="px-4" onPress={() => setIsOpen(!isOpen)}>
								{optionSelected?.label}
							</Button>
						)}
						<Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
							<ActionsheetBackdrop />
							<ActionsheetContent>
								<ActionsheetDragIndicatorWrapper>
									<ActionsheetDragIndicator />
								</ActionsheetDragIndicatorWrapper>

								{options.map((op, i) => (
									<React.Fragment key={String(op.value)}>
										<ActionsheetItem
											style={{ borderRadius: 24 }}
											className="hover:dark:bg-background-300 duration-500 py-4 my-2"
											onPress={() => {
												onChange?.(op)
												setIsOpen(false)
											}}
										>
											{op.iconProps && <Icon {...op.iconProps} />}
											<ActionsheetItemText>
												<Text size="lg" className="py-6">
													{op.label}
												</Text>
											</ActionsheetItemText>
										</ActionsheetItem>
										{i < options.length - 1 && (
											<MenuSeparator style={{ margin: 4 }} />
										)}
									</React.Fragment>
								))}
							</ActionsheetContent>
						</Actionsheet>
					</>
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
