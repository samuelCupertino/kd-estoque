/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useState } from 'react'

interface IUseIdeogramAIOptions {
	apiKey?: string
	onResponseImage?: (event: { imageUrl: string; data: any }) => void
}

interface IUseIdeogramAIResult {
	isLoading: boolean
	error: string | null
	imageResponse: string | null
	generateImage: (
		prompt: string,
		style?: string,
		aspectRatio?: string,
	) => Promise<void>
}

export const useIdeogramAI = ({
	apiKey = process.env.EXPO_PUBLIC_EduarteAI_KEY,
	onResponseImage,
}: IUseIdeogramAIOptions): IUseIdeogramAIResult => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [imageResponse, setImageResponse] = useState<string | null>(null)

	const generateImage = useCallback(
		async (prompt: string, style = 'realistic', aspectRatio = '1:1') => {
			setIsLoading(true)
			setError(null)
			setImageResponse(null)

			try {
				const res = await fetch('https://api.ideogram.ai/v1/generate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Api-Key': apiKey,
					},
					body: JSON.stringify({
						prompt,
						style,
						aspect_ratio: aspectRatio,
					}),
				})

				if (!res.ok) {
					throw new Error(`Erro HTTP! status: ${res.status}`)
				}

				const data = await res.json()
				const imageUrl = data?.data?.[0]?.url ?? null

				if (imageUrl) {
					setImageResponse(imageUrl)
					onResponseImage?.({ imageUrl, data: data?.data })
				} else {
					setError('Nenhuma imagem foi gerada.')
				}
			} catch (err) {
				console.error('Erro ao gerar imagem com Ideogram:', err)
				setError('Erro ao obter imagem do Ideogram.')
			} finally {
				setIsLoading(false)
			}
		},
		[apiKey, onResponseImage],
	)

	return {
		isLoading,
		error,
		imageResponse,
		generateImage,
	}
}
