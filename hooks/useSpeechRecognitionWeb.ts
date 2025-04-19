/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react'

interface UseSpeechRecognitionOptions {
	lang?: string
	continuous?: boolean
	interimResults?: boolean
	onStart?: () => void
	onFinish?: (finalTranscript: string) => void
	onAbort?: () => void
}

export const useSpeechRecognitionWeb = ({
	lang = 'pt-BR',
	continuous = true,
	interimResults = true,
	onStart,
	onFinish,
	onAbort,
}: UseSpeechRecognitionOptions = {}) => {
	const recognitionRef = useRef<any>(null)
	const [isSupported, setIsSupported] = useState(false)
	const [isListening, setIsListening] = useState(false)
	const [isFinished, setIsFinished] = useState(false)
	const [transcript, setTranscript] = useState('')
	const transcriptRef = useRef('')
	const configRef = useRef({
		lang,
		continuous,
		interimResults,
	})
	const endedRef = useRef(false)
	const abortedRef = useRef(false)

	useEffect(() => {
		if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
			setIsSupported(true)
		}
	}, [])

	const createRecognition = (options: {
		lang: string
		continuous: boolean
		interimResults: boolean
	}) => {
		const SpeechRecognition = (window as any).webkitSpeechRecognition

		if (typeof SpeechRecognition === 'undefined') return
		const recognition = new SpeechRecognition()

		recognition.continuous = options.continuous
		recognition.interimResults = options.interimResults
		recognition.lang = options.lang

		recognition.onstart = () => {
			setIsListening(true)
			setIsFinished(false)
			endedRef.current = false
			abortedRef.current = false
			transcriptRef.current = ''
			onStart?.()
		}

		recognition.onresult = (event: any) => {
			let finalTranscript = ''
			for (let i = event.resultIndex; i < event.results.length; i++) {
				finalTranscript += event.results[i][0].transcript
			}
			transcriptRef.current = finalTranscript
			setTranscript(finalTranscript)
		}

		recognition.onerror = (event: any) => {
			console.error('Erro no reconhecimento de voz:', event.error)
		}

		recognition.onend = () => {
			setIsListening(false)
			setIsFinished(true)

			if (abortedRef.current) {
				onAbort?.()
				return
			}

			if (!endedRef.current) {
				if (!transcriptRef.current) {
					onAbort?.()
					return
				}
				onFinish?.(transcriptRef.current)
			}
		}

		return recognition
	}

	const startListening = () => {
		if (typeof window === 'undefined') return

		const rec = createRecognition(configRef.current)
		recognitionRef.current = rec
		setTranscript('')
		transcriptRef.current = ''
		rec?.start()
	}

	const startQuickListen = () => {
		if (typeof window === 'undefined') return

		const rec = createRecognition({
			...configRef.current,
			continuous: false,
		})
		recognitionRef.current = rec
		setTranscript('')
		transcriptRef.current = ''
		rec?.start()
	}

	const finishListening = () => {
		if (typeof window === 'undefined') return

		endedRef.current = false
		abortedRef.current = false
		recognitionRef.current?.stop()
	}

	const abortListening = () => {
		if (typeof window === 'undefined') return

		abortedRef.current = true
		endedRef.current = true
		recognitionRef.current?.abort()
		setIsListening(false)
	}

	return {
		isSupported,
		isListening,
		isFinished,
		transcript,
		startListening,
		startQuickListen,
		finishListening,
		abortListening,
	}
}
