/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from '@/components/ui/utils/use-media-query'

export const breakpointToPx = {
	base: 0,
	'2xs': 340,
	xs: 480,
	sm: 640,
	md: 768,
	lg: 992,
	xl: 1280,
	'2xl': 1536,
	'3xl': 1792,
}

export type IBreakpointKey = keyof typeof breakpointToPx

export type IBreakPoint<T = any> = Partial<Record<IBreakpointKey, T>>

export const isBreakPoint = <T>(value: any): value is IBreakPoint<T> => {
	if (typeof value !== 'object' || value === null) return false

	const validBreakpoints = Object.keys(breakpointToPx) as IBreakpointKey[]

	return Object.keys(value).some((key) =>
		validBreakpoints.includes(key as IBreakpointKey),
	)
}

export const useBreakpoint = (breakpoint: IBreakPoint) => {
	const [is2Xs, isXs, isSm, isMd, isLg, isXl, is2xl, is3xl] = useMediaQuery([
		{ minWidth: breakpointToPx['2xs'] },
		{ minWidth: breakpointToPx.xs },
		{ minWidth: breakpointToPx.sm },
		{ minWidth: breakpointToPx.md },
		{ minWidth: breakpointToPx.lg },
		{ minWidth: breakpointToPx.xl },
		{ minWidth: breakpointToPx['2xl'] },
		{ minWidth: breakpointToPx['3xl'] },
	])

	return breakpoint[
		is3xl && '3xl' in breakpoint
			? '3xl'
			: is2xl && '2xl' in breakpoint
				? '2xl'
				: isXl && 'xl' in breakpoint
					? 'xl'
					: isLg && 'lg' in breakpoint
						? 'lg'
						: isMd && 'md' in breakpoint
							? 'md'
							: isSm && 'sm' in breakpoint
								? 'sm'
								: isXs && 'xs' in breakpoint
									? 'xs'
									: is2Xs && '2xs' in breakpoint
										? '2xs'
										: 'base'
	]
}
