import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'

export interface IScrollContainerProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	children:
		| JSX.Element
		| JSX.Element[]
		| ((isLandscape: boolean) => JSX.Element | JSX.Element[])
		| ((isLandscape: boolean) => JSX.Element | JSX.Element[])
	scrollViewProps?: ScrollViewProps
}

export const ScrollContainer = ({
	children,
	scrollViewProps,
	...props
}: IScrollContainerProps) => {
	const screenDimensions = useWindowDimensions()
	const isLandscape = screenDimensions.width > screenDimensions.height

	return (
		<Box
			{...props}
			style={{
				borderRadius: 24,
				overflow: 'hidden',
				...(props.style as object),
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false} {...scrollViewProps}>
				{typeof children === 'function' ? children(isLandscape) : children}
			</ScrollView>
		</Box>
	)
}
