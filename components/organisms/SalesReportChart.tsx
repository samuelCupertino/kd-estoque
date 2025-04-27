import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { BarChart, Slider, StackedBarChart } from '@/components/molecules'
import { HStack } from '@/components/ui/hstack'
import { Heading, ButtonCircle } from '@/components/atoms'

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
					<Heading
						size={{ base: 'md', md: 'lg' }}
						style={{ color: typographyColor }}
					>
						Relatório de vendas
					</Heading>
					<ButtonCircle
						size="xs"
						className="ml-auto mb-auto"
						iconProps={{
							name: 'Ellipsis',
							color: { light: 'background_500', dark: 'background_700' },
						}}
					/>
				</HStack>
				<BarChart className="mt-4" width={width - 48} height={height - 72} />
			</Box>

			<Box className="items-cente p-6">
				<HStack className="justify-between">
					<Heading
						size={{ base: 'md', md: 'lg' }}
						style={{ color: typographyColor }}
					>
						Relatório de lucro
					</Heading>
					<ButtonCircle
						size="xs"
						className="ml-auto mb-auto"
						iconProps={{
							name: 'Ellipsis',
							color: { light: 'background_500', dark: 'background_700' },
						}}
					/>
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
