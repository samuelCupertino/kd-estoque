import { GridContainer, GridContainerItem } from '@/components/atoms'
import { ScrollContainer } from '@/components/atoms'
import { AIAgentsCard, BagdeCard, ScreenHeader } from '@/components/molecules'
import { Platform, useWindowDimensions } from 'react-native'
import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import {
	AIAnnaLisaCallDrawer,
	AIAgentsCoinsDrawer,
	AIEduarteCallDrawer,
	AIPolianaCameraDrawer,
	AIAgentsChatDrawer,
	AIAldairDrawer,
	AILidiaDrawer,
	AIClaraFeedDrawer,
} from '@/components/organisms'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Divider } from '@/components/ui/divider'

export const AIAgentsScreen = () => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'], marginInline: 'auto' },
	})

	return (
		<VStack style={style}>
			<ScreenHeader
				paths={[{ label: 'Agentes de IA' }]}
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			>
				<AIAgentsCoinsDrawer />
			</ScreenHeader>

			<ScrollContainer
				borderRadius={24}
				innerMargin={{ base: -4, sm: -6 }}
				style={{
					marginInline: 6,
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			>
				<GridContainer
					cols={12}
					gap={{ base: 4, sm: 6 }}
					style={{
						marginBottom: Platform.OS === 'web' ? 24 : isNavLeft ? 160 : 248,
					}}
				>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<AIAgentsCard
								iconName="PackagePlus"
								iconColor="secondary_400"
								name="Poliana"
								role="Repositora de Produtos"
								description="Cadastra produtos automaticamente a partir de fotos, identificando nome, categoria, código de barras e descrição para agilizar a organização do estoque."
								renderFooter={() => <AIPolianaCameraDrawer />}
								style={{ width, height }}
							/>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<AIAgentsCard
								iconName="Database"
								iconColor="tertiary_400"
								name="Anna Lisa"
								role="Analista de Dados"
								description="Analisa dados de estoque e vendas para prever demandas, evitar perdas e sugerir reposições inteligentes, apoiando decisões mais eficientes para o seu negócio."
								renderFooter={() => (
									<HStack className="w-full">
										<AIAnnaLisaCallDrawer
											buttonProps={{ className: 'rounded-r-none' }}
										/>
										<Divider
											orientation="vertical"
											className="bg-background-0"
										/>
										<AIAgentsChatDrawer
											title="Anna Lisa"
											subtitle="Analista de Dados"
											iconName="Database"
											iconColor="tertiary_400"
											buttonProps={{ className: 'rounded-l-none' }}
										/>
									</HStack>
								)}
								style={{ width, height }}
							/>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<AIAgentsCard
								iconName="Palette"
								iconColor="quaternary_400"
								name="Eduarte"
								role="Designer Gráfico"
								description="Cria artes promocionais e imagens de divulgação com base nos produtos, campanhas e datas especiais, fortalecendo a comunicação visual e o impacto da marca."
								renderFooter={() => (
									<HStack className="w-full">
										<AIEduarteCallDrawer
											buttonProps={{ className: 'rounded-r-none' }}
										/>
										<Divider
											orientation="vertical"
											className="bg-background-0"
										/>
										<AIAgentsChatDrawer
											title="Eduarte"
											subtitle="Designer Gráfico"
											iconName="Palette"
											iconColor="quaternary_400"
											buttonProps={{ className: 'rounded-l-none' }}
										/>
									</HStack>
								)}
								style={{ width, height }}
							/>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<BagdeCard text="Em breve" isDisable>
								<AIAgentsCard
									iconName="PackageSearch"
									iconColor="quinary_400"
									name="Aldair"
									role="Auditor de Produtos"
									description="Avalia produtos cadastrados e sugere melhorias como inclusão de imagens, datas de validade e descrições, mantendo o catálogo completo, atrativo e atualizado."
									renderFooter={() => <AIAldairDrawer />}
									style={{ width, height }}
								/>
							</BagdeCard>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<BagdeCard text="Em breve" isDisable>
								<AIAgentsCard
									iconName="BotMessageSquare"
									iconColor="secondary_400"
									name="Lídia"
									role="Vendedora Artificial"
									description="Responde dúvidas dos clientes, sugere produtos com base no estoque e ajuda a impulsionar as vendas com recomendações inteligentes e atendimento automatizado."
									renderFooter={() => <AILidiaDrawer />}
									style={{ width, height }}
								/>
							</BagdeCard>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<BagdeCard text="Em breve" isDisable>
								<AIAgentsCard
									iconName="Newspaper"
									iconColor="tertiary_400"
									name="Clara Feed"
									role="Social Media"
									description="Cria posts criativos de produtos e datas comemorativas com dados da Lídia e imagens do Eduarte. Publica automaticamente nas redes sociais, fazendo o marketing digital da sua loja."
									renderFooter={() => <AIClaraFeedDrawer />}
									style={{ width, height }}
								/>
							</BagdeCard>
						)}
					</GridContainerItem>
					<GridContainerItem
						cols={{ base: 12, sm: 6, xl: 4 }}
						rows={{ base: 14, '2xs': 9, xs: 6, sm: 5, lg: 4, xl: 3 }}
					>
						{({ width, height }) => (
							<BagdeCard text="Em breve" isDisable>
								<AIAgentsCard
									iconName="Video"
									iconColor="quaternary_400"
									name="Renderley"
									role="Video Maker"
									description="Produz vídeos promocionais e institucionais com base em produtos e campanhas, ampliando o alcance da marca e fortalecendo o engajamento com seus clientes."
									renderFooter={() => (
										<HStack className="w-full">
											<AIEduarteCallDrawer
												buttonProps={{ className: 'rounded-r-none' }}
											/>
											<Divider
												orientation="vertical"
												className="bg-background-0"
											/>
											<AIAgentsChatDrawer
												title="Eduarte"
												subtitle="Designer Gráfico"
												iconName="Palette"
												iconColor="quaternary_400"
												buttonProps={{ className: 'rounded-l-none' }}
											/>
										</HStack>
									)}
									style={{ width, height }}
								/>
							</BagdeCard>
						)}
					</GridContainerItem>
				</GridContainer>
			</ScrollContainer>
		</VStack>
	)
}
