import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ProgressChart } from '../molecules'
import { Heading } from '../ui/heading'
import { useBreakpointValue } from '../ui/utils/use-break-point-value'
import { HStack } from '../ui/hstack'
import { IconCircle } from '../atoms'

export interface IStockStorageChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
}

export const StockStorageChart = ({
	width = 400,
	height = 200,
	style,
	...props
}: IStockStorageChartProps) => {
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
		<Box
			className="items-cente p-5 border-2 border-background-100"
			style={{
				width: '100%',
				height: '100%',
				backgroundColor,
				borderRadius: 24,
				...(style as object),
			}}
			{...props}
		>
			<HStack className="justify-between">
				<Heading size={titleFontSize} style={{ color: typographyColor }}>
					Armazenamento
				</Heading>
				<Box className="h-full ml-auto">
					<IconCircle
						name="Ellipsis"
						size={12}
						color={{ light: 'background_400', dark: 'background_600' }}
					/>
				</Box>
			</HStack>
			<ProgressChart className="mt-4" width={width - 48} height={height - 82} />
		</Box>
	)
}
