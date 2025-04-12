import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { BarChart, Slider, StackedBarChart } from '../molecules'
import { Heading } from '../ui/heading'
import { useBreakpointValue } from '../ui/utils/use-break-point-value'
import { HStack } from '../ui/hstack'
import { IconCircle } from '../atoms'
import { Pressable } from '../ui/pressable'

export interface ISalesReportChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
}

export const SalesReportChart = ({
	width = 400,
	height = 200,
	style,
	...props
}: ISalesReportChartProps) => {
	const titleFontSize = useBreakpointValue({
		default: 'lg',
		md: 'xl',
	})

	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const typographyColor = useThemeColor('typography_600')

	return (
		<Slider
			width={width}
			height={height - 4}
			className="border-2 border-background-100"
			style={{ backgroundColor, borderRadius: 24, ...(style as object) }}
			{...props}
		>
			<Box className="items-cente p-6">
				<HStack className="justify-between">
					<Heading size={titleFontSize} style={{ color: typographyColor }}>
						Relatório de vendas
					</Heading>
					<Box className="h-full ml-auto">
						<Pressable className="opacity-60 hover:opacity-100">
							<IconCircle
								name="Ellipsis"
								size={12}
								color={{ light: 'background_500', dark: 'background_700' }}
							/>
						</Pressable>
					</Box>
				</HStack>
				<BarChart className="mt-4" width={width - 48} height={height - 72} />
			</Box>

			<Box className="items-cente p-6">
				<HStack className="justify-between">
					<Heading size={titleFontSize} style={{ color: typographyColor }}>
						Relatório de lucro
					</Heading>
					<Box className="h-full ml-auto">
						<Pressable className="opacity-60 hover:opacity-100">
							<IconCircle
								name="Ellipsis"
								size={12}
								color={{ light: 'background_500', dark: 'background_700' }}
							/>
						</Pressable>
					</Box>
				</HStack>
				<StackedBarChart
					className="mt-4"
					width={width - 48}
					height={height - 72}
				/>
			</Box>
		</Slider>
	)
}
