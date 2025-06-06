import { Button, ButtonCircle } from '@/components/atoms'
import {
	Drawer,
	IDrawerProps,
	AnimatedAI,
	IAnimatedAIStatus,
} from '@/components/molecules'

import { ComponentProps, useRef, useState } from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Divider } from '@/components/ui/divider'
import { Image } from '@/components/atoms'
import { useSpeechRecognitionWeb } from '@/hooks/useSpeechRecognitionWeb'
import { useTextToSpeechWeb } from '@/hooks/useTextToSpeechWeb'
import { useEduarteAI } from '@/hooks/useEduarteAI'

export interface IAIEduarteCallDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {
	buttonProps?: ComponentProps<typeof Button>
}

export const AIEduarteCallDrawer = ({
	buttonProps,
	...props
}: IAIEduarteCallDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')
	const [imageUri, setImageUri] = useState('')

	const { askEduarteImage } = useEduarteAI({
		onResponseImage: ({ imageUrl }) => {
			setImageUri(imageUrl)
			if (statusRef.current === 'thinking') {
				startSpeaking('Pronto, imagem gerada!')
			}
		},
	})

	const {
		isSpeaking,
		startSpeaking,
		pauseSpeaking,
		resumeSpeaking,
		abortSpeaking,
	} = useTextToSpeechWeb({
		voiceName: 'Shelley (português (Brasil))',
		onStart: () => (statusRef.current = 'speaking'),
		onPause: () => (statusRef.current = 'speaking-paused'),
		onFinish: () => startQuickListen(),
	})

	const { isListening, startQuickListen, abortListening } =
		useSpeechRecognitionWeb({
			onStart: () => {
				statusRef.current = 'listening'
			},
			onFinish: (transcript) => {
				statusRef.current = 'thinking'
				setImageUri('')
				askEduarteImage(transcript)
			},
			onAbort: () => (statusRef.current = 'listening-paused'),
		})

	return (
		<Drawer
			title="Eduarte"
			subtitle="Designer Gráfico"
			iconName="Palette"
			iconColor="quaternary_400"
			onClose={() => {
				abortListening()
				abortSpeaking()
			}}
			renderButton={({ setIsOpen }) => (
				<Button
					iconProps={{ name: 'Phone' }}
					baseColor="quaternary"
					onPress={() => {
						setIsOpen(true)
						startQuickListen()
					}}
					{...buttonProps}
				>
					Ligar
				</Button>
			)}
			renderFooter={({ setIsOpen }) => (
				<VStack className="w-full gap-4">
					<Divider />
					<HStack className="gap-4 mx-auto">
						<ButtonCircle
							size={{ base: 'lg', sm: 'md' }}
							iconProps={{ name: 'Ellipsis' }}
						/>
						<ButtonCircle
							size={{ base: 'lg', sm: 'md' }}
							iconProps={{ name: isSpeaking ? 'Volume2' : 'VolumeOff' }}
							onPress={() => (isSpeaking ? pauseSpeaking() : resumeSpeaking())}
						/>
						<ButtonCircle
							size={{ base: 'lg', sm: 'md' }}
							iconProps={{ name: isListening ? 'Mic' : 'MicOff' }}
							onPress={() =>
								isListening ? abortListening() : startQuickListen()
							}
						/>
						<ButtonCircle
							size={{ base: 'lg', sm: 'md' }}
							iconProps={{ name: 'Phone', color: 'red_900' }}
							onPress={() => {
								abortListening()
								abortSpeaking()
								setIsOpen(false)
							}}
						/>
					</HStack>
				</VStack>
			)}
			{...props}
		>
			<AnimatedAI
				status={statusRef.current}
				className="mx-auto"
				color="quaternary_400"
			/>

			{!!imageUri && (
				<Image
					className="w-72 h-72 mx-auto mt-8 rounded-xl"
					source={{ uri: imageUri }}
					alt="imagem gerada pelo Eduardo"
				/>
			)}
		</Drawer>
	)
}
