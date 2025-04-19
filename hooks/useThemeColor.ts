/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import resolveConfig from 'tailwindcss/resolveConfig'
import * as tailwindConfig from 'tailwind.config'
import { Config } from 'tailwindcss'
const twFullConfig = resolveConfig(tailwindConfig as Config)

import { Colors, LightColors, DarkColors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { DefaultColors } from 'tailwindcss/types/generated/colors'

type MainColors = keyof DefaultColors // Tipo auxiliar para extrair as chaves das cores principais
type ColorVariants<T> = T extends keyof DefaultColors // Tipo auxiliar para extrair as variantes de uma cor principal
	? DefaultColors[T] extends string
		? T // Se for uma string direta, retorna a chave principal
		: DefaultColors[T] extends Record<infer K, any>
			? `${T}_${K & string}` // Se for um objeto, retorna as variantes concatenadas
			: never
	: never
type AllColors = ColorVariants<MainColors> // Tipo que une todas as cores e suas variantes

export type IColorNames = keyof DefaultColors
type IColorScales =
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'
	| '950'

export type IThemeColor =
	| (keyof LightColors & keyof DarkColors)
	| { light: keyof LightColors; dark: keyof DarkColors }
	| AllColors

const extractThemeColor = (color: IThemeColor, theme: 'light' | 'dark') => {
	const colorKey = typeof color === 'object' ? color[theme] : color
	const curColors = Colors[theme] as Record<string, string>

	if (curColors[colorKey]) return curColors[colorKey]

	const [colorName, colorScale] = colorKey.split('_') as [
		IColorNames,
		IColorScales,
	]

	return twFullConfig.theme.colors?.[colorName]?.[colorScale]
}

export const isThemeColor = (value: any): value is IThemeColor => {
	const isTailwindColor = (value: string): boolean => {
		const [color, scale] = value.split('_') as [IColorNames, IColorScales]
		return !!(
			twFullConfig.theme.colors?.[color] &&
			typeof twFullConfig.theme.colors[color] === 'object' &&
			scale in (twFullConfig.theme.colors[color] as Record<string, string>)
		)
	}

	// Caso seja string e exista em ambas as paletas customizadas
	if (typeof value === 'string') {
		return (
			(value in Colors.light && value in Colors.dark) || isTailwindColor(value)
		)
	}

	// Caso seja um objeto { light, dark }
	if (
		typeof value === 'object' &&
		value !== null &&
		'light' in value &&
		'dark' in value
	) {
		const lightValid =
			value.light in Colors.light || isTailwindColor(value.light)
		const darkValid = value.dark in Colors.dark || isTailwindColor(value.dark)
		return lightValid && darkValid
	}

	return false
}

export const useThemeColor = <T extends IThemeColor | IThemeColor[]>(
	colorName: T,
	config?: {
		forceTheme?: 'light' | 'dark'
		falback: T extends IThemeColor[] ? string[] : string
	},
): T extends IThemeColor[] ? string[] : string => {
	const colorTheme = useColorScheme()
	const theme = config?.forceTheme ?? colorTheme ?? 'light'

	const color = Array.isArray(colorName)
		? colorName.map((color) => extractThemeColor(color, theme))
		: extractThemeColor(colorName, theme)

	return color as T extends IThemeColor[] ? string[] : string
}

export const rgbToHex = (rgbStr: string) => {
	const [r, g, b] = rgbStr
		.replace(/^rgb\(|\)$/g, '')
		.trim()
		.split(/\s+/)
		.map(Number)

	return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

export const getThemeColorBase = (themeColor: string) => {
	const baseColor = themeColor.toString().replace(/(\D+)[-_]\d+/, '$1')
	return baseColor
}

export const getThemeColorLevel = (themeColor: string) => {
	const baseColor = themeColor.toString().replace(/\D+(\d+)/, '$1')
	return baseColor
}

interface IEditThemeColor {
	themeColor?: any
	separator?: string
	color?: string
	level?: number | string
}

export const editThemeColor = ({
	themeColor = 'primary_100',
	separator,
	color,
	level,
}: IEditThemeColor) => {
	const baseColor = themeColor.toString().replace(/(\D+)[-_]\d+/, '$1')
	const baseLevel = themeColor.toString().replace(/\D+(\d+)/, '$1')
	const baseSeparator = themeColor.toString().replace(/.+([-_]).+/, '$1')

	return (
		(color ?? baseColor) + (separator ?? baseSeparator) + (level ?? baseLevel)
	)
}
