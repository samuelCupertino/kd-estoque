import { Button } from '../atoms'
import {
	Drawer,
	IDrawerProps,
	AnimatedAI,
	IAnimatedAIStatus,
} from '../molecules'

import { useRef } from 'react'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Divider } from '../ui/divider'

export interface IAILidiaCameraDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AILidiaCameraDrawer = ({
	...props
}: IAILidiaCameraDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')

	return (
		<Drawer
			title="Lídia"
			subtitle="Vendedora Artificial"
			iconName="BotMessageSquare"
			iconColor="secondary_400"
			renderButton={({ setShowDrawer }) => (
				<Button
					iconProps={{ name: 'ShoppingCart' }}
					baseColor="secondary"
					onPress={() => setShowDrawer(true)}
				>
					Foto
				</Button>
			)}
			renderFooter={({ setShowDrawer }) => (
				<VStack className="w-full gap-4">
					<Divider />
					<HStack className="w-full gap-4">
						<Button variant="danger" onPress={() => setShowDrawer(false)}>
							Cancelar
						</Button>
						<Button baseColor="secondary" onPress={() => setShowDrawer(false)}>
							Salvar
						</Button>
					</HStack>
				</VStack>
			)}
			{...props}
		>
			<AnimatedAI
				status={statusRef.current}
				className="mt-32 mx-auto"
				color={props.iconColor}
			/>
		</Drawer>
	)
}
