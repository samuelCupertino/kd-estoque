import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { HorizontalBarChart, Slider } from '@/components/molecules'
import { HStack } from '@/components/ui/hstack'
import { Heading, ButtonCircle } from '@/components/atoms'

export interface IMostProfitableProductChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
}

export const MostProfitableProductChart = ({
	width = 400,
	height,
	style,
	...props
}: IMostProfitableProductChartProps) => {
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
					<Heading
						size={{ base: 'md', md: 'lg' }}
						style={{ color: typographyColor }}
					>
						Produtos mais lucrativo
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
				<HorizontalBarChart
					className="mt-4"
					width={width - 148}
					height={height && height - 140}
				/>
			</Box>
			<Box className="items-cente p-5">
				<HStack className="justify-between">
					<Heading
						size={{ base: 'md', md: 'lg' }}
						style={{ color: typographyColor }}
					>
						Produtos menos lucrativo
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
				<HorizontalBarChart
					className="mt-4"
					width={width - 148}
					height={height && height - 140}
				/>
			</Box>
		</Slider>
	)
}
