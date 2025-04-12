import { Drawer, IDrawerProps } from '../molecules'
import {
	ButtonCircle,
	Icon,
	IAnimatedAIStatus,
	Text,
	AnimatedAI,
} from '../atoms'

import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { Alert } from 'react-native'
import { Pressable } from '../ui/pressable'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Divider } from '../ui/divider'

export interface IAIAgentCallDrawerProps
	extends Omit<IDrawerProps, 'renderButton'> {}

export const AIAgentCallDrawer = ({ ...props }: IAIAgentCallDrawerProps) => {
	const [text, setText] = useState('')
	const [recording, setRecording] = useState<Audio.Recording>()
	const [isListening, setIsListening] = useState(false)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [isThinking, setIsThinking] = useState(false)
	const [animatedAIStatus, setAnimatedAIStatus] =
		useState<IAnimatedAIStatus>('listening')

	// const [AIResponse, setAIResponse] = useState(false)
	// const [AISpeaking, setAISpeaking] = useState(false)

	// get microphone permission
	const getMicrophonePermission = async () => {
		try {
			const { granted } = await Audio.requestPermissionsAsync()

			if (!granted) {
				Alert.alert(
					'Permission',
					'Please grant permission to access microphone',
				)
				return false
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const recordingOptions: any = {
		android: {
			extension: '.wav',
			outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
			androidEncoder: Audio.AndroidAudioEncoder.AAC,
			sampleRate: 44100,
			numberOfChannels: 2,
			bitRate: 128000,
		},
		ios: {
			extension: '.wav',
			audioQuality: Audio.IOSAudioQuality.HIGH,
			sampleRate: 44100,
			numberOfChannels: 2,
			bitRate: 128000,
			linearPCMBitDepth: 16,
			linearPCMIsBigEndian: false,
			linearPCMIsFloat: false,
		},
	}

	const startRecording = async () => {
		const hasPermission = await getMicrophonePermission()
		if (!hasPermission) return
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			})
			setIsListening(true)
			const { recording } = await Audio.Recording.createAsync(recordingOptions)
			setRecording(recording)
		} catch (error) {
			console.log('Failed to start Recording', error)
			Alert.alert('Error', 'Failed to start recording')
		}
	}

	const stopRecording = async () => {
		try {
			setIsListening(false)
			// setIsThinking(true)
			await recording?.stopAndUnloadAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
			})

			const uri = recording?.getURI()

			// send audio to whisper API for transcription
			const transcript = 'chama a api para transcrever' //await sendAudioToWhisper(uri!)

			setText(transcript)

			// send the transcript to gpt-4 API for response
			// await sendToGpt(transcript)
		} catch (error) {
			console.log('Failed to stop Recording', error)
			Alert.alert('Error', 'Failed to stop recording')
		}
	}

	useEffect(() => {
		setAnimatedAIStatus('listening')
		// setTimeout(() => setAnimatedAIStatus('listening-paused'), 4000)
		setTimeout(() => setAnimatedAIStatus('thinking'), 4000)
		setTimeout(() => setAnimatedAIStatus('speaking'), 8000)
		// setTimeout(() => setAnimatedAIStatus('speaking-paused'), 16000)
	}, [isListening])

	return (
		<Drawer
			renderButton={({ setShowDrawer }) => (
				<Pressable
					className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-green-200 dark:bg-green-950 hover:bg-green-300 hover:dark:bg-green-900 rounded-xl"
					onPress={() => setShowDrawer(true)}
				>
					<Icon name="Phone" size={20} color="typography_700" />
					<Text size="lg" color="typography_700">
						Ligar
					</Text>
				</Pressable>
			)}
			renderFooter={({ setShowDrawer }) => (
				<VStack className="w-full gap-4">
					<Divider />
					<HStack className="gap-4 mx-auto">
						<ButtonCircle
							iconProps={{ name: 'Ellipsis' }}
							onPress={() => stopRecording()}
						/>
						<ButtonCircle
							iconProps={{ name: isSpeaking ? 'Volume2' : 'VolumeOff' }}
							onPress={() => setIsSpeaking(!isSpeaking)}
						/>
						<ButtonCircle
							iconProps={{ name: isListening ? 'Mic' : 'MicOff' }}
							onPress={() => (isListening ? stopRecording() : startRecording())}
						/>
						<ButtonCircle
							iconProps={{ name: 'Phone', color: 'red_900' }}
							onPress={() => {
								if (isListening) stopRecording()
								setShowDrawer(false)
							}}
						/>
					</HStack>
				</VStack>
			)}
			{...props}
		>
			<AnimatedAI
				status={animatedAIStatus}
				className="mt-32 mx-auto"
				color={props.iconColor}
			/>
		</Drawer>
	)
}
