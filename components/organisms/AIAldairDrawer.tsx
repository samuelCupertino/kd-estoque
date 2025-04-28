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

export interface IAIAldairDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {}

export const AIAldairDrawer = ({ ...props }: IAIAldairDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')

	return (
		<Drawer
			title="Aldair"
			subtitle="Auditor de Produtos"
			iconName="PackageSearch"
			iconColor="quinary_400"
			renderButton={({ setShowDrawer }) => (
				<Button
					className="w-full h-full"
					iconProps={{ name: 'TextSearch' }}
					baseColor="quinary"
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
