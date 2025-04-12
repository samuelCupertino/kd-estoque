import { ComponentProps } from 'react'
import { Button as ButtonUi } from '../ui/button'
import { Icon, IIconProps } from './Icon'
import { twMerge } from 'tailwind-merge'

export interface IButtonCircleProps extends ComponentProps<typeof ButtonUi> {
	iconProps: IIconProps
	children?: JSX.Element | string
}

export const ButtonCircle = ({
	children,
	iconProps,
	className,
	...props
}: IButtonCircleProps) => (
	<ButtonUi
		className={twMerge(
			'min-w-16 w-fit min-h-16 h-fit p-3 border rounded-full border-background-200 bg-primary-50 dark:bg-primary-50 hover:bg-primary-50 hover:dark:bg-primary-100 cursor-pointer',
			className,
		)}
		{...props}
	>
		{iconProps && <Icon size={28} color="typography_600" {...iconProps} />}
		{children}
	</ButtonUi>
)
