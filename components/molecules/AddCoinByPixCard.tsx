import { Button, IconCircle, Text } from '../atoms'
import { Card } from '../ui/card'
import { twMerge } from 'tailwind-merge'
import { HStack } from '../ui/hstack'
import { ComponentProps } from 'react'
import { Divider } from '../ui/divider'
import { VStack } from '../ui/vstack'

interface IAddCoinByPixCardProps
	extends Omit<ComponentProps<typeof Card>, 'children'> {
	price: number
	coins: number
	bonus?: number
}

export const AddCoinByPixCard = ({
	price,
	coins,
	bonus = 0,
	className,
	style,
	...props
}: IAddCoinByPixCardProps) => {
	const priceFormatted = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(price)

	return (
		<Card
			size="md"
			className={twMerge(
				`border bg-primary-50 border-background-100 dark:bg-background-100 dark:border-background-200`,
				className,
			)}
			style={{ borderRadius: 24, ...(style as object) }}
			{...props}
		>
			<HStack className="items-center gap-3">
				<IconCircle
					size={34}
					name="HandCoins"
					color="yellow_500"
					borderRadius={8}
				/>

				<VStack>
					<Text size="2xl" color="typography_600">
						{coins.toLocaleString()}
					</Text>
					<Text size="lg" color="typography_400" className="-mt-1">
						+{bonus.toLocaleString()} de bônus
					</Text>
				</VStack>
			</HStack>

			<Divider className="my-3" />
			<VStack className="justify-center items-center my-auto">
				<Text size="xl" color="typography_600" className="mx-auto">
					{priceFormatted}
				</Text>
			</VStack>

			<Divider className="my-3" />
			<VStack className="min-h-14">
				<Button baseColor="secondary" iconProps={{ name: 'Plus' }}>
					Adicionar
				</Button>
			</VStack>
		</Card>
	)
}
