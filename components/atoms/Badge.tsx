import { ComponentProps } from 'react'
import { Icon, IIconProps } from './Icon'
import { twMerge } from 'tailwind-merge'
import { Badge as BadgeUi, BadgeText } from '../ui/badge'

export interface IBadgeProps extends ComponentProps<typeof BadgeUi> {
	iconProps?: IIconProps
	rightIconProps?: IIconProps
	textProps?: ComponentProps<typeof BadgeText>
	children: JSX.Element | string
}

export const Badge = ({
	children,
	iconProps,
	rightIconProps,
	textProps,
	className,
	...props
}: IBadgeProps) => (
	<BadgeUi
		size="md"
		className={twMerge(
			'rounded-full min-w-6 items-center justify-center',
			className,
		)}
		{...props}
	>
		{iconProps && <Icon size={28} color="typography_500" {...iconProps} />}
		{typeof children === 'string' ? (
			<BadgeText className="color-typography-950" {...textProps}>
				{children}
			</BadgeText>
		) : (
			children
		)}
		{rightIconProps && (
			<Icon size={28} color="typography_500" {...rightIconProps} />
		)}
	</BadgeUi>
)
