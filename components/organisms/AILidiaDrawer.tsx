import { Button } from '@/components/atoms'
import {
	Drawer,
	IDrawerProps,
	AnimatedAI,
	IAnimatedAIStatus,
} from '@/components/molecules'

import { useRef } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Divider } from '@/components/ui/divider'

export interface IAILidiaDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AILidiaDrawer = ({ ...props }: IAILidiaDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')

	return (
		<Drawer
			title="Lídia"
			subtitle="Vendedora Artificial"
			iconName="BotMessageSquare"
			iconColor="secondary_400"
			renderButton={({ setIsOpen }) => (
				<Button
					iconProps={{ name: 'ShoppingCart' }}
					baseColor="secondary"
					onPress={() => setIsOpen(true)}
				>
					Iniciar
				</Button>
			)}
			renderFooter={({ setIsOpen }) => (
				<VStack className="w-full gap-4">
					<Divider />
					<HStack className="w-full gap-4">
						<Button variant="danger" onPress={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button baseColor="secondary" onPress={() => setIsOpen(false)}>
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
