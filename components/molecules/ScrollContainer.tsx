import { ScrollView, ScrollViewProps, useWindowDimensions } from 'react-native'

interface IScrollContainerProps extends Omit<ScrollViewProps, 'children'> {
	children:
		| JSX.Element
		| JSX.Element[]
		| ((isLandscape: boolean) => JSX.Element | JSX.Element[])
		| ((isLandscape: boolean) => JSX.Element | JSX.Element[])
}

export const ScrollContainer = ({
	children,
	...props
}: IScrollContainerProps) => {
	const screenDimensions = useWindowDimensions()
	const isLandscape = screenDimensions.width > screenDimensions.height

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				padding: 8,
				...(isLandscape ? { paddingLeft: 92 } : { paddingBottom: 92 }),
				...props,
			}}
			showsVerticalScrollIndicator={false}
		>
			{typeof children === 'function' ? children(isLandscape) : children}
		</ScrollView>
	)
}
