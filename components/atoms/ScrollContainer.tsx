import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import {
	useBreakpoint,
	IBreakpointKey,
	IBreakPoint,
	isBreakPoint,
} from '@/hooks/useBreakpoint'

interface IScrollContainerChildrenProps {
	isLandscape: boolean
	breakpoint: IBreakpointKey
}

export interface IScrollContainerProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	children:
		| JSX.Element
		| JSX.Element[]
		| ((props: IScrollContainerChildrenProps) => JSX.Element | JSX.Element[])
		| ((props: IScrollContainerChildrenProps) => JSX.Element | JSX.Element[])
	scrollViewProps?: ScrollViewProps
	borderRadius?: number
	innerMargin?: IBreakPoint<number> | number
	paddingBottom?: number
}

export const ScrollContainer = ({
	children,
	scrollViewProps,
	borderRadius,
	innerMargin,
	paddingBottom,
	...props
}: IScrollContainerProps) => {
	const innerMarginResponsive = useBreakpoint(
		isBreakPoint(innerMargin) ? innerMargin : { base: innerMargin },
	)
	const screenDimensions = useWindowDimensions()
	const isLandscape = screenDimensions.width > screenDimensions.height
	const breakpoint: IScrollContainerChildrenProps['breakpoint'] = useBreakpoint(
		{
			base: 'base',
			sm: 'sm',
			md: 'md',
			lg: 'lg',
			xl: 'xl',
		},
	)

	return (
		<Box
			{...props}
			style={{
				borderRadius,
				overflow: 'hidden',
				...(props.style as object),
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false} {...scrollViewProps}>
				<Box style={{ margin: innerMarginResponsive, paddingBottom }}>
					{typeof children === 'function'
						? children({ breakpoint, isLandscape })
						: children}
				</Box>
			</ScrollView>
		</Box>
	)
}
