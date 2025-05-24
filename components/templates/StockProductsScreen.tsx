import React from 'react'
import {
	ScrollContainer,
	Image,
	Text,
	Stack,
	IconCircle,
	Icon,
	ButtonCircle,
} from '@/components/atoms'
import { ScreenHeader, Table } from '@/components/molecules'

import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { Platform, useWindowDimensions } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Box } from '@/components/ui/box'
import { useLayoutTheme } from '@/app/_layout'

export const StockProductsScreen = () => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const { currentTheme } = useLayoutTheme()
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'], marginInline: 'auto' },
	})

	const wrapMenuStyle = useBreakpoint({
		base: undefined,
		lg: { width: breakpointToPx['lg'], marginInline: 'auto' },
	})

	return (
		<VStack
			style={{ ...style, backgroundColor: currentTheme.colors.background }}
		>
			<ScreenHeader
				paths={[
					{ label: 'Gestão de Estoque', href: '/stock' },
					{ label: 'Produtos' },
				]}
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			/>

			<Box style={wrapMenuStyle} className="bg-blue-800 w-full">
				<ScrollContainer
					borderRadius={24}
					style={{
						marginInline: 6,
						marginLeft: isNavLeft ? 92 : 6,
						marginRight: isNavLeft ? 12 : 6,
					}}
					className="bg-blue-800 w-full"
				>
					<VStack
						className="gap-4 w-full"
						style={{
							paddingBottom: Platform.OS === 'web' ? 24 : isNavLeft ? 160 : 248,
						}}
					>
						<Table data={[]} columns={[]} />
					</VStack>
				</ScrollContainer>
			</Box>
		</VStack>
	)
}
