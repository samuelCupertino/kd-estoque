import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { HStack } from '@/components/ui/hstack'
import {
	ScrollContainer,
	Text,
	Heading,
	ButtonCircle,
} from '@/components/atoms'
import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/atoms'
import { Divider } from '@/components/ui/divider'
import React from 'react'
import { formatNumberShort } from '@/utils'

export interface ILatestSalesListProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {}

export const LatestSalesList = ({ style, ...props }: ILatestSalesListProps) => {
	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})

	const data = [
		{ id: 1, product: 'Controle IR' },
		{ id: 2, product: 'Lâmpada Tuya' },
		{ id: 4, product: 'Gateway Zigbee' },
		{ id: 5, product: 'Fingerbot Zigbee' },
		{ id: 6, product: 'Fingerbot Zigbee' },
		{ id: 7, product: 'Fingerbot Zigbee' },
		{ id: 8, product: 'Fingerbot Zigbee' },
	]

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
					className="color-typography-600"
				>
					Últimas vendas
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

			<Box className="mt-6">
				<ScrollContainer borderRadius={6}>
					{data.map((e, i) => (
						<Box key={e.id}>
							{i > 0 && <Divider className="my-2 opacity-50" />}
							<HStack className="gap-2 items-center">
								<Image
									className="w-12 h-10 rounded-md"
									source={{
										uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
									}}
									alt="Imagem do produto"
								/>
								<VStack>
									<Heading size="sm" className="color-typography-600">
										Controle IR tuya
									</Heading>
									<Text size="sm" className="color-typography-500 -mt-1">
										Sábado, 5 de abril às 03:35
									</Text>
								</VStack>

								<Text size="lg" className="color-green-800 ml-auto">
									R${formatNumberShort(1500)}
								</Text>
							</HStack>
						</Box>
					))}
				</ScrollContainer>
			</Box>
		</Box>
	)
}
