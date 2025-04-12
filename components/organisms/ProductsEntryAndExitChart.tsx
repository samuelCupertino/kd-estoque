import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Heading } from '../ui/heading'
import { useBreakpointValue } from '../ui/utils/use-break-point-value'
import { HStack } from '../ui/hstack'
import { IconCircle } from '../atoms'
import { GroupBarChart } from '../molecules/GroupBarChart'
import { Pressable } from '../ui/pressable'

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
					Produtos: entrada x saída
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
			<GroupBarChart
				className="mt-4"
				width={width ? width - 92 : undefined}
				height={height}
			/>
		</Box>
	)
}
