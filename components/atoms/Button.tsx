import { ComponentProps } from 'react'
import { Button as ButtonUi } from '../ui/button'
import { Pressable } from '../ui/pressable'
import { Icon, IIconProps } from './Icon'
import { Text, ITextProps } from './Text'

// export interface IButtonProps
// 	extends Omit<ComponentProps<typeof ButtonUi>, 'variant'> {
// 	variant?:
// 		| 'link'
// 		| 'outline'
// 		| 'solid'
// 		| 'circle-primary'
// 		| 'circle-secondary'
// 		| 'circle-outline'
// 		| 'ghost'
// }

// export const Button = ({ variant, children, ...props }: IButtonProps) => (
// 	<ButtonUi
// 		{...(variant === 'circle-primary'
// 			? { style: { aspectRatio: 1, borderRadius: 100 } }
// 			: variant === 'circle-secondary'
// 				? {
// 						className:
// 							'bg-background-0 dark:bg-background-50 border-background-200 w-16 h-16',
// 						style: {
// 							padding: 0,
// 							aspectRatio: 1,
// 							borderRadius: 100,
// 							borderWidth: 1,
// 						},
// 					}
// 				: variant === 'circle-outline'
// 					? {
// 							className: 'bg-background-0',
// 							style: {
// 								aspectRatio: 1,
// 								borderRadius: 100,
// 								shadowColor: 'black',
// 								shadowOffset: { width: 0, height: 0 },
// 								elevation: 6,
// 								shadowRadius: 10,
// 								shadowOpacity: 0.2,
// 							},
// 						}
// 					: variant === 'ghost'
// 						? { className: 'w-fit h-fit bg-transparent p-0' }
// 						: { variant })}
// 		{...props}
// 	>
// 		{children}
// 	</ButtonUi>
// )

export interface IButtonProps extends ComponentProps<typeof Pressable> {
	variant?: 'primary' | 'secondary'
	iconProps?: IIconProps
	textProps?: ITextProps
	children?: JSX.Element | string
}

export const Button = ({
	// variant,
	children,
	iconProps,
	textProps,
	...props
}: IButtonProps) => (
	<Pressable
		className="flex-1 flex-row gap-3 justify-center items-center py-3 bg-green-200 dark:bg-green-950 hover:bg-green-300 hover:dark:bg-green-900 rounded-xl"
		{...props}
	>
		{iconProps && <Icon size={20} {...iconProps} />}
		{typeof children === 'string' ? (
			<Text size="lg" color="typography_700" {...textProps}>
				{children}
			</Text>
		) : (
			children
		)}
	</Pressable>
)
