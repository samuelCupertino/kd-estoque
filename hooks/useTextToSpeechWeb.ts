/* eslint-disable no-undef */
import { useState, useEffect, useRef } from 'react'

interface UseTextToSpeechOptions {
	lang?: string
	rate?: number
	pitch?: number
	volume?: number
	voiceName?: string
	onStart?: () => void
	onFinish?: () => void
	onPause?: () => void
	onAbort?: () => void
}

export const useTextToSpeechWeb = ({
	lang = 'pt-BR',
	rate = 1,
	pitch = 1,
	volume = 1,
	voiceName = 'Luciana',
	onStart,
	onFinish,
	onPause,
	onAbort,
}: UseTextToSpeechOptions = {}) => {
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [availableVoices, setAvailableVoices] = useState<
		SpeechSynthesisVoice[]
	>([])
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const endedRef = useRef(false)
	const pausedRef = useRef(false)

	const fullTextRef = useRef('')
	const currentIndexRef = useRef(0)

	// Função robusta para carregar vozes, tentando até estarem disponíveis
	const loadVoices = () =>
		new Promise<SpeechSynthesisVoice[]>((resolve) => {
			const tryLoad = () => {
				const voices = window.speechSynthesis.getVoices()
				if (voices.length > 0) {
					resolve(voices)
				} else {
					setTimeout(tryLoad, 200)
				}
			}
			tryLoad()
		})

	useEffect(() => {
		let isMounted = true

		const setupVoices = async () => {
			const voices = await loadVoices()
			if (isMounted) setAvailableVoices(voices)
		}

		setupVoices()

		const handleVoicesChanged = () => {
			loadVoices().then((voices) => {
				if (isMounted) setAvailableVoices(voices)
			})
		}

		window.speechSynthesis?.addEventListener(
			'voiceschanged',
			handleVoicesChanged,
		)

		return () => {
			isMounted = false
			window.speechSynthesis?.removeEventListener(
				'voiceschanged',
				handleVoicesChanged,
			)
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [])

	const speakFromIndex = (startIndex: number) => {
		const text = fullTextRef.current.slice(startIndex)
		if (!text) return

		endedRef.current = false
		pausedRef.current = false

		const selectedVoice =
			availableVoices.find((v) => v.name === voiceName) ??
			availableVoices.find((v) => v.lang === lang)

		const utterance = new SpeechSynthesisUtterance(text)
		utterance.lang = lang
		utterance.rate = rate
		utterance.pitch = pitch
		utterance.volume = volume
		utterance.voice = selectedVoice || null

		utterance.onstart = () => {
			setIsSpeaking(true)
			onStart?.()

			intervalRef.current = setInterval(() => {
				if (!window.speechSynthesis.speaking) {
					handleEnd()
				}
			}, 250)
		}

		utterance.onboundary = (event) => {
			if (event.name === 'word') {
				currentIndexRef.current = startIndex + event.charIndex
			}
		}

		utterance.onend = handleEnd
		utterance.onerror = handleEnd

		utteranceRef.current = utterance
		window.speechSynthesis.speak(utterance)
	}

	const handleEnd = () => {
		if (!endedRef.current) {
			endedRef.current = true
			setIsSpeaking(false)
			if (intervalRef.current) clearInterval(intervalRef.current)

			if (pausedRef.current) {
				onPause?.()
			} else {
				onFinish?.()
				currentIndexRef.current = 0
				fullTextRef.current = ''
			}
		}
	}

	const startSpeaking = (text: string) => {
		abortSpeaking()
		fullTextRef.current = text
		currentIndexRef.current = 0
		speakFromIndex(0)
	}

	const pauseSpeaking = () => {
		if (window.speechSynthesis.speaking || isSpeaking) {
			endedRef.current = true
			pausedRef.current = true
			window.speechSynthesis.cancel()
			setIsSpeaking(false)
			if (intervalRef.current) clearInterval(intervalRef.current)
			onPause?.()
		}
	}

	const resumeSpeaking = () => {
		if (!isSpeaking && pausedRef.current && fullTextRef.current) {
			speakFromIndex(currentIndexRef.current)
		}
	}

	const abortSpeaking = () => {
		if (window.speechSynthesis?.speaking || isSpeaking) {
			endedRef.current = false
			pausedRef.current = false
			window.speechSynthesis.cancel()
			setIsSpeaking(false)
			if (intervalRef.current) clearInterval(intervalRef.current)
			currentIndexRef.current = 0
			fullTextRef.current = ''
			onAbort?.()
		}
	}

	return {
		isSpeaking,
		startSpeaking,
		pauseSpeaking,
		resumeSpeaking,
		abortSpeaking,
		availableVoices,
	}
}
