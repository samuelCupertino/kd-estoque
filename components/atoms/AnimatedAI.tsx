import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { HStack } from '../ui/hstack'
import { isThemeColor, IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { twMerge } from 'tailwind-merge'
import { Text } from './Text'

export type IAnimatedAIStatus =
	| 'speaking'
	| 'speaking-paused'
	| 'listening'
	| 'listening-paused'
	| 'thinking'

export interface AnimatedAIProps extends ComponentProps<typeof HStack> {
	status: IAnimatedAIStatus
	color?: IThemeColor | (string & {})
	size?: number
	barCount?: number
	barWidth?: number
	barHeight?: number
	barSpacing?: number
}

const titles: Record<IAnimatedAIStatus, string> = {
	speaking: 'Falando...',
	'speaking-paused': 'Ative o som!',
	listening: 'Ouvindo...',
	'listening-paused': 'Ative o microfone!',
	thinking: 'Pensando...',
}

export const AnimatedAI: React.FC<AnimatedAIProps> = ({
	status,
	color = 'secondary_400',
	size = 100,
	barCount = 6,
	barWidth = size / 12,
	barHeight = size / 2,
	barSpacing = size / 12,
	className,
	style,
	...props
}) => {
	const resolvedColor = useThemeColor(isThemeColor(color) ? color : 'white')
	const indicatorColor = isThemeColor(color) ? resolvedColor : color

	const [currentTitle, setCurrentTitle] = useState(titles[status])
	const titleOpacity = useRef(new Animated.Value(1)).current

	const barAnims = useRef<Animated.Value[]>([]).current
	const scaleAnim = useRef(new Animated.Value(1)).current
	const thinkingAnims = useRef<Animated.Value[]>([]).current
	const listeningOpacity = useRef(new Animated.Value(1)).current
	const thinkingOpacity = useRef(new Animated.Value(0)).current

	if (barAnims.length !== barCount) {
		barAnims.splice(0, barAnims.length)
		for (let i = 0; i < barCount; i++) {
			barAnims.push(new Animated.Value(0))
		}
	}

	if (thinkingAnims.length !== 5) {
		thinkingAnims.splice(0, thinkingAnims.length)
		for (let i = 0; i < 5; i++) {
			thinkingAnims.push(new Animated.Value(0))
		}
	}

	useEffect(() => {
		let pulseAnimation: Animated.CompositeAnimation | undefined
		let barAnimations: Animated.CompositeAnimation[] = []
		let thinkingAnimations: Animated.CompositeAnimation[] = []

		// Limpa todas as animações anteriores
		if (pulseAnimation) {
			pulseAnimation.stop()
		}
		barAnimations.forEach((animation) => animation.stop())
		thinkingAnimations.forEach((animation) => animation.stop())

		// Animação de escuta (círculo pulsante)
		if (status === 'listening') {
			// Anima a opacidade do círculo de escuta
			Animated.timing(listeningOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start()

			// Anima a opacidade do círculo de pensamento
			Animated.timing(thinkingOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start()

			// Primeiro, anima para o tamanho normal
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				// Depois inicia a animação de pulsação
				pulseAnimation = Animated.loop(
					Animated.sequence([
						Animated.timing(scaleAnim, {
							toValue: 1.3,
							duration: 500,
							useNativeDriver: true,
						}),
						Animated.timing(scaleAnim, {
							toValue: 1,
							duration: 500,
							useNativeDriver: true,
						}),
					]),
				)
				pulseAnimation.start()
			})
		} else if (status === 'thinking') {
			// Anima a opacidade do círculo de escuta
			Animated.timing(listeningOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start()

			// Anima a opacidade do círculo de pensamento
			Animated.timing(thinkingOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start()

			// Para a animação de pulsação se estiver ativa
			if (pulseAnimation) {
				pulseAnimation.stop()
			}

			// Retorna ao tamanho normal
			scaleAnim.setValue(1)

			// Inicia as animações de pensamento
			thinkingAnims.forEach((anim, index) => {
				const animation = Animated.loop(
					Animated.sequence([
						Animated.timing(anim, {
							toValue: 1,
							duration: 2000,
							delay: index * 300,
							useNativeDriver: true,
						}),
						Animated.timing(anim, {
							toValue: 0,
							duration: 2000,
							useNativeDriver: true,
						}),
					]),
				)
				animation.start()
				thinkingAnimations.push(animation)
			})
		} else if (status === 'listening-paused') {
			// Para a animação de pulsação se estiver ativa
			if (pulseAnimation) {
				pulseAnimation.stop()
			}

			// Anima para o tamanho reduzido
			Animated.timing(scaleAnim, {
				toValue: 0.5,
				duration: 300,
				useNativeDriver: true,
			}).start()
		} else {
			// Para a animação de pulsação se estiver ativa
			if (pulseAnimation) {
				pulseAnimation.stop()
			}

			// Retorna ao tamanho normal
			scaleAnim.setValue(1)
		}

		// Animação de fala (barras)
		if (status === 'speaking') {
			// Para todas as animações de barras se estiverem ativas
			barAnimations.forEach((animation) => animation.stop())

			// Primeiro, anima todas as barras para o valor inicial
			const initialAnimations = barAnims.map((anim) =>
				Animated.timing(anim, {
					toValue: 0.3,
					duration: 300,
					useNativeDriver: true,
				}),
			)

			// Executa a animação inicial e depois inicia o loop
			Animated.parallel(initialAnimations).start(() => {
				// Depois inicia a animação de pulsação
				barAnims.forEach((anim, index) => {
					const animation = Animated.loop(
						Animated.sequence([
							Animated.timing(anim, {
								toValue: 1,
								duration: 300,
								delay: index * 100,
								useNativeDriver: true,
							}),
							Animated.timing(anim, {
								toValue: 0,
								duration: 300,
								useNativeDriver: true,
							}),
						]),
					)
					animation.start()
					barAnimations.push(animation)
				})
			})
		} else if (status === 'speaking-paused') {
			// Para todas as animações de barras se estiverem ativas
			barAnimations.forEach((animation) => animation.stop())

			// Define todas as barras para uma altura intermediária
			barAnims.forEach((anim) => {
				Animated.timing(anim, {
					toValue: 0.5,
					duration: 300,
					useNativeDriver: true,
				}).start()
			})
		} else {
			barAnims.forEach((anim) => {
				anim.stopAnimation()
				anim.setValue(0)
			})
		}

		// Animação de texto
		if (titles[status] !== currentTitle) {
			// Fade out
			Animated.timing(titleOpacity, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				setCurrentTitle(titles[status])
				// Fade in
				Animated.timing(titleOpacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}).start()
			})
		}

		// Limpeza
		return () => {
			if (pulseAnimation) {
				pulseAnimation.stop()
			}
			barAnimations.forEach((animation) => animation.stop())
			thinkingAnimations.forEach((animation) => animation.stop())
		}
	}, [status])

	return (
		<HStack
			className={twMerge('items-center justify-center', className)}
			style={{ height: size * 2, ...(style as object) }}
			{...props}
		>
			{/* Animação de fala */}
			{(status === 'speaking' || status === 'speaking-paused') && (
				<View style={{ flexDirection: 'row' }}>
					{barAnims.map((anim, index) => (
						<Animated.View
							key={index}
							style={{
								width: barWidth,
								height: barHeight,
								marginHorizontal: barSpacing / 2,
								backgroundColor: indicatorColor,
								borderRadius: 100,
								transform: [
									{
										scaleY: anim.interpolate({
											inputRange: [0, 1],
											outputRange: [1, 2],
										}),
									},
								],
							}}
						/>
					))}
				</View>
			)}

			{/* Animação de escuta */}
			{(status === 'listening' || status === 'listening-paused') && (
				<Animated.View
					style={{
						position: 'absolute',
						transform: [{ scale: scaleAnim }],
						opacity: listeningOpacity,
					}}
				>
					<View
						style={{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: indicatorColor,
						}}
					/>
				</Animated.View>
			)}

			{/* Animação de pensamento */}
			{status === 'thinking' && (
				<Animated.View
					style={{
						position: 'absolute',
						alignItems: 'center',
						justifyContent: 'center',
						opacity: thinkingOpacity,
					}}
				>
					{thinkingAnims.map((anim, index) => (
						<Animated.View
							key={index}
							style={{
								position: 'absolute',
								width: size,
								height: size,
								borderRadius: size / 2,
								borderWidth: 2,
								borderColor: indicatorColor,
								backgroundColor: 'transparent',
								opacity: anim.interpolate({
									inputRange: [0, 0.2, 0.5, 0.8, 1],
									outputRange: [0, 0.2, 0.4, 0.2, 0],
									extrapolate: 'clamp',
								}),
								transform: [
									{
										scale: anim.interpolate({
											inputRange: [0, 0.2, 0.5, 0.8, 1],
											outputRange: [0.5, 0.8, 1.2, 1.4, 1.5],
											extrapolate: 'clamp',
										}),
									},
								],
							}}
						/>
					))}
				</Animated.View>
			)}

			<Animated.View
				style={{
					position: 'absolute',
					bottom: 0,
					opacity: titleOpacity,
				}}
			>
				<Text size="lg" color="typography_500">
					{currentTitle}
				</Text>
			</Animated.View>
		</HStack>
	)
}
