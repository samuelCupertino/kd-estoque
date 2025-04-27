import { ComponentProps, useEffect, useState } from 'react'
import { Pressable } from '@/components/ui/pressable'
import { Icon, IIconProps } from './Icon'
import { Text, ITextProps } from './Text'
import { twMerge } from 'tailwind-merge'

export interface IButtonProps extends ComponentProps<typeof Pressable> {
	variant?: 'primary' | 'secondary' | 'danger'
	iconProps?: IIconProps
	textProps?: ITextProps
	children?: JSX.Element | string
	baseColor?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
}

export const Button = ({
	variant = 'primary',
	children,
	iconProps,
	textProps,
	className,
	baseColor = 'primary',
	...props
}: IButtonProps) => {
	const [btnClassNames, setBtnClassNames] = useState('')

	useEffect(() => {
		setBtnClassNames(
			variant === 'primary'
				? `bg-${baseColor}-200 hover:bg-${baseColor}-300 dark:bg-${baseColor}-100 hover:dark:bg-${baseColor}-200`
				: variant === 'secondary'
					? `border-2 border-${baseColor}-300 hover:bg-${baseColor}-300 dark:border-${baseColor}-100 hover:dark:bg-${baseColor}-200`
					: variant === 'danger'
						? `bg-red-300 hover:bg-red-400 dark:bg-red-900 hover:dark:bg-red-800`
						: '',
		)
	}, [variant, baseColor])

	return (
		<Pressable
			className={twMerge(
				`flex-1 flex-row gap-3 justify-center items-center py-3 rounded-xl duration-300`,
				btnClassNames,
				className,
			)}
			{...props}
		>
			{iconProps && <Icon size={20} color="typography_700" {...iconProps} />}
			{typeof children === 'string' ? (
				<Text size="lg" color="typography_700" {...textProps}>
					{children}
				</Text>
			) : (
				children
			)}
		</Pressable>
	)
}
