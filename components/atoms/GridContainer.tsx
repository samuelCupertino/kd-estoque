import { Box } from '../ui/box'
import { Grid } from '../ui/grid'
import { useWindowDimensions } from 'react-native'
import { ComponentProps, ReactElement } from 'react'
import React from 'react'
import { GridContainerItem } from './GridContainerItem'
import { useBreakpoint, IBreakPoint, isBreakPoint } from '@/hooks/useBreakpoint'

interface IGridContainerChildrenProps {
	isLandscape: boolean
	breakpoint: IBreakPoint
}

type AllowedChild = ReactElement<typeof GridContainerItem>

export interface IGridContainerProps
	extends Omit<ComponentProps<typeof Box>, 'children' | 'style'> {
	cols: number
	gap?: number
	children:
		| ((props: IGridContainerChildrenProps) => AllowedChild[])
		| AllowedChild[]
	style?:
		| IBreakPoint<ComponentProps<typeof Box>['style']>
		| ComponentProps<typeof Box>['style']
}

export const GridContainer = ({
	cols,
	gap = 0,
	children,
	style,
	...props
}: IGridContainerProps) => {
	const screenDimensions = useWindowDimensions()
	const isLandscape = screenDimensions.width > screenDimensions.height
	const breakpoint: IGridContainerChildrenProps['breakpoint'] = useBreakpoint({
		base: 'base',
		sm: 'sm',
		md: 'md',
		lg: 'lg',
		xl: 'xl',
	})
	const styleResponsive = useBreakpoint(
		isBreakPoint(style) ? style : { base: style },
	)

	const overrideElementsProps = (elements: JSX.Element[]) => {
		const newElements = elements
			.map((child, i) =>
				React.cloneElement(child, {
					space: gap,
					index: child.props.index ?? i + 1,
					key: child?.key ?? i + 1,
				}),
			)
			.sort((a, b) => (a.props.index > b.props.index ? 1 : -1))

		return newElements
	}

	return (
		<Box style={styleResponsive} {...props}>
			<Grid
				_extra={{ className: `grid-cols-${cols}` }}
				style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
			>
				{overrideElementsProps(
					typeof children === 'function'
						? children({ isLandscape, breakpoint })
						: children,
				)}
			</Grid>
		</Box>
	)
}
