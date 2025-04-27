import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { HStack } from '@/components/ui/hstack'
import { Heading, ButtonCircle } from '@/components/atoms'
import { GroupBarChart } from '@/components/molecules'

export interface IProductsEntryAndExitChartProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	width?: number
	height?: number
}

export const ProductsEntryAndExitChart = ({
	width,
	height,
	style,
	...props
}: IProductsEntryAndExitChartProps) => {
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
					Produtos: entrada x saída
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
			<GroupBarChart
				className="mt-4"
				width={width ? width - 92 : undefined}
				height={height}
			/>
		</Box>
	)
}
