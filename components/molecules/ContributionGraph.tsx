import { ContributionGraph as ContributionGraphUi } from 'react-native-chart-kit'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface IContributionGraphProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width: number
	height: number
	chartProps?: ComponentProps<typeof ContributionGraphUi>
}

export const ContributionGraph = ({
	width,
	height,
	chartProps,
	...props
}: IContributionGraphProps) => {
	const primaryColor = useThemeColor('tertiary_400')
	const primaryRGB = primaryColor.replace(
		/rgb\((\d+) (\d+) (\d+)\)/,
		'$1, $2, $3',
	)
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const textColor = useThemeColor('typography_600')
	const textRGB = textColor.replace(/rgb\((\d+) (\d+) (\d+)\)/, '$1, $2, $3')

	return (
		<Box {...props}>
			<ContributionGraphUi
				values={[
					{ date: '2025-01-02', count: 1 },
					{ date: '2025-01-03', count: 2 },
					{ date: '2025-01-04', count: 3 },
					{ date: '2025-01-05', count: 4 },
					{ date: '2025-01-06', count: 5 },
					{ date: '2025-01-30', count: 2 },
					{ date: '2025-01-31', count: 3 },
					{ date: '2025-03-01', count: 2 },
					{ date: '2025-04-02', count: 4 },
					{ date: '2025-03-05', count: 2 },
					{ date: '2025-02-30', count: 4 },
				]}
				endDate={new Date('2025-05-01')}
				numDays={365}
				width={width}
				height={height}
				tooltipDataAttrs={() => ({})}
				chartConfig={{
					backgroundColor: backgroundColor,
					backgroundGradientFrom: backgroundColor,
					backgroundGradientTo: backgroundColor,
					color: (opacity = 1) => `rgba(${primaryRGB}, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(${textRGB}, ${opacity})`,
				}}
				{...chartProps}
			/>
		</Box>
	)
}
