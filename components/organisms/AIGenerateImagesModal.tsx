import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import { Button, ButtonCircle, Divider } from '@/components/atoms'
import { HStack } from '@/components/ui/hstack'
import {
	InputTexareatField,
	Modal,
	IModalProps,
	InputImagesField,
} from '@/components/molecules'
import { useState } from 'react'

interface IAIGenerateImagesModalProps extends Partial<IModalProps> {}

export const AIGenerateImagesModal = ({
	...props
}: IAIGenerateImagesModalProps) => {
	const [isInputText, setIsInputText] = useState(true)

	return (
		<Modal
			iconName="BotMessageSquare"
			title="Gerar imagem com IA"
			subtitle="Gere imagem com texto ou voz"
			renderButton={({ setIsOpen }) => (
				<Button
					baseColor="secondary"
					iconProps={{ name: 'BotMessageSquare' }}
					onPress={() => {
						setIsOpen(true)
					}}
				>
					Gerar imagem com IA
				</Button>
			)}
			renderFooter={({ setIsOpen }) => (
				<Button
					baseColor="secondary"
					onPress={() => {
						setIsOpen(true)
					}}
				>
					Usar imagem gerada
				</Button>
			)}
			{...props}
		>
			<VStack className="gap-4 h-full flex-1 p-4">
				<Box className="w-full h-48 mx-auto border-2 border-background-200 dark:border-background-100 rounded-xl overflow-hidden">
					<Image
						className="h-full mx-auto"
						source={{
							uri: 'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
						}}
						alt="imagem gerada por IA"
					/>
				</Box>

				<Divider title="Contexto para geração de imagens" />
				<InputImagesField />
				<HStack className="gap-2">
					<Box className="flex-1">
						<InputTexareatField placeholder="Digite o texto ou mande um audio pedindo para IA gerar uma ou mais imagens do jeito que você quer." />
						{!isInputText && (
							<Box className="bg-background-200 dark:bg-background-100 rounded-xl absolute inset-0" />
						)}
					</Box>

					<VStack className="gap-2 justify-between">
						<ButtonCircle
							iconProps={{
								name: isInputText ? 'Mic' : 'Keyboard',
							}}
							size="md"
							onPress={() => setIsInputText(!isInputText)}
						/>
						<ButtonCircle
							iconProps={{ name: 'Send' }}
							size="md"
							className="bg-green-400 dark:bg-green-800"
						/>
					</VStack>
				</HStack>
			</VStack>
		</Modal>
	)
}
