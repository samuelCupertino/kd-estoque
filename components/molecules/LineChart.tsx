import { LineChart as LineChartUi } from 'react-native-chart-kit'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface ILineChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof LineChartUi>
}

export const LineChart = ({
	width,
	height,
	chartProps,
	...props
}: ILineChartProps) => {
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const primaryColor = useThemeColor('secondary_300')
	const textColor = useThemeColor('typography_600')
	const textRGB = textColor.replace(/rgb\((\d+) (\d+) (\d+)\)/, '$1, $2, $3')

	return (
		<Box {...props}>
			<LineChartUi
				data={{
					labels: ['1', '2', '3', '4'],
					datasets: [
						{
							data: [100, 400, 200, 300],
							color: () => primaryColor,
						},
					],
				}}
				width={width}
				height={height}
				yAxisLabel="$"
				yAxisSuffix="k"
				yAxisInterval={1}
				chartConfig={{
					backgroundColor: backgroundColor,
					backgroundGradientFrom: backgroundColor,
					backgroundGradientTo: backgroundColor,
					useShadowColorFromDataset: true,
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: '6',
						strokeWidth: '2',
					},
				}}
				bezier
				{...chartProps}
			/>
		</Box>
	)
}
