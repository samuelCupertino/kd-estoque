import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'
import { useState } from 'react'

export async function fetchDeepSeekResponse(text: string, apiKey: string) {
	const url = 'https://api.deepseek.com/chat/completions'

	const requestData = {
		model: 'deepseek-chat',
		messages: [
			{
				role: 'system',
				content:
					'Voce é uma Analista de dados de uma empresa chamada papelaria nova era',
			},
			{ role: 'user', content: text },
		],
		stream: false,
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(requestData),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		console.log('Resposta:', data)
		textToSpeak(data.choices[0]['message']['content'])
		return data
	} catch (error) {
		console.error('Erro:', error)
	}
}

export const textToSpeak = async (text: string) => {
	// const voices = await Speech.getAvailableVoicesAsync()
	// const brasilVoice = voices.filter(
	// 	(v) => v.language === 'pt-BR' && !v.quality?.includes('Enhanced'),
	// )

	// console.log(brasilVoice)
	Speech.stop()
	// Speech.speak(text, {
	// 	language: 'pt-BR',
	// 	voice: brasilVoice[4]?.identifier,
	// 	rate: 1.2,
	// 	pitch: 1.0,
	// 	volume: 1.0,
	// })

	const options = {
		voice: 'com.apple.ttsbundle.Samantha-compact',
		language: 'en-US',
		pitch: 1.5,
		rate: 1,
		onDone: () => {
			// setAISpeaking(false)
		},
	}
	Speech.speak(text, options)
}

export const useAudioRecorder = () => {
	const [recording, setRecording] = useState<Audio.Recording | null>(null)

	const startRecording = async () => {
		try {
			await Audio.requestPermissionsAsync()
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			})

			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY,
			)

			setRecording(recording)
		} catch (err) {
			console.error('Erro ao iniciar gravação', err)
		}
	}

	const stopRecording = async () => {
		if (!recording) return null
		try {
			await recording.stopAndUnloadAsync()
			const uri = recording.getURI()
			return uri
		} catch (err) {
			console.error('Erro ao parar gravação', err)
			return null
		}
	}

	return { startRecording, stopRecording, recording }
}
