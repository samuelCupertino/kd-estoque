import { Drawer, IDrawerProps } from '../molecules'
import { Badge, ButtonCircle } from '../atoms'

export interface IAIAgentsCoinsDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AIAgentsCoinsDrawer = ({
	...props
}: IAIAgentsCoinsDrawerProps) => (
	<Drawer
		title="Moedas"
		subtitle="Adicione moedas na carteira"
		iconName="DollarSign"
		renderButton={({ setShowDrawer }) => (
			<ButtonCircle
				iconProps={{ name: 'CircleDollarSign' }}
				onPress={() => setShowDrawer(true)}
			>
				<Badge
					className="absolute -top-1 right-10 bg-amber-300"
					textProps={{
						className: 'color-typography-950 dark:color-typography-0',
					}}
				>
					1000
				</Badge>
			</ButtonCircle>
		)}
		{...props}
	/>
)
