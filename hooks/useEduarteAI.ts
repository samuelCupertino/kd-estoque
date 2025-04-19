/* eslint-disable no-undef */
import { useCallback, useState } from 'react'

interface IUseEduarteAIOptions {
	apiKey?: string
	onResponseImage?: (event: { imageUrl: string; data: any }) => void
	onResponseText?: (text: string) => void
}

interface IUseEduarteAIResult {
	isLoading: boolean
	error: string | null
	imageResponse: string | null
	textResponse: string | null
	askEduarteImage: (prompt: string) => Promise<void>
	askEduarteText: (prompt: string) => Promise<void>
}

export const useEduarteAI = ({
	apiKey = process.env.EXPO_PUBLIC_EduarteAI_KEY,
	onResponseImage,
	onResponseText,
}: IUseEduarteAIOptions): IUseEduarteAIResult => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [imageResponse, setImageResponse] = useState<string | null>(null)
	const [textResponse, setTextResponse] = useState<string | null>(null)

	const askEduarteImage = useCallback(
		async (prompt: string) => {
			setIsLoading(true)
			setError(null)
			setImageResponse(null)

			try {
				const res = await fetch(
					'https://api.openai.com/v1/images/generations',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${apiKey}`,
						},
						body: JSON.stringify({
							model: 'dall-e-3',
							prompt,
							n: 1,
							size: '1024x1024',
							response_format: 'url',
							style: 'natural',
							quality: 'hd',
						}),
					},
				)

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
				console.error('Erro ao gerar imagem com Eduarte:', err)
				setError('Erro ao obter imagem de Eduarte.')
			} finally {
				setIsLoading(false)
			}
		},
		[apiKey, onResponseImage],
	)

	const askEduarteText = useCallback(
		async (prompt: string) => {
			setIsLoading(true)
			setError(null)
			setTextResponse(null)

			try {
				const res = await fetch('https://api.openai.com/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apiKey}`,
					},
					body: JSON.stringify({
						model: 'gpt-4o',
						messages: [
							{
								role: 'system',
								content: `Você é Eduarte, designer gráfico especializado em produtos de papelaria, com 7 anos de experiência na Papelaria Nova Era. Seu trabalho envolve:
								
								Atribuições:
								- Criar artes para: materiais escolares, produtos de papelaria, embalagens, promoções e mídias sociais
								- Manter a identidade visual da marca (cores: azul royal e dourado, logo clássico com estilo premium)
								- Gerar imagens realistas e comercialmente viáveis de produtos
								- Responder com respostas curtas com no máximo 30 palavras, responda somente com palavras, sem símbolos ou quaisquer outros caracteres especiais, use somente palavras e números
								
								Diretrizes de criação:
								1. Estilo: Clean, profissional com toque criativo (evitar infantilizações ou excesso de elementos)
								2. Foco em: Legibilidade, aplicação prática e apelo comercial
								3. Produtos frequentes: Cadernos, canetas, kits criativos, material de escritório
								4. Contextos preferidos: Mesas de estudo, ambientes de trabalho, setups organizados
								
								Regras rígidas:
								- NUNCA gerar imagens fora do contexto de papelaria/escritório
								- Sempre incluir o logo discretamente (canto inferior direito)
								- Priorizar fundos neutros (branco, madeira clara, mármore suave)
								- Usar paleta corporativa: 3 cores principais no máximo
								
								Exemplos de prompts ideais para você converter em imagens:
								"Caderno premium aberto sobre mesa de madeira com caneta dourada e óculos de leitura, luz natural"
								"Kit volta às aulas com estojo, lápis e régua sobre fundo azul claro"
								"Banner promocional para canetas gel com 30% de desconto, estilo minimalista"
								
								Respostas típicas suas:
								"Criei uma proposta de capa para o novo caderno executivo. Quer ajustar algum detalhe?"
								"Sugiro fotos reais dos produtos para o catálogo - posso simular como ficaria"
								"Isso é fora do nosso escopo, mas posso sugerir ideias para embalagens de presentes"`,
							},
							{
								role: 'user',
								content: prompt,
							},
						],
					}),
				})

				if (!res.ok) {
					throw new Error(`Erro HTTP! status: ${res.status}`)
				}

				const data = await res.json()
				const message = data?.choices?.[0]?.message?.content ?? null

				if (message) {
					setTextResponse(message)
					onResponseText?.(message)
				} else {
					setError('Resposta vazia recebida.')
				}
			} catch (err) {
				console.error('Erro ao obter resposta de Eduarte:', err)
				setError('Erro ao obter resposta de Eduarte.')
			} finally {
				setIsLoading(false)
			}
		},
		[apiKey, onResponseText],
	)

	return {
		isLoading,
		error,
		imageResponse,
		textResponse,
		askEduarteImage,
		askEduarteText,
	}
}
