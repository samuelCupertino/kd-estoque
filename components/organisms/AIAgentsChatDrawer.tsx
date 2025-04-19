import { Button, ButtonCircle, ScrollContainer } from '../atoms'
import {
	Drawer,
	IDrawerProps,
	ChatMessageText,
	InputTextField,
} from '../molecules'

import { ComponentProps, useState } from 'react'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Divider } from '../ui/divider'
import { editThemeColor } from '@/hooks/useThemeColor'

import { Controller, useForm } from 'react-hook-form'

export interface IAIAgentsChatFealds {
	message: string
}

export interface IAIAgentsChatDrawerProps
	extends Omit<IDrawerProps, 'renderButton'> {
	buttonProps?: ComponentProps<typeof Button>
}

export const AIAgentsChatDrawer = ({
	buttonProps,
	...props
}: IAIAgentsChatDrawerProps) => {
	const { control, handleSubmit, setValue } = useForm<IAIAgentsChatFealds>()
	const [messagesChat, setMessagesChat] = useState([
		{
			id: 0,
			text: 'Bom dia, Anna Lisa!',
			date: '09:00 21/04/2025',
			authorName: 'Samuel Cupertino',
			isAuthor: true,
		},
		{
			id: 1,
			text: 'Você pode verificar o status atual do nosso estoque?',
			date: '09:00 21/04/2025',
			authorName: 'Samuel Cupertino',
			isAuthor: true,
		},
		{
			id: 2,
			text: 'Claro, Samuel. Analisando os dados da Papelaria Nova Era, identifiquei que alguns itens estão com níveis baixos de estoque.',
			date: '09:01 21/04/2025',
			authorName: 'Anna Lisa',
			isAuthor: false,
		},
		{
			id: 3,
			text: 'Quais produtos estão com estoque crítico?',
			date: '09:02 21/04/2025',
			authorName: 'Samuel Cupertino',
			isAuthor: true,
		},
		{
			id: 4,
			text: 'Os cadernos universitários, canetas esferográficas e blocos de notas estão abaixo do estoque mínimo recomendado.',
			date: '09:03 21/04/2025',
			authorName: 'Anna Lisa',
			isAuthor: false,
		},
		{
			id: 5,
			text: 'Você sugere que façamos a reposição imediata desses itens?',
			date: '09:04 21/04/2025',
			authorName: 'Samuel Cupertino',
			isAuthor: true,
		},
		{
			id: 6,
			text: 'Sim, recomendo realizar novos pedidos para evitar rupturas de estoque e garantir a satisfação dos clientes.',
			date: '09:05 21/04/2025',
			authorName: 'Anna Lisa',
			isAuthor: false,
		},
		{
			id: 7,
			text: 'Entendido. Pode preparar uma lista com as quantidades sugeridas para reposição?',
			date: '09:06 21/04/2025',
			authorName: 'Samuel Cupertino',
			isAuthor: true,
		},
		{
			id: 8,
			text: 'Certamente. Prepararei a lista com base nas vendas recentes e enviarei para sua revisão em breve.',
			date: '09:07 21/04/2025',
			authorName: 'Anna Lisa',
			isAuthor: false,
		},
	])
	const color50 = editThemeColor({
		themeColor: props.iconColor,
		level: 0,
	})
	const baseColor50 = editThemeColor({
		themeColor: props.iconColor,
		separator: '',
		level: '',
	})

	const handleSendMessagesChat = (fiels: IAIAgentsChatFealds) => {
		const lestMessagesChat = messagesChat.at(-1)
		const newMessagesChat = [
			...messagesChat,
			{
				id: (lestMessagesChat?.id ?? 0) + 1,
				text: fiels.message,
				date: '09:07 21/04/2025',
				authorName: 'Samuel Cupertino',
				isAuthor: true,
			},
		]
		setMessagesChat(newMessagesChat)
		setValue('message', '')
	}

	return (
		<Drawer
			renderButton={({ setShowDrawer }) => (
				<Button
					iconProps={{ name: 'MessageCircle' }}
					baseColor={baseColor50}
					onPress={() => setShowDrawer(true)}
					{...buttonProps}
				>
					Chat
				</Button>
			)}
			renderFooter={() => (
				<VStack className="w-full gap-4">
					<Divider />
					<HStack className="w-full gap-2">
						<ButtonCircle size="md" iconProps={{ name: 'Ellipsis' }} />
						<Controller
							control={control}
							name="message"
							rules={{ required: 'A mensagem é obrigatória.' }}
							render={({ field }) => (
								<InputTextField
									placeholder="Escreva aqui..."
									onSubmitEditing={handleSubmit(handleSendMessagesChat)}
									{...field}
								/>
							)}
						/>
						<ButtonCircle size="md" iconProps={{ name: 'Mic' }} />
						<ButtonCircle
							size="md"
							iconProps={{ name: 'Send', color: 'green_800' }}
							onPress={handleSubmit(handleSendMessagesChat)}
						/>
					</HStack>
				</VStack>
			)}
			{...props}
		>
			{({ height }) => (
				<ScrollContainer
					autoScrollToEnd
					scrollViewProps={{
						style: { height },
						contentContainerStyle: { padding: 14 },
					}}
				>
					<VStack className="gap-1">
						{messagesChat.map((msg, i, array) => (
							<ChatMessageText
								key={msg.id}
								className={
									msg.isAuthor === array[Math.max(i - 1, 0)].isAuthor
										? ''
										: 'mt-2'
								}
								bgColor={msg.isAuthor ? 'background_50' : color50}
								isAuthor={msg.isAuthor}
								authorName={msg.authorName}
								date={msg.date}
							>
								{msg.text}
							</ChatMessageText>
						))}
					</VStack>
				</ScrollContainer>
			)}
		</Drawer>
	)
}
