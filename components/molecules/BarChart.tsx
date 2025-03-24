import { BarChart as BarChartUi } from 'react-native-chart-kit'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface IBarChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof BarChartUi>
}

export const BarChart = ({
	width,
	height,
	chartProps,
	...props
}: IBarChartProps) => {
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const primaryColor = useThemeColor('secondary_300')
	const textColor = useThemeColor('typography_600')
	const textRGB = textColor.replace(/rgb\((\d+) (\d+) (\d+)\)/, '$1, $2, $3')

	const data = [
		{ month: 'Jan.', cost: 60008, profit: 40088 },
		{ month: 'Fev.', cost: 35008, profit: 60088 },
		{ month: 'Mar.', cost: 60008, profit: 55088 },
		{ month: 'Apr.', cost: 60008, profit: 70088 },
		{ month: 'Mai.', cost: 30008, profit: 45088 },
		{ month: 'Jun.', cost: 25008, profit: 50088 },
		{ month: 'Jul.', cost: 30008, profit: 55088 },
	]

	return (
		<Box {...props}>
			<BarChartUi
				data={{
					labels: data.map((e) => e.month),
					datasets: [
						{
							data: data.map((e) => e.cost + e.profit),
							colors: data.map(() => () => primaryColor),
						},
					],
				}}
				width={width}
				height={height}
				yAxisLabel="R$"
				yAxisSuffix=""
				fromZero
				showValuesOnTopOfBars
				yLabelsOffset={8}
				showBarTops={false}
				flatColor
				withCustomBarColorFromData
				chartConfig={{
					backgroundColor: backgroundColor,
					backgroundGradientFrom: backgroundColor,
					backgroundGradientTo: backgroundColor,
					color: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					barRadius: 6,
				}}
				{...chartProps}
			/>
		</Box>
	)
}
