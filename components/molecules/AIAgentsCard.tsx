import { ComponentProps } from 'react'
import { Box } from '../ui/box'
import { Pressable } from '../ui/pressable'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { IconCircle, IIconCircleProps, Text, Icon } from '../atoms'
import { Divider } from '../ui/divider'
// import { fetchDeepSeekResponse } from '@/utils/speechToText'

export interface IAIAgentsCardProps
	extends Omit<ComponentProps<typeof Box>, 'role'> {
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	name: string
	onCall?: () => void
	onChat?: () => void
	onPhoto?: () => void
	onAction?: () => void
	onLead?: () => void
	renderFooter?: () => JSX.Element
	role: string
	description: string
}

export const AIAgentsCard = ({
	iconName,
	iconColor = 'background_700',
	name,
	role,
	description,
	onAction,
	onCall,
	onChat,
	onPhoto,
	onLead,
	renderFooter,
	style,
	...props
}: IAIAgentsCardProps) => (
	<Box
		className="justify-between items-center rounded-3xl bg-background-0 dark:bg-background-50 p-5 border-2 border-background-100"
		style={{ borderRadius: 24, ...(style as object) }}
		{...props}
	>
		<HStack space="md" className="w-full items-center">
			<IconCircle
				name={iconName}
				color={iconColor}
				size={28}
				borderRadius={8}
			/>
			<Box>
				<Heading size="md" className="color-typography-600">
					{name}
				</Heading>
				<Text
					size="sm"
					color={{ light: 'background_600', dark: 'background_800' }}
				>
					{role}
				</Text>
			</Box>
		</HStack>
		<Divider className="mt-2" />
		<Text className="w-full mt-2" style={{ fontFamily: 'DMSans' }} size="md">
			{description}
		</Text>

		<Divider className="my-2" />

		<HStack space="md" className="w-full">
			{renderFooter?.()}
			{onAction && (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-tertiary-200 dark:bg-tertiary-50 hover:bg-tertiary-300 dark:hover:bg-tertiary-100 rounded-xl"
					onPress={onAction}
					// onPress={()=> fetchDeepSeekResponse('mes passado comprei 100 unidades de forma de ovos da pascoa. Este mes, maio, estou em duvida se compro mais formas o que vc acha?', 'sk-9e5f68ae148741c5b2b40e1bd7993379')}
				>
					<Icon name="TextSearch" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Analizar
					</Text>
				</Pressable>
			)}

			{onAction && (onCall || onPhoto || onChat) && (
				<Divider orientation="vertical" />
			)}

			{onCall && (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-green-200 dark:bg-green-950 hover:bg-green-300 hover:dark:bg-green-900 rounded-xl"
					onPress={onCall}
					// onPress={()=> fetchDeepSeekResponse('mes passado comprei 100 unidades de forma de ovos da pascoa. Este mes, maio, estou em duvida se compro mais formas o que vc acha?', 'sk-9e5f68ae148741c5b2b40e1bd7993379')}
				>
					<Icon name="Phone" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Ligar
					</Text>
				</Pressable>
			)}

			{onCall && (onPhoto || onChat) && <Divider orientation="vertical" />}

			{onPhoto && (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-secondary-200 dark:bg-secondary-50 hover:bg-secondary-300 hover:dark:bg-secondary-100 rounded-xl"
					onPress={onPhoto}
					// onPress={()=> fetchDeepSeekResponse('mes passado comprei 100 unidades de forma de ovos da pascoa. Este mes, maio, estou em duvida se compro mais formas o que vc acha?', 'sk-9e5f68ae148741c5b2b40e1bd7993379')}
				>
					<Icon name="Camera" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Foto
					</Text>
				</Pressable>
			)}

			{onPhoto && onChat && <Divider orientation="vertical" />}

			{onChat && (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-orange-100 dark:bg-yellow-950 hover:bg-orange-200 hover:dark:bg-yellow-900 rounded-xl"
					onPress={onChat}
				>
					<Icon name="MessageCircle" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Chat
					</Text>
				</Pressable>
			)}

			{onLead && (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-quaternary-200 dark:bg-quaternary-50 hover:bg-quaternary-300 hover:dark:bg-quaternary-100 rounded-xl"
					onPress={onLead}
				>
					<Icon name="ShoppingCart" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Iniciar
					</Text>
				</Pressable>
			)}
		</HStack>
	</Box>
)
