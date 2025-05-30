import { ComponentProps } from 'react'
import { HStack } from '@/components/ui/hstack'
import { Divider as DividerUi } from '@/components/ui/divider'
import { Heading } from './Heading'
import { twMerge } from 'tailwind-merge'
import React from 'react'

export interface IDividerProps
	extends Omit<ComponentProps<typeof HStack>, 'size'> {
	variant?: 'left' | 'right' | 'center'
	title?: string
}

export const Divider = ({
	variant = 'center',
	title,
	...props
}: IDividerProps) => (
	<HStack {...props} className={twMerge('items-center gap-2', props.className)}>
		{title && (
			<>
				{(variant === 'center' || variant === 'right') && (
					<DividerUi className="flex-1" />
				)}
				<Heading size="sm" color="typography_400">
					{title}
				</Heading>
			</>
		)}
		{(variant === 'center' || variant === 'left') && (
			<DividerUi className="flex-1" />
		)}
	</HStack>
)
