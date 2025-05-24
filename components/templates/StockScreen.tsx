import React from 'react'
import {
	GridContainer,
	GridContainerItem,
	ScrollContainer,
} from '@/components/atoms'
import { BagdeCard, ScreenHeader, StockCard } from '@/components/molecules'

import { VStack } from '@/components/ui/vstack'
import { router } from 'expo-router'

export const StockScreen = () => (
	<VStack>
		<ScreenHeader paths={[{ label: 'Gestão de Estoque' }]} />

		<ScrollContainer
			borderRadius={24}
			innerMargin={{ base: -4, sm: -6 }}
			paddingBottom={86}
		>
			<GridContainer cols={12} gap={{ base: 4, sm: 6 }}>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<StockCard
							iconName="Package"
							iconColor="secondary_400"
							title="Produtos"
							text="Visualizar, criar, editar, excluir, exportar csv..."
							style={{ width, height }}
							onPress={() => router.push('/stock/products')}
						/>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<StockCard
							iconName="ShoppingCart"
							iconColor="tertiary_400"
							title="Vendas"
							text="Visualizar, criar, editar, excluir, exportar csv, emitir nota fiscal..."
							style={{ width, height }}
						/>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<StockCard
							iconName="Tags"
							iconColor="quaternary_400"
							title="Categorias"
							text="Visualizar, criar, editar, excluir..."
							style={{ width, height }}
						/>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<StockCard
							iconName="Store"
							iconColor="quinary_400"
							title="Lojas"
							text="Visualizar, criar, editar, excluir..."
							style={{ width, height }}
						/>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, md: 2, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<StockCard
							iconName="Users"
							iconColor="quaternary_400"
							title="Usuários"
							text="Visualizar, criar, editar, excluir..."
							style={{ width, height }}
						/>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<BagdeCard text="Em breve" isDisable>
							<StockCard
								iconName="Handshake"
								iconColor="secondary_400"
								title="Fornecedores"
								text="Visualizar, criar, editar, excluir..."
								style={{ width, height }}
							/>
						</BagdeCard>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<BagdeCard text="Em breve" isDisable>
							<StockCard
								iconName="Contact"
								iconColor="tertiary_400"
								title="Clientes"
								text="Visualizar, criar, editar, excluir..."
								style={{ width, height }}
							/>
						</BagdeCard>
					)}
				</GridContainerItem>
				<GridContainerItem
					cols={{ base: 12, sm: 6, xl: 4 }}
					rows={{ base: 5, xs: 4, sm: 3, md: 2, lg: 2.5, xl: 1.5 }}
				>
					{({ width, height }) => (
						<BagdeCard text="Em breve" isDisable>
							<StockCard
								iconName="Network"
								iconColor="quinary_400"
								title="Integrações"
								text="Integrar seu estoque com marketplaces..."
								style={{ width, height }}
							/>
						</BagdeCard>
					)}
				</GridContainerItem>
			</GridContainer>
		</ScrollContainer>
	</VStack>
)
