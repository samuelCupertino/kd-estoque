import { ComponentProps } from 'react'
import { Box } from '../ui/box'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { IconCircle, IIconCircleProps } from '../atoms'
import { Text } from '../ui/text'
import { Badge, BadgeIcon, BadgeText } from '../ui/badge'
import { TrendingDown, TrendingUp } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useBreakpointValue } from '../ui/utils/use-break-point-value'
import { Pressable } from '../ui/pressable'

export interface IValueDifferenceCardProps extends ComponentProps<typeof Box> {
	iconName: IIconCircleProps['name']
	iconColor: IIconCircleProps['color']
	title: string
	value: number
	descripition?: string
	oldValue?: number
	formatValue?: (value: number) => string | number
}

export const ValueDifferenceCard = ({
	iconName,
	title,
	descripition,
	value,
	oldValue = 0,
	iconColor,
	formatValue = (val) => val,
	style,
	...props
}: IValueDifferenceCardProps) => {
	const difference = value - oldValue
	const percentage = +((difference / oldValue) * 100).toFixed(2)
	const isPositive = percentage >= 0

	const backgroundColor = useThemeColor({
		light: 'background_0',
		dark: 'background_50',
	})
	const typographyColor = useThemeColor('typography_600')
	const titleFontSize = useBreakpointValue({
		default: 'md',
		md: 'xl',
	})
	const valueFontSize = useBreakpointValue({
		default: 'xl',
		md: '3xl',
	})

	return (
		<Box
			className="justify-between rounded-3xl p-5 border-2 border-background-100"
			style={{ backgroundColor, borderRadius: 24, ...(style as object) }}
			{...props}
		>
			<HStack space="md" className="items-center">
				<IconCircle
					name={iconName}
					size={28}
					color={iconColor}
					borderRadius={8}
				/>
				<Heading size={titleFontSize} style={{ color: typographyColor }}>
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

			<HStack space="md" className="w-full justify-between items-end">
				<Text size={valueFontSize} style={{ color: typographyColor }}>
					{formatValue(value)}
				</Text>

				{oldValue && (
					<Badge
						size="sm"
						variant="solid"
						action={isPositive ? 'success' : 'error'}
						className="rounded-lg"
					>
						<BadgeIcon
							as={isPositive ? TrendingUp : TrendingDown}
							className="mr-1"
						/>
						<BadgeText>
							<Text size="lg" style={{ color: typographyColor }}>
								{isPositive ? percentage : percentage * -1}%
							</Text>
						</BadgeText>
					</Badge>
				)}
			</HStack>
			<Text size="md" className="color-typography-500 ml-auto">
				{descripition} {formatValue(oldValue)}
			</Text>
		</Box>
	)
}
