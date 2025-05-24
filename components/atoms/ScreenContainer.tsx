import { Box } from '@/components/ui/box'
import { useLayoutTheme } from '@/app/_layout'
import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { Platform, useWindowDimensions } from 'react-native'
import { ComponentProps } from 'react'

interface IScreenContainerProps extends ComponentProps<typeof Box> {}

export const ScreenContainer = ({ children }: IScreenContainerProps) => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const { currentTheme } = useLayoutTheme()
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'] - 200, marginInline: 'auto' },
		'3xl': { width: breakpointToPx['3xl'] - 200, marginInline: 'auto' },
	})

	return (
		<Box
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: currentTheme.colors.background,
			}}
		>
			<Box
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
					marginBottom: Platform.OS === 'web' ? 0 : 232,
					...style,
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
