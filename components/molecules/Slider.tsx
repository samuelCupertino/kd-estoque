import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import { Box } from '../ui/box'
import { Pressable } from '../ui/pressable'
import { HStack } from '../ui/hstack'
import { ComponentProps, useRef, useState } from 'react'

// import { View, PanResponder } from 'react-native'

export interface ISliderProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
	children: JSX.Element[]
}

export const Slider = ({
	children,
	height = 100,
	width = 100,
	...props
}: ISliderProps) => {
	const ref = useRef<ICarouselInstance>(null)
	const progress = useSharedValue<number>(0)
	const [curPage, setCurPage] = useState(0)
	const data = [...children].map((child) => () => child)

	const onPressPagination = (index: number) => {
		setCurPage(index)
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		})

		return index
	}

	// const panResponder = useRef(
	// 	PanResponder.create({
	// 		onStartShouldSetPanResponder: () => true,
	// 		onPanResponderRelease: (_event, gestureState) => {
	// 			if (gestureState.dx > 500) {
	// 				setCurPage((val) => onPressPagination(val < 1 ? 0 : val - 1))
	// 				return
	// 			}

	// 			setCurPage((val) =>
	// 				onPressPagination(val == data.length - 1 ? data.length - 1 : val + 1),
	// 			)
	// 		},
	// 	}),
	// ).current

	return (
		<Box className="relative" {...props}>
			{/* <View {...panResponder.panHandlers}> */}
			<Box style={{ pointerEvents: 'none' }}>
				<Carousel
					ref={ref}
					vertical={false}
					width={width}
					height={height}
					loop
					onProgressChange={progress}
					style={{ width }}
					data={data}
					renderItem={({ item, index }) => <Box key={index}>{item()}</Box>}
				/>
			</Box>
			{/* </View> */}
			<HStack className="absolute w-full bottom-0 opacity-50 justify-center ">
				{data.map((_, i) => (
					<Pressable
						key={i}
						style={{ padding: 10 }}
						onPress={() => onPressPagination(i)}
					>
						<Box
							className={`w-[28px] h-[6px] rounded-full bg-background-${curPage === i ? 500 : 200}`}
						/>
					</Pressable>
				))}
			</HStack>
		</Box>
	)
}
