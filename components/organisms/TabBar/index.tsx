import { View, LayoutChangeEvent, useWindowDimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Icon, IconProps } from '../../atoms'
import { TabBarButtom } from './TabBarButton'
import { useState } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NavigationRoute, ParamListBase } from '@react-navigation/native'

interface ITabBarProps extends BottomTabBarProps {
	onRouterChange?: (route: NavigationRoute<ParamListBase, string>) => void
}

export const TabBar = ({
	state,
	descriptors,
	navigation,
	onRouterChange,
}: ITabBarProps) => {
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const activeBackgroundColor = useThemeColor('primary_700')
	const iconColor = useThemeColor('primary_700')
	const [navBarDimensions, setNavBarDimensions] = useState({
		width: 100,
		height: 20,
	})
	const screenDimensions = useWindowDimensions()
	const buttonWidth = navBarDimensions.width / state.routes.length
	const isNavLeft = screenDimensions.width > screenDimensions.height

	const navBarWidth = Math.min(screenDimensions.width * 0.75, 300)
	const navBarMargin = 16

	const tabIcons: Record<string, (p: Omit<IconProps, 'name'>) => JSX.Element> =
		{
			index: (props) => <Icon {...props} name="Home" size={24} />,
			stock: (props) => <Icon {...props} name="Package" size={24} />,
			'ai-agents': (props) => <Icon {...props} name="Bot" size={28} />,
			notification: (props) => <Icon {...props} name="Bell" size={24} />,
			profile: (props) => <Icon {...props} name="UserRound" size={24} />,
		}

	const tabPositionX = useSharedValue(0)
	const animatedTabActiveStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: tabPositionX.value }],
	}))

	const handleLayoutChange = (e: LayoutChangeEvent) => {
		setNavBarDimensions({
			width: e.nativeEvent.layout.width,
			height: e.nativeEvent.layout.height,
		})
	}

	return (
		<View
			onLayout={handleLayoutChange}
			style={{
				flexDirection: 'row',
				position: 'absolute',
				left: '50%',
				transform: [{ translateX: '-50%' }],
				bottom: navBarMargin,
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: backgroundColor,
				width: navBarWidth,
				borderRadius: 100,
				shadowColor: 'black',
				shadowOffset: { width: 0, height: 0 },
				elevation: 6,
				shadowRadius: 10,
				shadowOpacity: 0.2,
				...(isNavLeft
					? {
							top: '50%',
							bottom: 'auto',
							left: buttonWidth,
							marginLeft: navBarMargin,
							transform: [{ rotate: '90deg' }, { translateX: '-50%' }],
							transformOrigin: 'left top',
						}
					: {}),
			}}
		>
			<Animated.View
				style={[
					animatedTabActiveStyle,
					{
						position: 'absolute',
						backgroundColor: activeBackgroundColor,
						borderRadius: 100,
						marginHorizontal: 2,
						width: buttonWidth - 4,
						height: navBarDimensions.height - 4,
					},
				]}
			/>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const isFocused = state.index === index

				return (
					<TabBarButtom
						key={route.name}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarButtonTestID}
						onPress={() => {
							onRouterChange?.(route)
							tabPositionX.value = withSpring(buttonWidth * index, {
								duration: 2000,
							})
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							})

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name, route.params)
							}
						}}
						onLongPress={() =>
							navigation.emit({
								type: 'tabLongPress',
								target: route.key,
							})
						}
						isFocused={isFocused}
						style={{
							height: buttonWidth,
							...(isNavLeft
								? {
										transform: [
											{ scale: 0.95 },
											{
												rotate: '-90deg',
											},
										],
									}
								: {}),
						}}
					>
						{tabIcons?.[route.name]?.({
							color: isFocused ? backgroundColor : iconColor,
						})}
					</TabBarButtom>
				)
			})}
		</View>
	)
}
