import { BarChart } from 'react-native-gifted-charts'

import { Box } from '@/components/ui/box'
import { Text } from '@/components/atoms'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatNumberShort } from '@/utils'

export interface IGroupBarChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
	chartProps?: ComponentProps<typeof BarChart>
}

export const GroupBarChart = ({
	width,
	height,
	chartProps,
	...props
}: IGroupBarChartProps) => {
	const quinary300Color = useThemeColor('quinary_300')
	const secondary300Color = useThemeColor('secondary_300')
	const typography500Color = useThemeColor('typography_500')
	const typography500RGB = typography500Color.replace(
		/rgb\((\d+) (\d+) (\d+)\)/,
		'$1, $2, $3',
	)

	const data = [
		{
			value: 2500,
			frontColor: quinary300Color,
			spacing: 6,
			label: 'Jan.',
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(2500)}
				</Text>
			),
		},
		{
			value: 2400,
			frontColor: secondary300Color,
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(2400)}
				</Text>
			),
		},

		{
			value: 3500,
			frontColor: quinary300Color,
			spacing: 6,
			label: 'Feb.',
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(3500)}
				</Text>
			),
		},
		{
			value: 3000,
			frontColor: secondary300Color,
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(3000)}
				</Text>
			),
		},

		{
			value: 4500,
			frontColor: quinary300Color,
			spacing: 6,
			label: 'Mar.',
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(4500)}
				</Text>
			),
		},
		{
			value: 4000,
			frontColor: secondary300Color,
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(4000)}
				</Text>
			),
		},

		{
			value: 5200,
			frontColor: quinary300Color,
			spacing: 6,
			label: 'Apr.',
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(5200)}
				</Text>
			),
		},
		{
			value: 4900,
			frontColor: secondary300Color,
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(4900)}
				</Text>
			),
		},

		{
			value: 3000,
			frontColor: quinary300Color,
			spacing: 6,
			label: 'May.',
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(3000)}
				</Text>
			),
		},
		{
			value: 2800,
			frontColor: secondary300Color,
			topLabelComponent: () => (
				<Text size="sm" className="color-typography-500 -rotate-45">
					{formatNumberShort(2800)}
				</Text>
			),
		},
	]

	return (
		<Box {...props}>
			<BarChart
				data={data}
				width={width}
				height={height}
				barWidth={32}
				initialSpacing={20}
				endSpacing={20}
				spacing={38}
				barBorderRadius={6}
				yAxisThickness={0}
				xAxisType={'dashed'}
				dashGap={12}
				xAxisColor={`rgba(${typography500RGB}, ${0.5})`}
				rulesColor={`rgba(${typography500RGB}, ${0.5})`}
				topLabelTextStyle={{ color: typography500Color }}
				yAxisTextStyle={{ color: typography500Color }}
				stepValue={1000}
				maxValue={6000}
				// yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
				labelWidth={54}
				xAxisLabelTextStyle={{ color: typography500Color, textAlign: 'center' }}
				{...chartProps}
			/>
		</Box>
	)
}
