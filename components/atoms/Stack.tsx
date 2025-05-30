import { ComponentProps } from 'react'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Divider } from '@/components/ui/divider'
import React from 'react'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

export interface IStackProps extends ComponentProps<typeof VStack> {
	dir?: IBreakPoint<'vertical' | 'horizontal'> | 'vertical' | 'horizontal'
	children: JSX.Element | JSX.Element[]
	withDivider?: boolean
	dividerProps?: ComponentProps<typeof Divider>
}

export const Stack = ({
	dir = 'vertical',
	withDivider = false,
	children,
	dividerProps,
	...props
}: IStackProps) => {
	const dirResp = useBreakpoint(isBreakPoint(dir) ? dir : { base: dir })
	const StackUI = dirResp === 'vertical' ? VStack : HStack
	const childrensArray = Array.isArray(children) ? [...children] : [children]
	const newChildrens = childrensArray.reduce((acc, child, i) => {
		const newChilds =
			(withDivider || dividerProps) && i !== 0
				? [<Divider key={acc.length} {...dividerProps} />, child]
				: [child]

		return [...acc, ...newChilds]
	}, [] as JSX.Element[])

	return <StackUI {...props}>{newChildrens}</StackUI>
}
