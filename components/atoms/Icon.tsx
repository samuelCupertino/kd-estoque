import { Icon as IconUI } from '@/components/ui/icon'
import { ComponentProps } from 'react'
import * as LucideIcons from 'lucide-react-native'

const iconMap = {
	...LucideIcons,
	LockIcon: require('@/components/ui/icon').LockIcon,
} as const

export interface IconProps extends Omit<ComponentProps<typeof IconUI>, 'size'> {
	name: keyof typeof iconMap
	size?: number | ComponentProps<typeof IconUI>['size']
}

export const Icon = ({ name, size, ...props }: IconProps) => (
	<IconUI
		as={iconMap[name] || iconMap['InfoIcon']}
		size={size as ComponentProps<typeof IconUI>['size']}
		{...props}
	/>
)
