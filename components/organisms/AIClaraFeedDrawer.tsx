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

export interface IAIClaraFeedDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AIClaraFeedDrawer = ({ ...props }: IAIClaraFeedDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')

	return (
		<Drawer
			title="Clara Feed"
			subtitle="Social Media"
			iconName="Newspaper"
			iconColor="tertiary_400"
			renderButton={({ setShowDrawer }) => (
				<Button
					iconProps={{ name: 'Newspaper' }}
					baseColor="tertiary"
					onPress={() => setShowDrawer(true)}
				>
					Iniciar
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
