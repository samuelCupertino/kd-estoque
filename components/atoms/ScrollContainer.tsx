/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'
import { Box } from '@/components/ui/box'
import { ComponentProps, useEffect, useRef, useState } from 'react'
import {
	useBreakpoint,
	IBreakpointKey,
	IBreakPoint,
	isBreakPoint,
} from '@/hooks/useBreakpoint'

interface IScrollContainerChildrenProps {
	isLandscape: boolean
	breakpoint: IBreakpointKey
	width: number
	height: number
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
	const [size, setSize] = useState({ width: 0, height: 0 })
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
				onLayout={(event) => {
					const { width, height } = event.nativeEvent.layout
					setSize({ width, height })
				}}
				showsVerticalScrollIndicator={false}
				bounces={false}
				overScrollMode="never"
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
						? children({ breakpoint, isLandscape, ...size })
						: children}
				</Box>
			</ScrollView>
		</Box>
	)
}
