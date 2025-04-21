import { Icon as IconUI } from '@/components/ui/icon'
import { ComponentProps } from 'react'
import * as LucideIcons from 'lucide-react-native'
import * as VectorIcons from '@expo/vector-icons'
import { isThemeColor, IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { Center } from '../ui/center'
import { Box } from '../ui/box'
import { twMerge } from 'tailwind-merge'

const iconMap = {
	...LucideIcons,
	...VectorIcons,
	LockIcon: require('@/components/ui/icon').LockIcon,
} as const

export interface IIconCircleProps
	extends Omit<ComponentProps<typeof IconUI>, 'size' | 'color'> {
	name: keyof typeof iconMap
	size?: number | ComponentProps<typeof IconUI>['size']
	color?: IThemeColor | (string & {})
	borderRadius?: number
	padding?: number
	containerProps?: ComponentProps<typeof Center>
}

export const IconCircle = ({
	name,
	size,
	color,
	borderRadius = 100,
	padding = 8,
	style,
	containerProps,
	...props
}: IIconCircleProps) => {
	const resolvedColor = useThemeColor(isThemeColor(color) ? color : 'white')
	const iconColor = isThemeColor(color) ? resolvedColor : color

	return (
		<Center
			{...containerProps}
			className={twMerge(
				'rounded-full relative overflow-hidden',
				containerProps?.className,
			)}
			style={{ borderRadius, padding, ...(containerProps?.style as object) }}
		>
			<Box
				className="absolute inset-0"
				style={{ backgroundColor: iconColor, opacity: 0.2 }}
			/>
			<IconUI
				as={iconMap[name] || iconMap['InfoIcon']}
				size={size as ComponentProps<typeof IconUI>['size']}
				style={iconColor ? { ...style, color: iconColor } : style}
				{...props}
			/>
		</Center>
	)
}
