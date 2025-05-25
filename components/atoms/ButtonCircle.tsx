import { ComponentProps } from 'react'
import { Button as ButtonUi } from '@/components/ui/button'
import { Icon, IIconProps } from './Icon'
import { twMerge } from 'tailwind-merge'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

type IButtonUiProps = ComponentProps<typeof ButtonUi>

export interface IButtonCircleProps
	extends Omit<ComponentProps<typeof ButtonUi>, 'size'> {
	iconProps?: IIconProps
	children?: JSX.Element | string
	size?: '2xs' | IBreakPoint<IButtonUiProps['size']> | IButtonUiProps['size']
}

export const ButtonCircle = ({
	children,
	iconProps,
	className,
	size = 'lg',
	...props
}: IButtonCircleProps) => {
	const sizeResponsive: NonNullable<IButtonUiProps['size']> =
		useBreakpoint(isBreakPoint(size) ? size : { base: size }) ?? size

	const btnSize = { '2xs': 5, xs: 7, sm: 10, md: 12, lg: 16, xl: 20 }[
		sizeResponsive
	]
	const iconSize = { '2xs': 10, xs: 16, sm: 18, md: 22, lg: 28, xl: 32 }[
		sizeResponsive
	]

	return (
		<ButtonUi
			className={twMerge(
				`w-fit h-fit w-${btnSize} p-1 aspect-square border rounded-full hover:scale-105 !border-primary-100 hover:!border-primary-300 dark:hover:!border-primary-500 bg-primary-0 hover:!bg-primary-0 dark:!border-primary-300 dark:bg-primary-50 hover:dark:!bg-primary-0 cursor-pointer duration-500`,
				className,
			)}
			{...props}
		>
			{iconProps && (
				<Icon size={iconSize} color="typography_600" {...iconProps} />
			)}
			{children}
		</ButtonUi>
	)
}
