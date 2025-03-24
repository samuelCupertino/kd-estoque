import { Drawer, IDrawerProps } from '../molecules'
import { Button, Icon } from '../atoms'
import { Badge, BadgeText } from '../ui/badge'

export interface IAIAgenteCoinsDrawerProps
	extends Omit<IDrawerProps, 'renderButton' | 'title'> {}

export const AIAgenteCoinsDrawer = ({
	...props
}: IAIAgenteCoinsDrawerProps) => (
	<Drawer
		title="Filtros"
		renderButton={({ setShowDrawer }) => (
			<Button
				variant="circle-secondary"
				size="xl"
				onPress={() => setShowDrawer(true)}
			>
				<Icon name="CircleDollarSign" size={28} className="color-primary-500" />
				<Badge
					size="md"
					className="absolute rounded-full bg-background-300 -top-1 right-9"
				>
					<BadgeText>1000</BadgeText>
				</Badge>
			</Button>
		)}
		{...props}
	/>
)
