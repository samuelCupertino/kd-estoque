/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, LightColors, DarkColors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export const useThemeColor = (
	color:
		| (keyof LightColors & keyof DarkColors)
		| { light: keyof LightColors; dark: keyof DarkColors },
	forceTheme?: 'light' | 'dark',
) => {
	const colorTheme = useColorScheme()
	const theme = forceTheme ?? colorTheme ?? 'light'
	const colorKey = typeof color === 'object' ? color[theme] : color
	return Colors[theme][colorKey]
}
