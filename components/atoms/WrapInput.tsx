import React, { ComponentProps } from 'react'
import { Input, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps } from '@/components/atoms/Icon'

export interface IWrapInputProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	size?: ComponentProps<typeof Input>['size']
	error?: string
	children?: JSX.Element
	isDisabled?: boolean
	isReadOnly?: boolean
	leftIconProps?: Partial<IIconProps>
	rightIconProps?: Partial<IIconProps>
	styled?: boolean
}

export const WrapInput = ({
	children,
	size,
	error,
	isDisabled,
	isReadOnly,
	leftIconProps,
	rightIconProps,
	styled = true,
	...props
}: IWrapInputProps) => {
	if (!styled) return children

	return (
		<Input
			size={size}
			variant="rounded"
			isDisabled={isDisabled}
			isInvalid={!!error}
			isReadOnly={isReadOnly}
			className="bg-primary-0"
			{...props}
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

			{children}

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
	)
}
