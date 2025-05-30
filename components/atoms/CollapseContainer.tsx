import React, { useRef, useState, useEffect } from 'react'
import { Animated, LayoutChangeEvent, Platform } from 'react-native'
import { Box } from '@/components/ui/box'
import { twMerge } from 'tailwind-merge'

interface CollapseContainerProps {
	isOpen: boolean
	children: React.ReactNode
	duration?: number
	excludeGap?: number
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({
	isOpen,
	children,
	duration = 300,
	excludeGap = 0,
}) => {
	const [contentHeight, setContentHeight] = useState(0)
	const animatedHeight = useRef(new Animated.Value(0)).current
	const animatedOpacity = useRef(new Animated.Value(0)).current

	const handleLayout = (event: LayoutChangeEvent) => {
		const height = event.nativeEvent.layout.height
		setContentHeight(height)
	}

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animatedHeight, {
				toValue: isOpen ? contentHeight : 0,
				duration,
				useNativeDriver: false,
			}),
			Animated.timing(animatedOpacity, {
				toValue: isOpen ? 1 : 0,
				duration,
				useNativeDriver: false,
			}),
		]).start()
	}, [isOpen, contentHeight, duration, animatedHeight, animatedOpacity])

	return (
		<Box
			className={twMerge(
				excludeGap && !isOpen && `-mt-${excludeGap}`,
				Platform.OS === 'android' && excludeGap && !isOpen && 'absolute',
			)}
		>
			<Animated.View style={{ overflow: 'hidden', height: animatedHeight }}>
				<Animated.View
					style={{
						position: 'absolute',
						width: '100%',
						opacity: animatedOpacity,
					}}
					onLayout={handleLayout}
				>
					{children}
				</Animated.View>
			</Animated.View>
		</Box>
	)
}
