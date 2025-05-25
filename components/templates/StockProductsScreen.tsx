import React from 'react'
import {
	Badge,
	ButtonCircle,
	IBadgeProps,
	ScrollContainer,
} from '@/components/atoms'
import { InputTextField, ScreenHeader, Table } from '@/components/molecules'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

const DATA = [
	{
		id: '5771',
		name: 'Rajesh Kumar',
		quantity: 3,
		location: 'New Jersey',
		amount: 200,
		status: 'Completed',
		actions: null,
	},
	{
		id: '5232',
		name: 'Priya Sharma',
		quantity: 2,
		location: 'Austin',
		amount: 150,
		status: 'Processing',
		actions: null,
	},
	{
		id: '5773',
		name: 'Ravi Patel',
		quantity: 3,
		location: 'Seattle',
		amount: 215,
		status: 'Shipped',
		actions: null,
	},
	{
		id: '5234',
		name: 'Ananya Gupta',
		quantity: 4,
		location: 'California',
		amount: 88,
		status: 'Processing',
		actions: null,
	},
	{
		id: '5775',
		name: 'Arjun Singh',
		quantity: 3,
		location: 'Seattle',
		amount: 115,
		status: 'Completed',
		actions: null,
	},
	{
		id: '5776',
		name: 'Nisha Verma',
		quantity: 3,
		location: 'Seattle',
		amount: 115,
		status: 'Processing',
		actions: null,
	},
	{
		id: '6347',
		name: 'Vikram Desai',
		quantity: 1,
		location: 'Chicago',
		amount: 175,
		status: 'Pending',
		actions: null,
	},
	{
		id: '4128',
		name: 'Meera Joshi',
		quantity: 5,
		location: 'Miami',
		amount: 320,
		status: 'Completed',
		actions: null,
	},
	{
		id: '7859',
		name: 'Amitabh Sen',
		quantity: 2,
		location: 'Boston',
		amount: 140,
		status: 'Cancelled',
		actions: null,
	},
	{
		id: '9010',
		name: 'Kiran Nair',
		quantity: 6,
		location: 'San Francisco',
		amount: 400,
		status: 'Processing',
		actions: null,
	},
]

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
				className="mr-auto flex-1 max-w-[400px]"
				placeholder="Pesquisar..."
				leftIconProps={{ name: 'Search' }}
			/>
			<ButtonCircle size="md" iconProps={{ name: 'Plus' }} />
			<ButtonCircle size="md" iconProps={{ name: 'RefreshCcw' }} />
			<ButtonCircle size="md" iconProps={{ name: 'Eye' }} />
			<ButtonCircle size="md" iconProps={{ name: 'Download' }} />
			<ButtonCircle size="md" iconProps={{ name: 'Filter' }} />
		</HStack>

		<ScrollContainer
			borderRadius={24}
			innerMargin={{ base: -4, sm: -6 }}
			paddingBottom={86}
		>
			{({ width }) => (
				<Table
					data={DATA}
					mapTitle={{
						id: 'CÓDIGO',
						name: 'NOME',
						location: 'LOCALIZAÇÃO',
						quantity: 'QUANTIDADE',
						amount: 'PREÇO',
						status: 'STATUS',
						actions: 'AÇÕES',
					}}
					mapTableColProps={{
						actions: { style: { minWidth: 110 } },
					}}
					mapItemColRender={{
						status: (row) => (
							<Badge
								size="sm"
								action={
									{
										Completed: 'success',
										Processing: 'info',
										Shipped: 'warning',
										Pending: 'success',
										Cancelled: 'error',
									}[row?.status ?? 'error'] as IBadgeProps['action']
								}
								className="w-fit justify-center"
							>
								{row?.status}
							</Badge>
						),
						actions: () => (
							<HStack className="gap-2">
								<ButtonCircle
									size="sm"
									iconProps={{ name: 'Edit', color: 'success_600' }}
								/>
								<ButtonCircle
									size="sm"
									iconProps={{ name: 'Trash', color: 'error_600' }}
								/>
							</HStack>
						),
					}}
					style={{ width }}
				/>
			)}
		</ScrollContainer>
	</VStack>
)
