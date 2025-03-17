/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import {
	lightRGBs,
	darkRGBs,
} from '@/components/ui/gluestack-ui-provider/config'

type FormatColorKey<T extends string> = T extends `--color-${infer Rest}`
	? Rest extends `${infer Prefix}-${infer Suffix}`
		? `${Prefix}_${Suffix}` // Transforma "primary-400" -> "primary_400"
		: Rest
	: T

export type LightColors = {
	[K in keyof typeof lightRGBs as FormatColorKey<K & string>]: string
}

export type DarkColors = {
	[K in keyof typeof darkRGBs as FormatColorKey<K & string>]: string
}

const formatRGBsToColors = (colors: Record<string, string>) => {
	const colorsArray = Object.entries(colors).map(([key, value]) => [
		key.replace('--color-', '').replaceAll('-', '_'),
		`rgb(${value})`,
	])
	const colorsObject = Object.fromEntries(colorsArray)

	return colorsObject
}

export const Colors: { light: LightColors; dark: DarkColors } = {
	light: formatRGBsToColors(lightRGBs),
	dark: formatRGBsToColors(darkRGBs),
}
