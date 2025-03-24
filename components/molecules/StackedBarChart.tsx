import { StackedBarChart as StackedBarChartUi } from 'react-native-chart-kit'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { HStack } from '../ui/hstack'

export interface IStackedBarChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof StackedBarChartUi>
}

export const StackedBarChart = ({
	width,
	height,
	chartProps,
	...props
}: IStackedBarChartProps) => {
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const colors = useThemeColor([
		'quaternary_300',
		'secondary_300',
		'tertiary_300',
		'quinary_300',
		'red_300',
		'orange_300',
		'fuchsia_300',
	])
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
	const legends = ['Custo', 'Lucro']

	return (
		<Box {...props}>
			<StackedBarChartUi
				data={{
					labels: data.map((e) => e.month),
					legend: [],
					data: data.map((e) => [e.cost, e.profit]),
					barColors: colors,
				}}
				width={width}
				height={height - 0}
				yAxisLabel="R$"
				yAxisSuffix=""
				yLabelsOffset={-6}
				hideLegend={false}
				chartConfig={{
					backgroundColor: backgroundColor,
					backgroundGradientFrom: backgroundColor,
					backgroundGradientTo: backgroundColor,
					color: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
				}}
				{...chartProps}
			/>

			<HStack className="absolute right-0 gap-4 -mt-2 flex-row-reverse">
				{legends.map((legend, i) => (
					<HStack key={legend} className="items-center gap-2">
						<Box
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: colors[i] }}
						/>
						<Text size="sm" className="color-typography-500">
							{legend}
						</Text>
					</HStack>
				))}
			</HStack>
		</Box>
	)
}
