import { Icon as IconUI } from '@/components/ui/icon'
import { ComponentProps } from 'react'
import * as LucideIcons from 'lucide-react-native'
import * as VectorIcons from '@expo/vector-icons'
import { IThemeColor, isThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

const iconMap = {
	...LucideIcons,
	...VectorIcons,
	LockIcon: require('@/components/ui/icon').LockIcon,
} as const

type IconSizeType = number | ComponentProps<typeof IconUI>['size']

export interface IIconProps
	extends Omit<ComponentProps<typeof IconUI>, 'size' | 'color'> {
	name: keyof typeof iconMap
	size?: IBreakPoint<IconSizeType> | IconSizeType
	color?: IThemeColor | (string & {})
}

export const Icon = ({ name, size, color, ...props }: IIconProps) => {
	const resolvedColor = useThemeColor(isThemeColor(color) ? color : 'white')
	const fontColor = isThemeColor(color) ? resolvedColor : color
	const sizeResponsive = useBreakpoint(
		isBreakPoint(size) ? size : { base: size },
	) as ComponentProps<typeof IconUI>['size']

	return (
		<IconUI
			as={iconMap[name] || iconMap['InfoIcon']}
			size={sizeResponsive}
			color={fontColor}
			{...props}
		/>
	)
}
