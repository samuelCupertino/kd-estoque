import { Drawer, IDrawerProps } from '@/components/molecules'
import { ButtonCircle, Badge } from '@/components/atoms'

export interface IDashboardFilterDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const DashboardFilterDrawer = ({
	...props
}: IDashboardFilterDrawerProps) => (
	<Drawer
		title="Filtros"
		subtitle="Métricas e gráficos"
		iconName="Filter"
		renderButton={({ setIsOpen }) => (
			<ButtonCircle
				className="bg-background-0"
				iconProps={{ name: 'Filter' }}
				onPress={() => setIsOpen(true)}
			>
				<Badge
					className="absolute -top-1 right-10 bg-red-500"
					textProps={{
						className: 'color-typography-0 dark:color-typography-950',
					}}
				>
					1
				</Badge>
			</ButtonCircle>
		)}
		{...props}
	/>
)
