import { View, LayoutChangeEvent, useWindowDimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { ButtonCircle, Icon, IIconProps } from '@/components/atoms'
import { TabBarButtom } from './TabBarButton'
import { useState, useEffect, JSX, useCallback } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NavigationRoute, ParamListBase } from '@react-navigation/native'
import { Box } from '@/components/ui/box'
import { Image } from '@/components/atoms'

export interface ITabBarProps extends BottomTabBarProps {
	onRouterChange?: (route: NavigationRoute<ParamListBase, string>) => void
}

export const TabBar = ({
	state,
	descriptors,
	navigation,
	onRouterChange,
}: ITabBarProps) => {
	const [selectedIndex, setSelectedIndex] = useState(state.index)
	const baseRouteNames = [
		...new Set(state.routeNames.map((e) => e.split('/')[0])),
	]
	const baseRoutes = state.routes.filter((route) =>
		baseRouteNames.some((name) => [name, `${name}/index`].includes(route.name)),
	)

	const currentRouteName = state.routeNames[selectedIndex].split('/')[0]
	const currentRouteIndex = baseRoutes[selectedIndex]
		? selectedIndex
		: baseRouteNames.findIndex((name) => name === currentRouteName)

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
	const buttonWidth = navBarDimensions.width / baseRoutes.length
	const isNavLeft = screenDimensions.width > screenDimensions.height

	const navBarWidth = Math.min(screenDimensions.width * 0.75, 300)
	const navBarMargin = 14
	const isNavPlus = isNavLeft && navBarWidth < screenDimensions.height * 0.5

	const tabIcons: Record<string, (p: Omit<IIconProps, 'name'>) => JSX.Element> =
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

	const animateNavigation = useCallback(
		(index: number) => {
			tabPositionX.value = withSpring(buttonWidth * index, {
				duration: 1000,
			})
			setSelectedIndex(index)
		},
		[buttonWidth, tabPositionX],
	)

	useEffect(
		() => animateNavigation(currentRouteIndex),
		[animateNavigation, currentRouteIndex],
	)

	return (
		<Box
			className="absolute top-auto w-full"
			style={{
				flexDirection: isNavLeft ? 'column' : 'row',
				justifyContent: isNavPlus ? 'space-between' : 'center',
				bottom: navBarMargin,
				...(isNavLeft
					? {
							maxWidth: 64,
							paddingBlock: 16,
							top: 0,
							bottom: 0,
							left: navBarMargin,
						}
					: {}),
			}}
		>
			{isNavPlus && (
				<Image
					className="w-14 h-14 rounded-xl mx-auto opacity-75"
					src="@/assets/images/icon.png"
					alt="Imagem do produto"
				/>
			)}

			<View
				onLayout={handleLayoutChange}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor,
					width: navBarWidth,
					borderRadius: 100,
					shadowColor: 'black',
					shadowOffset: { width: 0, height: 0 },
					elevation: 6,
					shadowRadius: 10,
					shadowOpacity: 0.2,
					...(isNavLeft
						? {
								left: navBarMargin * 2.3,
								transform: [{ rotate: '90deg' }, { translateX: '-50%' }],
								transformOrigin: 'left center',
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
				{baseRoutes.map((route, index) => {
					const { options } = descriptors[route.key]
					const isFocused = currentRouteIndex === index

					return (
						<TabBarButtom
							key={route.name}
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarButtonTestID}
							onPress={() => {
								animateNavigation(index)

								setTimeout(() => {
									onRouterChange?.(route)
									const event = navigation.emit({
										type: 'tabPress',
										target: route.key,
										canPreventDefault: true,
									})

									if (!event.defaultPrevented) {
										navigation.navigate(route.name, route.params)
									}
								}, 0)
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
									? { transform: [{ scale: 0.95 }, { rotate: '-90deg' }] }
									: {}),
							}}
						>
							{tabIcons?.[route.name.split('/')[0]]?.({
								color: isFocused ? backgroundColor : iconColor,
							})}
						</TabBarButtom>
					)
				})}
			</View>

			{isNavPlus && (
				<ButtonCircle
					size="lg"
					iconProps={{
						name: 'LogOut',
						color: 'primary_500',
					}}
					className="mx-auto bg-background-0 scale-90"
				/>
			)}
		</Box>
	)
}
