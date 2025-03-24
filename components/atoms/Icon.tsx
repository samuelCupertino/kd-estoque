import { Icon as IconUI } from '@/components/ui/icon'
import { ComponentProps } from 'react'
import * as LucideIcons from 'lucide-react-native'
import * as VectorIcons from '@expo/vector-icons'
import {
	IColorOption,
	isColorOption,
	useThemeColor,
} from '@/hooks/useThemeColor'

const iconMap = {
	...LucideIcons,
	...VectorIcons,
	LockIcon: require('@/components/ui/icon').LockIcon,
} as const

export interface IconProps
	extends Omit<ComponentProps<typeof IconUI>, 'size' | 'color'> {
	name: keyof typeof iconMap
	size?: number | ComponentProps<typeof IconUI>['size']
	color?: IColorOption | (string & {})
}

export const Icon = ({ name, size, color, ...props }: IconProps) => {
	const resolvedColor = useThemeColor(isColorOption(color) ? color : 'white')
	const fontColor = isColorOption(color) ? resolvedColor : color

	return (
		<IconUI
			as={iconMap[name] || iconMap['InfoIcon']}
			size={size as ComponentProps<typeof IconUI>['size']}
			color={fontColor}
			{...props}
		/>
	)
}
