import { ComponentProps } from 'react'
import { Button as ButtonUi } from '../ui/button'

export interface IButtonProps
	extends Omit<ComponentProps<typeof ButtonUi>, 'variant'> {
	variant?: 'link' | 'outline' | 'solid' | 'circle'
}

export const Button = ({ variant, children, ...props }: IButtonProps) => (
	<ButtonUi
		{...(variant === 'circle'
			? { style: { aspectRatio: 1, borderRadius: 100 } }
			: { variant })}
		{...props}
	>
		{children}
	</ButtonUi>
)
