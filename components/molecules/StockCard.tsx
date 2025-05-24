import { ComponentProps } from 'react'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import {
	ButtonCircle,
	Heading,
	IconCircle,
	IIconProps,
	Text,
} from '@/components/atoms'
import { Divider } from '@/components/ui/divider'
import { IThemeColor } from '@/hooks/useThemeColor'
import { Pressable } from 'react-native'

export interface IStockCardProps extends ComponentProps<typeof Box> {
	iconName: IIconProps['name']
	iconColor?: IThemeColor
	title: string
	text: string
	onPress?: () => void
}

export const StockCard = ({
	iconName,
	iconColor = 'background_700',
	title,
	text,
	style,
	onPress,
	...props
}: IStockCardProps) => (
	<Pressable onPress={onPress}>
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
				<ButtonCircle
					size="xs"
					className="ml-auto mb-auto"
					iconProps={{
						name: 'Ellipsis',
						color: { light: 'background_500', dark: 'background_700' },
					}}
				/>
			</HStack>
			<Divider className="mt-4 rounded-full bg-background-100" />
			<Text className="w-full mt-2" style={{ fontFamily: 'DMSans' }} size="md">
				{text}
			</Text>
		</Box>
	</Pressable>
)
