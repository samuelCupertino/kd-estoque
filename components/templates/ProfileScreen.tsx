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
import { ScreenHeader } from '@/components/molecules'

import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { Platform, useWindowDimensions } from 'react-native'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Box } from '@/components/ui/box'

export const ProfileScreen = () => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'], marginInline: 'auto' },
	})

	const wrapMenuStyle = useBreakpoint({
		base: undefined,
		lg: { width: breakpointToPx['lg'], marginInline: 'auto' },
	})

	return (
		<VStack style={style}>
			<ScreenHeader
				paths={[{ label: 'Configurações' }]}
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			>
				<ButtonCircle className="bg-background-0" iconProps={{ name: 'Gem' }} />
			</ScreenHeader>

			<Box style={wrapMenuStyle}>
				<ScrollContainer
					borderRadius={24}
					style={{
						marginInline: 6,
						marginLeft: isNavLeft ? 92 : 6,
						marginRight: isNavLeft ? 12 : 6,
					}}
				>
					<VStack
						className="gap-4"
						style={{
							paddingBottom: Platform.OS === 'web' ? 24 : isNavLeft ? 160 : 248,
						}}
					>
						<VStack className="gap-4">
							<Image
								size="xl"
								containerProps={{
									className: 'bg-background-200 rounded-full p-4 mx-auto',
								}}
								src="@/assets/images/icon.png"
								alt="imagem de perfil do usuário logado"
							/>
							<VStack className="mx-auto items-center">
								<Text size="xl">Samuel Cupertino</Text>
								<Text size="md">samuelcupertino.dev@gmail.com</Text>
							</VStack>
						</VStack>

						<Text size="md" color="typography_500">
							Perfil
						</Text>
						<Stack
							className="rounded-3xl overflow-hidden border-2 border-background-100 bg-background-0 dark:bg-background-50"
							withDivider
						>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="UserRoundPen"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Dados Pessoais</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="CreditCard"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Assinatura</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="LifeBuoy"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Suporte</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
						</Stack>

						<Text size="md" color="typography_500">
							Preferências
						</Text>
						<Stack
							className="rounded-3xl overflow-hidden border-2 border-background-100 bg-background-0 dark:bg-background-50"
							withDivider
						>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="Palette"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Tema</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="BellDot"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Notificações</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="ScanFace"
									color="typography_400"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Autenticação</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
							<HStack className="gap-3 p-3 items-center">
								<IconCircle
									name="LogOut"
									color="red_300"
									size={18}
									borderRadius={8}
								/>
								<Text size="lg">Sair</Text>
								<Icon
									name="ArrowRight"
									color="typography_300"
									size={18}
									className="ml-auto"
								/>
							</HStack>
						</Stack>
					</VStack>
				</ScrollContainer>
			</Box>
		</VStack>
	)
}
