import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { Icon } from '@/components/atoms'
import { useEffect } from 'react'
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useThemeColor } from '@/hooks/useThemeColor'

interface ITabBarButtomProps extends PressableProps {
	isFocused?: boolean
	children: JSX.Element
	style?: ViewStyle
}

export const TabBarButtom = ({
	children,
	isFocused,
	style,
	...props
}: ITabBarButtomProps) => {
	const scale = useSharedValue(0)
	const iconColor = useThemeColor('primary_200')

	useEffect(() => {
		if (isFocused === undefined) return
		scale.value = withSpring(+isFocused, { duration: 350 })
	}, [isFocused, scale])

	const animatedIconStyle = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.25]) }],
	}))

	const animatedDetailsStyle = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(scale.value, [0, 1], [0, 1.25]) }],
		opacity: scale.value ? 1 : 0,
	}))

	return (
		<Pressable
			{...props}
			style={{
				position: 'relative',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				...style,
			}}
		>
			<Animated.View style={animatedIconStyle}>{children}</Animated.View>

			<Animated.View
				style={[animatedDetailsStyle, { position: 'absolute', inset: 0 }]}
			>
				<Icon
					name="SparkleIcon"
					size={6}
					style={{
						position: 'absolute',
						left: '25%',
						top: '25%',
						color: iconColor,
						borderRadius: 100,
					}}
				/>
				<Icon
					name="SparkleIcon"
					size={6}
					style={{
						position: 'absolute',
						right: '25%',
						bottom: '25%',
						color: iconColor,
						borderRadius: 100,
					}}
				/>
			</Animated.View>
		</Pressable>
	)
}
