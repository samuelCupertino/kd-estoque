import { Icon, Button } from '../atoms'
import { Box } from '../ui/box'
import { ScrollContainer } from '../atoms'
import { AIAgentsCard, ScreenHeader } from '../molecules'
import { VStack } from '../ui/vstack'

export const AIAgentsScreen = () => (
	<Box>
		<ScreenHeader title="Agentes de IA" className="mb-4">
			<Button variant="circle-secondary" size="xl">
				<Icon name="CircleDollarSign" size={24} className="color-primary-500" />
			</Button>
			<Button variant="circle-secondary" size="xl">
				<Icon name="Settings" size={24} className="color-primary-500" />
			</Button>
		</ScreenHeader>

		<ScrollContainer className="mx-3">
			{({ isLandscape }) => (
				<VStack
					space="lg"
					className="pb-72"
					style={isLandscape ? { marginLeft: 100 } : { marginBottom: 32 }}
				>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Operador de Estoque"
						text="Busca, cria, edita, exclui e exporta veículos cadastrados."
					/>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Operador de Caixa"
						text="Auxilia nas vendas de produtos pelo código de barras."
					/>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Analista de Relatórios"
						text="Gera relatórios detalhados sobre a movimentação de produtos."
					/>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Analista Publicitário"
						text="Melhora a apresentação dos produtos para aumentar a atratividade."
					/>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Instrutor do Sistema"
						text="Orienta os usuários no uso completo da plataforma."
					/>
					<AIAgentsCard
						iconName="BotMessageSquare"
						title="Suporte Técnico"
						text="Atende dúvidas técnicas e garante a continuidade do atendimento."
					/>
				</VStack>
			)}
		</ScrollContainer>
	</Box>
)
