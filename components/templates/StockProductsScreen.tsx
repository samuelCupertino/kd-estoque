import React from 'react'
import { ButtonCircle } from '@/components/atoms'
import { InputTextField, ScreenHeader } from '@/components/molecules'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { StockProductsTable } from '@/components/organisms'

export const StockProductsScreen = () => (
	<VStack>
		<ScreenHeader
			paths={[
				{ label: 'Gestão de Estoque', href: '/stock' },
				{ label: 'Produtos' },
			]}
		/>

		<HStack className="gap-1 md:gap-2 mb-4">
			<InputTextField
				size="xl"
				className="mr-auto flex-1 max-w-[400px]"
				placeholder="Pesquisar por nome..."
				leftIconProps={{ name: 'Search' }}
			/>
			<ButtonCircle size="md" iconProps={{ name: 'Plus' }} />
			<ButtonCircle size="md" iconProps={{ name: 'RefreshCcw' }} />
			<ButtonCircle size="md" iconProps={{ name: 'Filter' }} />
			<ButtonCircle size="md" iconProps={{ name: 'Settings' }} />
			{/* 
			Filter: 
				- quantidade (min, max)
				- categoria (select multiplo)
				- preco de custo (min, max)
				- preco de venda (min, max)
				- data de validade (min, max)
				- data de criacao (min, max)
			Settings: 
				- perquisar por (name, ...)
				- ordernar por (data de criacao, ...)
				- formato exibicao (tabela, card)
					+ tabela: colunas visiveis
					+ tabela: coluna fixada
					+ tabela: registros por pagina 
				- exportar registros
				- importar registros 
			*/}
		</HStack>

		<StockProductsTable />
	</VStack>
)
