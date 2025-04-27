import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ProgressChart } from '@/components/molecules'
import { HStack } from '@/components/ui/hstack'
import { Heading, ButtonCircle } from '@/components/atoms'

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
				<Heading
					size={{ base: 'md', md: 'lg' }}
					style={{ color: typographyColor }}
				>
					Armazenamento
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
			<ProgressChart className="mt-4" width={width - 48} height={height - 82} />
		</Box>
	)
}
