import React, { ComponentProps, useEffect, useRef } from 'react'
import { Box } from '@/components/ui/box'
import { twMerge } from 'tailwind-merge'
import { IconCircle } from '@/components/atoms'
import { Animated, Easing } from 'react-native'

export interface AnimatedCoinProps extends ComponentProps<typeof Box> {
	status?: 'rotating' | 'jumping'
}

export const AnimatedCoin: React.FC<AnimatedCoinProps> = ({
	status,
	className,
	style,
	...props
}) => {
	const rotateAnim = useRef(new Animated.Value(0)).current
	const jumpAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (status === 'rotating') {
			Animated.loop(
				Animated.timing(rotateAnim, {
					toValue: 3,
					duration: 4000,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			).start()
		} else {
			rotateAnim.stopAnimation()
			rotateAnim.setValue(0)
		}
	}, [status, rotateAnim])

	useEffect(() => {
		if (status === 'jumping') {
			Animated.loop(
				Animated.sequence([
					Animated.timing(jumpAnim, {
						toValue: -20,
						duration: 300,
						easing: Easing.inOut(Easing.quad),
						useNativeDriver: true,
					}),
					Animated.timing(jumpAnim, {
						toValue: 0,
						duration: 300,
						easing: Easing.inOut(Easing.quad),
						useNativeDriver: true,
					}),
				]),
			).start()
		} else {
			jumpAnim.stopAnimation()
			jumpAnim.setValue(0)
		}
	}, [status, jumpAnim])

	const rotateY = rotateAnim.interpolate({
		inputRange: [0, 3],
		outputRange: ['0deg', '1080deg'],
	})

	return (
		<Box
			className={twMerge('items-center justify-center', className)}
			style={{ ...(style as object) }}
			{...props}
		>
			<Animated.View
				style={{ transform: [{ rotateY }, { translateY: jumpAnim }] }}
			>
				<IconCircle
					size={80}
					name="DollarSign"
					color="yellow_500"
					containerProps={{ className: 'border-4 border-yellow-500' }}
				/>
			</Animated.View>
		</Box>
	)
}
