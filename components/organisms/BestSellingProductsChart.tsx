import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { HorizontalBarChart, Slider } from '../molecules'
import { Heading } from '../ui/heading'
import { useBreakpointValue } from '../ui/utils/use-break-point-value'
import { HStack } from '../ui/hstack'
import { IconCircle } from '../atoms'

export interface IBestSellingProductsChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
}

export const BestSellingProductsChart = ({
	width = 400,
	height,
	style,
	...props
}: IBestSellingProductsChartProps) => {
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
			height={height && height - 4}
			className="border-2 border-background-100"
			style={{ backgroundColor, borderRadius: 24, ...(style as object) }}
			{...props}
		>
			<Box className="items-cente p-5">
				<HStack className="justify-between">
					<Heading size={titleFontSize} style={{ color: typographyColor }}>
						Produtos mais vendidos
					</Heading>
					<Box className="h-full ml-auto">
						<IconCircle
						name="Ellipsis"
						size={12}
						color={{ light: 'background_400', dark: 'background_600' }}
					/>
					</Box>
				</HStack>
				<HorizontalBarChart
					className="mt-4"
					width={width - 148}
					height={height && height - 140}
				/>
			</Box>
			<Box className="items-cente p-5">
				<HStack className="justify-between">
					<Heading size={titleFontSize} style={{ color: typographyColor }}>
						Produtos menos vendidos
					</Heading>
					<Box className="h-full ml-auto">
						<IconCircle
						name="Ellipsis"
						size={12}
						color={{ light: 'background_400', dark: 'background_600' }}
					/>
					</Box>
				</HStack>
				<HorizontalBarChart
					className="mt-4"
					width={width - 148}
					height={height && height - 140}
				/>
			</Box>
		</Slider>
	)
}
