import { BarChart } from 'react-native-gifted-charts'

import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface IHorizontalBarChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
	chartProps?: ComponentProps<typeof BarChart>
}

export const HorizontalBarChart = ({
	width,
	height,
	chartProps,
	...props
}: IHorizontalBarChartProps) => {
	const primaryColor = useThemeColor('secondary_300')
	const typography600Color = useThemeColor('typography_600')
	const typography400Color = useThemeColor('typography_400')
	const typography500Color = useThemeColor('typography_500')
	const typography500RGB = typography500Color.replace(
		/rgb\((\d+) (\d+) (\d+)\)/,
		'$1, $2, $3',
	)
	const data = [
		{ value: 120, label: 'Maria Maria', spacing: 12 },
		{ value: 150, label: 'Tadeu Tadeu', spacing: 12 },
		{ value: 130, label: 'Willian ', spacing: 12 },
		{ value: 140, label: 'Willian ', spacing: 12 },
		{ value: 10, label: 'Willian ', spacing: 12 },
	]

	return (
		<Box {...props}>
			<BarChart
				data={data}
				width={width}
				height={height}
				horizontal
				yAxisAtTop
				showValuesAsTopLabel
				barWidth={24}
				labelWidth={24}
				initialSpacing={4}
				endSpacing={8}
				spacing={0}
				shiftY={-18}
				xAxisLabelsVerticalShift={0}
				yAxisThickness={0}
				xAxisThickness={0}
				barBorderRadius={6}
				xAxisColor={`rgba(${typography500RGB}, ${0.5})`}
				rulesColor={`rgba(${typography500RGB}, ${0.5})`}
				frontColor={primaryColor}
				xAxisType={'dashed'}
				yAxisTextStyle={{ color: typography400Color }}
				topLabelTextStyle={{ color: typography400Color }}
				labelsDistanceFromXaxis={24}
				xAxisLabelTextStyle={{
					position: 'absolute',
					backgroundColor: primaryColor,
					color: typography600Color,
					width: 66,
					maxWidth: 66,
					height: 24,
					top: -3,
					paddingLeft: 4,
					borderRadius: 6,
					textAlign: 'left',
					display: 'flex',
					alignItems: 'center',
				}}
				{...chartProps}
			/>
		</Box>
	)
}
