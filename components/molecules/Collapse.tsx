import { twMerge } from 'tailwind-merge'
import { Icon, Text } from '../atoms'
import { Box } from '../ui/box'
import { HStack } from '../ui/hstack'

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContentText,
	AccordionContent,
} from '@/components/ui/accordion'
import React, { ComponentProps, useId, useState } from 'react'

interface ICollapseProps
	extends Omit<ComponentProps<typeof Accordion>, 'children'> {
	visible: ((ev: { isOpen: boolean }) => JSX.Element) | JSX.Element | string
	visibleProps?: ComponentProps<typeof HStack>
	chevronIcon?: 'left' | 'right' | 'none'
	children: ((ev: { isOpen: boolean }) => JSX.Element) | JSX.Element | string
}

export const Collapse = ({
	children,
	visible,
	visibleProps,
	chevronIcon = 'right',
	className,
	...props
}: ICollapseProps) => {
	const uuId = useId()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Accordion variant="unfilled" className={className} {...props}>
			<AccordionItem value={uuId}>
				<AccordionTrigger className="p-0">
					{({ isExpanded }) => {
						setIsOpen(isExpanded)

						return (
							<HStack
								{...visibleProps}
								className={twMerge('items-end', visibleProps?.className)}
							>
								{chevronIcon === 'left' && (
									<Icon
										name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
										size="xs"
										color="typography_400"
										className="min-w-4"
									/>
								)}
								<Box className="w-fit">
									{typeof visible === 'string' ? (
										<Text>{visible}</Text>
									) : typeof visible === 'function' ? (
										visible({ isOpen })
									) : (
										visible
									)}
								</Box>
								{chevronIcon === 'right' && (
									<Icon
										name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
										size="xs"
										color="typography_400"
										className="min-w-4"
									/>
								)}
							</HStack>
						)
					}}
				</AccordionTrigger>
				<AccordionContent className="py-0">
					{typeof children === 'string' ? (
						<AccordionContentText>{children}</AccordionContentText>
					) : typeof children === 'function' ? (
						children({ isOpen })
					) : (
						children
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
