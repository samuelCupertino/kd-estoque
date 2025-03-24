import { Box } from '../ui/box'
import { GridItem } from '../ui/grid'
import {
	findNodeHandle,
	LayoutChangeEvent,
	UIManager,
	useWindowDimensions,
} from 'react-native'
import { ComponentProps, useEffect, useRef, useState } from 'react'
import React from 'react'
import { useBreakpoint, IBreakPoint, isBreakPoint } from '@/hooks/useBreakpoint'

interface IGridContainerItemChildrenProps {
	width: number
	height: number
}

export interface IGridContainerItemProps
	extends Omit<ComponentProps<typeof GridItem>, '_extra' | 'children'> {
	cols: IBreakPoint<number> | number
	rows: IBreakPoint<number> | number
	borderRadius?: number
	space?: number
	children:
		| ((props: IGridContainerItemChildrenProps) => JSX.Element)
		| JSX.Element
}

export const GridContainerItem = ({
	cols,
	rows,
	space = 0,
	borderRadius,
	children,
	...props
}: IGridContainerItemProps) => {
	const gridItemRef = useRef(null)
	const screenDimensions = useWindowDimensions()
	const [size, setSize] = useState({ width: 0, height: 0 })
	const colsResponsive: number = useBreakpoint(
		isBreakPoint(cols) ? cols : { base: cols },
	)
	const rowsResponsive: number = useBreakpoint(
		isBreakPoint(rows) ? rows : { base: rows },
	)
	const spaceResponsive: number = useBreakpoint(
		isBreakPoint(space) ? space : { base: space },
	)
	const borderRadiusResponsive: number = useBreakpoint(
		isBreakPoint(borderRadius) ? borderRadius : { base: borderRadius },
	)

	useEffect(() => {
		if (!gridItemRef.current) return
		const nodeHandle = findNodeHandle(gridItemRef.current)
		if (!nodeHandle) return

		UIManager.measure(nodeHandle, (_x, _y, width, height) => {
			setSize({ width, height })
		})
	}, [screenDimensions])

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setSize({ width, height })
	}

	return (
		<GridItem
			ref={gridItemRef}
			onLayout={handleLayout}
			className="items-center justify-center"
			_extra={{ className: `col-span-${colsResponsive}` }}
			{...props}
			style={
				{
					padding: spaceResponsive,
					height: '100%',
					width: '100%',
					gridColumn: `span ${colsResponsive}`,
					aspectRatio: colsResponsive / rowsResponsive,
				} as object
			}
		>
			<Box className="w-full h-full">
				<Box
					className="absolute overflow-hidden w-full h-full"
					style={{ borderRadius: borderRadiusResponsive }}
				>
					{typeof children === 'function'
						? children({
								width: size.width - spaceResponsive * 2,
								height: size.height - spaceResponsive * 2,
							})
						: children}
				</Box>
			</Box>
		</GridItem>
	)
}
