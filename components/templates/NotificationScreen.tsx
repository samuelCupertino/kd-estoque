import React from 'react'
import { ScrollContainer, Text, IconCircle, Heading } from '@/components/atoms'
import { ScreenHeader } from '@/components/molecules'

import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Box } from '@/components/ui/box'

export const NotificationScreen = () => {
	const wrapMenuStyle = useBreakpoint({
		base: undefined,
		lg: { width: breakpointToPx['lg'], marginInline: 'auto' },
	})

	return (
		<VStack>
			<ScreenHeader paths={[{ label: 'Notificações' }]} />

			<Box style={wrapMenuStyle}>
				<ScrollContainer
					borderRadius={24}
					innerMargin={{ base: -4, sm: -6 }}
					paddingBottom={86}
				>
					<VStack className="gap-2">
						{Array.from({ length: 12 }, (e, i) => (
							<HStack
								key={i}
								className="gap-3 p-3 items-center border-2 border-background-100 bg-background-0 dark:bg-background-50"
								style={{ borderRadius: 24 }}
							>
								<IconCircle
									name="Database"
									color="tertiary_400"
									size={32}
									borderRadius={8}
								/>
								<VStack className="flex-1">
									<Heading size="md">Anna Lisa</Heading>
									<Text size="sm">
										Ligação de 30 minutos, realizada por Samuel Cupertino às
										12:30 de 12/05/2025, usando 137 moedas.
									</Text>
								</VStack>

								<Text size="lg" color="typography_300" className="ml-auto">
									há 1h
								</Text>
							</HStack>
						))}
					</VStack>
				</ScrollContainer>
			</Box>
		</VStack>
	)
}
