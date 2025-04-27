import { ComponentProps } from 'react'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import {
	ButtonCircle,
	Heading,
	IconCircle,
	IIconCircleProps,
	Text,
} from '@/components/atoms'
import { Badge, BadgeIcon, BadgeText } from '@/components/ui/badge'
import { TrendingDown, TrendingUp } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

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
				<Heading
					size={{ base: 'md', md: 'lg' }}
					style={{ color: typographyColor }}
				>
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

			<HStack space="md" className="w-full justify-between items-end">
				<Text
					size={{ base: 'xl', md: '2xl' }}
					style={{ color: typographyColor }}
				>
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
