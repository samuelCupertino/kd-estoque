import {
	Popover as PopoverUi,
	PopoverBackdrop,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
} from '@/components/ui/popover'
import React, { ComponentProps } from 'react'
import { Pressable } from '@/components/ui/pressable'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Dimensions } from 'react-native'

export interface IPopoverProps
	extends Partial<ComponentProps<typeof PopoverUi>> {
	text?: string
	placement?: ComponentProps<typeof PopoverUi>['placement']
	renderButton: (data: {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
}

const screenWidth = Dimensions.get('window').width

export const Popover = ({
	text,
	size,
	placement = 'top',
	children,
	renderButton,
	...props
}: IPopoverProps) => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<PopoverUi
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			onOpen={() => setIsOpen(true)}
			placement={placement}
			size={size}
			trigger={({ ...triggerProps }) => (
				<Pressable {...triggerProps}>
					<Box className="pointer-events-none w-fit">
						{renderButton?.({
							setIsOpen,
							isOpen: !!triggerProps?.['aria-expanded'],
						})}
					</Box>
				</Pressable>
			)}
			{...props}
		>
			<PopoverBackdrop />
			{(children || text) && (
				<PopoverContent className="bg-background-100 dark:bg-background-200">
					<PopoverArrow className="bg-background-100 dark:bg-background-200" />
					<PopoverBody>
						{children ?? (
							<Text
								size="md"
								className="text-typography-600 dark:text-typography-900"
								style={{ maxWidth: Math.min(screenWidth * 0.9, 400) }}
							>
								{text}
							</Text>
						)}
					</PopoverBody>
				</PopoverContent>
			)}
		</PopoverUi>
	)
}
