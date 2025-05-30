import React, { ComponentProps } from 'react'
import { Box } from '@/components/ui/box'
import { Animated, Easing } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface ISkeletonProps extends ComponentProps<typeof Box> {
	isLoading?: boolean
	children: JSX.Element
	borderRadius?: number
}

export const Skeleton = ({
	isLoading,
	children,
	borderRadius = 24,
	...props
}: ISkeletonProps) => {
	const backgroundColor = useThemeColor('background_50')
	const animatedBgColor = useThemeColor('background_400')
	const opacity = new Animated.Value(0.3)

	Animated.loop(
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
				easing: Easing.inOut(Easing.ease),
			}),
			Animated.timing(opacity, {
				toValue: 0.3,
				duration: 800,
				useNativeDriver: true,
				easing: Easing.inOut(Easing.ease),
			}),
		]),
	).start()

	return (
		<Box {...props}>
			{children}
			{isLoading && (
				<Box
					className="absolute inset-0"
					style={{ borderRadius, backgroundColor }}
				>
					<Animated.View
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: animatedBgColor,
							opacity,
							borderRadius,
						}}
					/>
				</Box>
			)}
		</Box>
	)
}
