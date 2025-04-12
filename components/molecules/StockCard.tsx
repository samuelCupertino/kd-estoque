import { ComponentProps } from 'react'
import { Box } from '../ui/box'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { IconCircle, IconProps } from '../atoms'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import { IThemeColor } from '@/hooks/useThemeColor'
import { Pressable } from '../ui/pressable'

export interface IStockCardProps extends ComponentProps<typeof Box> {
	iconName: IconProps['name']
	iconColor?: IThemeColor
	title: string
	text: string
}

export const StockCard = ({
	iconName,
	iconColor = 'background_700',
	title,
	text,
	style,
	...props
}: IStockCardProps) => (
	<Box
		className={`items-center bg-background-0 dark:bg-background-50 p-5 border-2 border-background-100 cursor-pointer`}
		style={{ borderRadius: 24, ...(style as object) }}
		{...props}
	>
		<HStack space="md" className="w-full items-center">
			<IconCircle
				name={iconName}
				color={iconColor}
				borderRadius={8}
				size={28}
			/>
			<Heading size="md" className="color-typography-600">
				{title}
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
		<Divider className="mt-4 p-[1px] rounded-full bg-background-100" />
		<Text className="w-full mt-2" style={{ fontFamily: 'DMSans' }} size="md">
			{text}
		</Text>
	</Box>
)
