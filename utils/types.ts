/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import resolveConfig from 'tailwindcss/resolveConfig'
import * as tailwindConfig from 'tailwind.config'

const TailwindTheme = resolveConfig(tailwindConfig as any)
const screenSize = TailwindTheme.theme.screens

export type breakpoints = keyof typeof screenSize | 'default'

export type BreakPointValue<T = unknown> = Partial<Record<breakpoints, T>>

export const isBreakPointValue = <T>(
	value: any,
): value is BreakPointValue<T> => {
	if (typeof value !== 'object' || value === null) return false

	const validBreakpoints: breakpoints[] = [
		'default',
		'sm',
		'md',
		'lg',
		'xl',
		'2xl',
	]

	return Object.keys(value).some((key) =>
		validBreakpoints.includes(key as breakpoints),
	)
}
