import { Icon as IconUI } from '@/components/ui/icon'
import { ComponentProps } from 'react'
import * as LucideIcons from 'lucide-react-native'
import * as VectorIcons from '@expo/vector-icons'
import { IThemeColor, isThemeColor, useThemeColor } from '@/hooks/useThemeColor'

const iconMap = {
	...LucideIcons,
	...VectorIcons,
	LockIcon: require('@/components/ui/icon').LockIcon,
} as const

export interface IIconProps
	extends Omit<ComponentProps<typeof IconUI>, 'size' | 'color'> {
	name: keyof typeof iconMap
	size?: number | ComponentProps<typeof IconUI>['size']
	color?: IThemeColor | (string & {})
}

export const Icon = ({ name, size, color, ...props }: IIconProps) => {
	const resolvedColor = useThemeColor(isThemeColor(color) ? color : 'white')
	const fontColor = isThemeColor(color) ? resolvedColor : color

	return (
		<IconUI
			as={iconMap[name] || iconMap['InfoIcon']}
			size={size as ComponentProps<typeof IconUI>['size']}
			color={fontColor}
			{...props}
		/>
	)
}
