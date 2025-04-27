import React from 'react'
import {
	GridContainer,
	GridContainerItem,
	ScrollContainer,
} from '@/components/atoms'
import { BagdeCard, ScreenHeader, StockCard } from '@/components/molecules'

import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { Platform, useWindowDimensions } from 'react-native'
import { VStack } from '@/components/ui/vstack'

export const StockScreen = () => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'], marginInline: 'auto' },
	})

	return (
		<VStack style={style}>
			<ScreenHeader
				title="Gestão de Estoque"
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			/>

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
						marginBottom: Platform.OS === 'web' ? 0 : isNavLeft ? 160 : 248,
					}}
				>
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
}
