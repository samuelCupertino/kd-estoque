import { DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'

import {
	Dimensions,
	Platform,
	SafeAreaView,
	useColorScheme,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Center } from '@/components/ui/center'
import { Image } from '@/components/atoms'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const insets = useSafeAreaInsets()
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		DMSans: require('../assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
	})
	const colorScheme = useColorScheme()
	const isDark = colorScheme === 'dark'
	const backgroundLight = useThemeColor('background_100')
	const [isLoadingResponsive, setIsLoadingResponsive] = useState(
		Platform.OS === 'web',
	)

	const currentTheme: Theme = {
		dark: isDark,
		colors: {
			primary: 'red',
			background: isDark ? 'rgb(0, 0, 0)' : backgroundLight,
			card: isDark ? 'rgb(18, 18, 18)' : 'rgb(242, 242, 242)',
			text: isDark ? 'rgb(229, 229, 231)' : 'rgb(28, 28, 30)',
			border: isDark ? 'rgb(39, 39, 41)' : 'rgb(216, 216, 216)',
			notification: 'rgb(255, 59, 48)',
		},
		fonts: DefaultTheme.fonts,
	}

	useEffect(() => {
		const onChange = () => {
			setIsLoadingResponsive(true)
			setTimeout(() => setIsLoadingResponsive(false), 1)
		}
		if (Platform.OS === 'web') onChange()

		const subscription = Dimensions.addEventListener('change', onChange)
		return () => subscription.remove()
	}, [])

	useEffect(() => {
		async function configureNavigationBar() {
			if (Platform.OS === 'android') {
				await NavigationBar.setBackgroundColorAsync(
					currentTheme.colors.background,
				)
				await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark')
			}
		}
		configureNavigationBar()
	}, [currentTheme.colors.background, isDark])

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync()
	}, [loaded])

	return (
		<GluestackUIProvider mode="system">
			<ThemeProvider value={currentTheme}>
				<StatusBar
					backgroundColor={currentTheme.colors.background}
					style={isDark ? 'light' : 'dark'}
				/>
				<SafeAreaView
					style={{
						flex: 1,
						paddingTop: insets.top,
						backgroundColor: currentTheme.colors.background,
					}}
				>
					{(isLoadingResponsive || !loaded) && (
						<Center className="absolute inset-0 bg-background-100 z-50">
							<Image
								size="xl"
								src="@/assets/images/icon.png"
								alt="Logo do iae"
							/>
						</Center>
					)}
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</SafeAreaView>
			</ThemeProvider>
		</GluestackUIProvider>
	)
}
