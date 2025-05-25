import { PieChart as PieChartUi } from 'react-native-chart-kit'
import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ScrollContainer, Text } from '@/components/atoms'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { formatNumberShort, formatTruncateText } from '@/utils/formatString'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export interface IPieChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof PieChartUi>
}

export const PieChart = ({
	width,
	height,
	chartProps,
	style,
	...props
}: IPieChartProps) => {
	const marginLeftPivot = useBreakpoint({ base: 2, xs: 2.2, sm: 2.4 })
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const colors = useThemeColor([
		'secondary_300',
		'tertiary_300',
		'quaternary_300',
		'quinary_300',
		'red_300',
		'orange_300',
		'fuchsia_300',
	])
	const legendColor = useThemeColor('typography_600')
	const textRGB = legendColor.replace(/rgb\((\d+) (\d+) (\d+)\)/, '$1, $2, $3')
	const data = [
		{
			id: 1,
			name: 'Carlos Silva',
			population: 52,
			color: colors[0],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
		{
			id: 2,
			name: 'Júlia Martins',
			population: 20,
			color: colors[1],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
		{
			id: 3,
			name: 'Maria Silva',
			population: 45,
			color: colors[2],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
		{
			id: 4,
			name: 'Pedro Sousa',
			population: 18,
			color: colors[3],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
	].sort((a, b) => (a.population > b.population ? -1 : 1))
	const totalPopulation = data.reduce((acc, e) => acc + e.population, 0)

	return (
		<Box style={{ ...(style as object) }} {...props}>
			<HStack className="gap-2">
				<PieChartUi
					data={data}
					width={width}
					height={height}
					accessor="population"
					backgroundColor={backgroundColor}
					paddingLeft="0"
					hasLegend={false}
					chartConfig={{
						backgroundColor: backgroundColor,
						backgroundGradientFrom: backgroundColor,
						backgroundGradientTo: backgroundColor,
						color: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
					}}
					{...chartProps}
				/>
				<Box
					style={{
						marginLeft: -1 * (width / marginLeftPivot),
						marginBlock: data.length < 8 ? 'auto' : 0,
					}}
				>
					<ScrollContainer>
						{data.map((e) => (
							<HStack key={e.id} className="gap-2 mb-3 items-center">
								<Box
									className="rounded-full"
									style={{
										width: 8,
										height: '100%',
										minHeight: 38,
										backgroundColor: e.color,
									}}
								/>
								<VStack>
									<Text
										size={{ base: 'sm', sm: 'md', lg: 'sm' }}
										className="color-typography-500"
									>
										{((e.population / totalPopulation) * 100).toFixed(0)}%{' '}
										{formatTruncateText(e.name, 12)}
									</Text>
									<Text
										size={{ base: 'xs', sm: 'sm', lg: 'xs' }}
										className="color-typography-500"
									>
										{e.population} vendas | R$
										{formatNumberShort(2560)}
									</Text>
								</VStack>
							</HStack>
						))}
					</ScrollContainer>
				</Box>
			</HStack>
		</Box>
	)
}
