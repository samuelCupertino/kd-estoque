import {
	AddCoinByPixCard,
	AnimatedCoin,
	Drawer,
	IDrawerProps,
} from '@/components/molecules'
import {
	Badge,
	ButtonCircle,
	GridContainer,
	GridContainerItem,
	ScrollContainer,
	AnimateNumber,
	Heading,
} from '@/components/atoms'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'

const addCoinsOptions = [
	{ id: 1, number: 1000, bonus: 0, price: 5 },
	{ id: 2, number: 5000, bonus: 100, price: 25 },
	{ id: 3, number: 10000, bonus: 300, price: 50 },
	{ id: 4, number: 20000, bonus: 500, price: 100 },
]

export interface IAIAgentsCoinsDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AIAgentsCoinsDrawer = ({
	...props
}: IAIAgentsCoinsDrawerProps) => {
	const coinsValue = 90000

	return (
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
						{coinsValue.toLocaleString()}
					</Badge>
				</ButtonCircle>
			)}
			{...props}
		>
			<VStack className="px-4">
				<HStack className="items-center gap-6 py-6 w-full">
					<AnimatedCoin status="rotating" />
					<Divider orientation="vertical" />
					<AnimateNumber value={coinsValue} />
				</HStack>

				<Divider />

				<Heading size="md" className="color-typography-600 my-6">
					Adicione moedas via Pix:
				</Heading>

				<ScrollContainer borderRadius={24} innerMargin={-8} paddingBottom={16}>
					<GridContainer cols={12} gap={8}>
						{addCoinsOptions.map((coin) => (
							<GridContainerItem
								key={coin.id}
								cols={{ base: 12, md: 6, lg: 12, xl: 6 }}
								rows={{ base: 10, '2xs': 7, xs: 6, md: 5, lg: 6, xl: 4 }}
							>
								<AddCoinByPixCard
									coins={coin.number}
									bonus={coin.bonus}
									price={coin.price}
									className="h-full"
								/>
							</GridContainerItem>
						))}
					</GridContainer>
				</ScrollContainer>
			</VStack>
		</Drawer>
	)
}
