import React from 'react'
import {
	GridContainer,
	GridContainerItem,
	ScrollContainer,
} from '@/components/atoms'
import { ScreenHeader, ValueDifferenceCard } from '@/components/molecules'
import {
	LatestSalesList,
	LowStockProducts,
	MostProfitableProductChart,
	ProductOrSaleCategories,
	ProductsByExpirationDate,
	BestSellingProductsChart,
	ProductsEntryAndExitChart,
	SalesByAgentChart,
	SalesReportChart,
	StockStorageChart,
	DashboardFilterDrawer,
} from '@/components/organisms'
import { breakpointToPx, useBreakpoint } from '@/hooks/useBreakpoint'
import { Platform, useWindowDimensions } from 'react-native'
import { VStack } from '@/components/ui/vstack'

export const HomeScreen = () => {
	const screenDimensions = useWindowDimensions()
	const isNavLeft = screenDimensions.width > screenDimensions.height
	const style = useBreakpoint({
		base: undefined,
		'2xl': { width: breakpointToPx['2xl'], marginInline: 'auto' },
	})

	return (
		<VStack style={style}>
			<ScreenHeader
				title="Relatórios de Estoque"
				style={{
					marginLeft: isNavLeft ? 92 : 6,
					marginRight: isNavLeft ? 12 : 6,
				}}
			>
				<DashboardFilterDrawer />
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
				{({ breakpoint }) => (
					<GridContainer
						cols={12}
						gap={{ base: 4, sm: 6 }}
						style={{
							marginBottom: Platform.OS === 'web' ? 24 : isNavLeft ? 160 : 248,
						}}
					>
						<GridContainerItem
							index={1}
							cols={{ base: 12, md: 6, xl: 4 }}
							rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 2 }}
						>
							{({ width, height }) => (
								<ValueDifferenceCard
									iconName="Package"
									iconColor="secondary_400"
									title="Produtos no estoque"
									descripition="Mês passado:"
									value={3400}
									oldValue={3000}
									formatValue={(val) => val.toLocaleString('pt-BR')}
									style={{ width, height }}
								/>
							)}
						</GridContainerItem>
						<GridContainerItem
							cols={{ base: 12, md: 6, xl: 4 }}
							rows={{ base: 5, xs: 4, sm: 3, lg: 2.5, xl: 2 }}
						>
							{({ width, height }) => (
								<ValueDifferenceCard
									iconName="ShoppingCart"
									iconColor="tertiary_400"
									title="Número de vendas"
									descripition="Mês passado:"
									value={1800}
									oldValue={2000}
									formatValue={(val) => val.toLocaleString('pt-BR')}
									style={{ width, height }}
								/>
							)}
						</GridContainerItem>
						<GridContainerItem
							cols={{ base: 12, md: 12, lg: 6, xl: 4 }}
							rows={{ base: 5, xs: 4, sm: 3, lg: 3.5, xl: 2 }}
						>
							{({ width, height }) => (
								<ValueDifferenceCard
									iconName="HandCoins"
									iconColor="quaternary_400"
									title="Total de vendas"
									descripition="Mês passado:"
									value={23000}
									oldValue={20000}
									formatValue={(val) =>
										val.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})
									}
									style={{ width, height }}
								/>
							)}
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, xl: 7, '2xl': 8 }}
							rows={{ base: 11, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<SalesReportChart width={width} height={height} />
							)}
						</GridContainerItem>
						<GridContainerItem
							index={breakpoint === 'lg' ? 4 : 5}
							cols={{ base: 12, lg: 6, xl: 5, '2xl': 4 }}
							rows={{ base: 9, xs: 7, sm: 6, md: 5, lg: 3.5, xl: 3 }}
						>
							{({ width, height }) => (
								<SalesByAgentChart width={width} height={height} />
							)}
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, md: 6 }}
							rows={{ base: 8.5, sm: 6, md: 5, lg: 4, xl: 3 }}
						>
							<LatestSalesList />
						</GridContainerItem>
						<GridContainerItem
							cols={{ base: 12, md: 6 }}
							rows={{ base: 8.5, sm: 6, md: 5, lg: 4, xl: 3 }}
						>
							<ProductsByExpirationDate />
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 11, xs: 9, md: 5, lg: 4, xl: 3 }}
						>
							{({ width }) => <ProductsEntryAndExitChart width={width} />}
						</GridContainerItem>
						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 11, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<BestSellingProductsChart width={width} height={height} />
							)}
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 11, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<MostProfitableProductChart width={width} height={height} />
							)}
						</GridContainerItem>
						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 11, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<LowStockProducts width={width} height={height} />
							)}
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 9, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<ProductOrSaleCategories width={width} height={height} />
							)}
						</GridContainerItem>

						<GridContainerItem
							cols={{ base: 12, lg: 6 }}
							rows={{ base: 8, xs: 8, md: 5, lg: 4, xl: 3 }}
						>
							{({ width, height }) => (
								<StockStorageChart width={width} height={height} />
							)}
						</GridContainerItem>
					</GridContainer>
				)}
			</ScrollContainer>
		</VStack>
	)
}
