import { Button, ButtonCircle } from '@/components/atoms'
import {
	Drawer,
	IDrawerProps,
	AnimatedAI,
	IAnimatedAIStatus,
} from '@/components/molecules'

import { ComponentProps, useRef } from 'react'
import { HStack } from '@/components/ui/hstack'
import { useSpeechRecognitionWeb } from '@/hooks/useSpeechRecognitionWeb'
import { useTextToSpeechWeb } from '@/hooks/useTextToSpeechWeb'
import { useAnnaLisaAI } from '@/hooks/useAnnaLisaAI'

export interface IAIAnnaLisaCallDrawerProps
	extends Omit<
		IDrawerProps,
		'renderButton' | 'title' | 'subtitle' | 'iconName'
	> {
	buttonProps?: ComponentProps<typeof Button>
}

export const AIAnnaLisaCallDrawer = ({
	buttonProps,
	...props
}: IAIAnnaLisaCallDrawerProps) => {
	const statusRef = useRef<IAnimatedAIStatus>('listening')

	const { askAnnaLisaText } = useAnnaLisaAI({
		onResponseText: (text) => {
			if (statusRef.current === 'thinking') startSpeaking(text)
		},
	})

	const {
		isSpeaking,
		startSpeaking,
		pauseSpeaking,
		resumeSpeaking,
		abortSpeaking,
	} = useTextToSpeechWeb({
		rate: 1.3,
		onStart: () => (statusRef.current = 'speaking'),
		onPause: () => (statusRef.current = 'speaking-paused'),
		onFinish: () => startQuickListen(),
		onAbort: () => (statusRef.current = 'listening'),
	})

	const { isListening, startQuickListen, abortListening } =
		useSpeechRecognitionWeb({
			onStart: () => (statusRef.current = 'listening'),
			onFinish: (transcript) => {
				statusRef.current = 'thinking'
				askAnnaLisaText(transcript)
			},
			onAbort: () => (statusRef.current = 'listening-paused'),
		})

	return (
		<Drawer
			title="Anna Lisa"
			subtitle="Analista de Dados"
			iconName="Database"
			iconColor="tertiary_400"
			onClose={() => {
				abortListening()
				abortSpeaking()
			}}
			renderButton={({ setIsOpen }) => (
				<Button
					iconProps={{ name: 'Phone' }}
					baseColor="tertiary"
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
			)}
			{...props}
		>
			<AnimatedAI
				status={statusRef.current}
				className="mt-32 mx-auto"
				color="tertiary_400"
			/>
		</Drawer>
	)
}
