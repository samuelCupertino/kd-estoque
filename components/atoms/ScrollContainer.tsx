/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'
import { Box } from '@/components/ui/box'
import { ComponentProps, useEffect, useRef } from 'react'
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
	paddingTop?: number
	paddingBottom?: number
	scrollToEnd?: boolean
	autoScrollToEnd?: boolean
}

export const ScrollContainer = ({
	children,
	scrollViewProps,
	borderRadius,
	innerMargin,
	paddingTop,
	paddingBottom,
	scrollToEnd = false,
	autoScrollToEnd = false,
	...props
}: IScrollContainerProps) => {
	const scrollViewRef = useRef(null)
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

	useEffect(() => {
		if (scrollToEnd)
			(scrollViewRef.current as any)?.scrollToEnd({ animated: false })
	}, [scrollToEnd])

	return (
		<Box
			{...props}
			style={{
				borderRadius,
				overflow: 'hidden',
				...(props.style as object),
			}}
		>
			<ScrollView
				ref={scrollViewRef}
				showsVerticalScrollIndicator={false}
				onContentSizeChange={() => {
					if (autoScrollToEnd)
						(scrollViewRef.current as any)?.scrollToEnd?.({ animated: true })
				}}
				{...scrollViewProps}
			>
				<Box
					style={{
						margin: innerMarginResponsive,
						paddingTop,
						paddingBottom,
					}}
				>
					{typeof children === 'function'
						? children({ breakpoint, isLandscape })
						: children}
				</Box>
			</ScrollView>
		</Box>
	)
}
