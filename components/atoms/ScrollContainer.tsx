import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useBreakpoint, IBreakpointKey } from '@/hooks/useBreakpoint'

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
	innerMargin?: number
}

export const ScrollContainer = ({
	children,
	scrollViewProps,
	borderRadius,
	innerMargin,
	...props
}: IScrollContainerProps) => {
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
				<Box style={{ margin: innerMargin }}>
					{typeof children === 'function'
						? children({ breakpoint, isLandscape })
						: children}
				</Box>
			</ScrollView>
		</Box>
	)
}
