import { Drawer, IDrawerProps } from '../molecules'
import { Button, Icon } from '../atoms'

export interface IDashboardFilterDrawerProps
	extends Omit<IDrawerProps, 'renderButton' | 'title'> {}

export const DashboardFilterDrawer = ({
	...props
}: IDashboardFilterDrawerProps) => (
	<Drawer
		title="Filtros"
		renderButton={({ setShowDrawer }) => (
			<Button
				variant="circle-secondary"
				size="xl"
				onPress={() => setShowDrawer(true)}
			>
				<Icon name="Filter" size={24} className="color-primary-500" />
			</Button>
		)}
		{...props}
	/>
)
