import { ProgressChart as ProgressChartUi } from 'react-native-chart-kit'
import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ScrollContainer, Text } from '@/components/atoms'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { formatTruncateText } from '@/utils/formatString'

export interface IProgressChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof ProgressChartUi>
}

export const ProgressChart = ({
	width,
	height,
	chartProps,
	style,
	...props
}: IProgressChartProps) => {
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
	const textColor = useThemeColor('typography_600')
	const legendColor = useThemeColor('typography_600')
	const data = [
		{
			id: 1,
			name: 'Tinta guache',
			population: 40,
			color: colors[0],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
		{
			id: 2,
			name: 'Caneta hidrográfica',
			population: 10,
			color: colors[1],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
		{
			id: 3,
			name: 'Massinha de modelar',
			population: 50,
			color: colors[2],
			legendFontColor: legendColor,
			legendFontSize: 12,
		},
	].sort((a, b) => (a.population < b.population ? -1 : 1))
	const dataDesc = data.sort((a, b) => (a.population > b.population ? -1 : 1))
	const minNumber = Math.min(...data.map((e) => e.population)) * 0.95

	return (
		<Box style={{ ...(style as object) }} {...props}>
			<HStack className="gap-2 justify-around w-full" style={{ width }}>
				<ProgressChartUi
					data={{
						colors: dataDesc.map((e) => e.color),
						data: dataDesc.map((e) => +(minNumber / e.population).toFixed(2)),
					}}
					width={height}
					height={height}
					strokeWidth={width / 30}
					radius={32}
					withCustomBarColorFromData={true}
					hideLegend
					chartConfig={{
						backgroundColor: backgroundColor,
						backgroundGradientFrom: backgroundColor,
						backgroundGradientTo: backgroundColor,
						propsForLabels: { fill: textColor, fontSize: 12 },
						color: () => `rgba(100, 100, 100, 0.05)`,
					}}
					{...chartProps}
				/>
				<Box
					style={{
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
										{formatTruncateText(e.name, 12)}
									</Text>
									<Text
										size={{ base: 'xs', sm: 'sm', lg: 'xs' }}
										className="color-typography-500"
									>
										vence em {e.population} dias
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
