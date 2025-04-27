import { View, LayoutChangeEvent, useWindowDimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { ButtonCircle, Icon, IIconProps } from '@/components/atoms'
import { TabBarButtom } from './TabBarButton'
import { useState, useEffect } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NavigationRoute, ParamListBase } from '@react-navigation/native'
import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { Center } from '@/components/ui/center'

const LogoPng = require('@/assets/images/icon.png')

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
	const [isLoadingResponsive, setIsLoadingResponsive] = useState(true)
	const [navBarDimensions, setNavBarDimensions] = useState({
		width: 100,
		height: 20,
	})
	const screenDimensions = useWindowDimensions()
	const buttonWidth = navBarDimensions.width / state.routes.length
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

	useEffect(() => {
		const currentRoute = state.routes[state.index]
		const currentRouteName = currentRoute.name
		const routeIndex = state.routes.findIndex(
			(route) => route.name === currentRouteName,
		)
		tabPositionX.value = withSpring(buttonWidth * routeIndex, {
			duration: 2000,
		})
	}, [state.index, buttonWidth, tabPositionX, state.routes])

	useEffect(() => {
		setIsLoadingResponsive(true)
		setTimeout(() => setIsLoadingResponsive(false), 100)
	}, [screenDimensions])

	if (isLoadingResponsive) {
		return (
			<Center className="absolute inset-0 bg-background-100">
				<Image
					className="w-36 h-36 rounded-xl mx-auto"
					source={LogoPng}
					alt="Imagem do logo"
				/>
			</Center>
		)
	}

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
					source={LogoPng}
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
