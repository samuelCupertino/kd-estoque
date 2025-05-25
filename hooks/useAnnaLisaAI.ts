import { useState, useCallback } from 'react'

interface IUseAnnaLisaAIOptions {
	apiKey?: string
	onResponseText?: (text: string) => void
}

interface IUseAnnaLisaAIResult {
	isLoading: boolean
	error: string | null
	response: string | null
	askAnnaLisaText: (text: string) => Promise<void>
}

export const useAnnaLisaAI = ({
	apiKey = process.env.EXPO_PUBLIC_AnnaLisaAI_KEY,
	onResponseText,
}: IUseAnnaLisaAIOptions): IUseAnnaLisaAIResult => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [response, setResponse] = useState<string | null>(null)

	const buildRequestData = (text: string) => ({
		model: 'deepseek-chat',
		messages: [
			{
				role: 'system',
				content: `Você é Anna Lisa, analista de dados especializada no varejo de material escolar e papelaria com 10 anos de experiência na Papelaria Nova Era. Seu foco exclusivo é análise de:
	
				- Vendas de produtos de papelaria, material escolar, escritório e artigos criativos
				- Gestão de estoque para este segmento específico
				- Tendências sazonais do setor (volta às aulas, fim de ano, etc.)
				- Comportamento do consumidor em papelarias
	
				Regras estritas:
				1. Só responda sobre negócios de papelaria/material escolar
				2. Dê respostas baseadas em dados concretos, citando métricas quando possível
				3. Mantenha tom profissional mas acessível (máximo 40 palavras)
				4. Priorize insights acionáveis para melhorar vendas ou reduzir custos
				5. Para sugestões, sempre considere: sazonalidade, concorrência local e perfil da clientela
	
				Exemplo de respostas ideais:
				"Nossos cadernos premium têm margem 30% maior. Sugiro destacá-los na entrada."
				"O estoque de canetas está 20% acima da média. Podemos fazer um combo com folhas."
				"Isso não faz parte do nosso core business, mas posso analisar como diversificar com produtos complementares como lancheiras."`,
			},
			{ role: 'user', content: text },
		],
		stream: false,
	})

	const askAnnaLisaText = useCallback(
		async (text: string) => {
			setIsLoading(true)
			setError(null)
			setResponse(null)

			try {
				const res = await fetch('https://api.deepseek.com/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apiKey}`,
					},
					body: JSON.stringify(buildRequestData(text)),
				})

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}

				const data = await res.json()
				const message = data?.choices?.[0]?.message?.content ?? null

				if (message) {
					setResponse(message)
					onResponseText?.(message)
				} else {
					setError('Resposta vazia recebida.')
				}
			} catch (err) {
				console.error('Erro ao perguntar para Anna Lisa:', err)
				setError('Erro ao obter resposta de Anna Lisa.')
			} finally {
				setIsLoading(false)
			}
		},
		[apiKey, onResponseText],
	)

	return {
		isLoading,
		error,
		response,
		askAnnaLisaText,
	}
}
