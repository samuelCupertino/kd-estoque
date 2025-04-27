import { ComponentProps } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import AnimateNumberUi from 'react-native-animate-number'
import { Box } from '@/components/ui/box'
import { Text } from './Text'

export interface IAnimateNumberProps extends ComponentProps<typeof Box> {
	value: number
	textProps?: ComponentProps<typeof Text>
}

export const AnimateNumber = ({
	value,
	textProps,
	...props
}: IAnimateNumberProps) => (
	<Box {...props}>
		<AnimateNumberUi
			value={value}
			formatter={(val: string) => (
				<Text size="3xl" color="typography_600" {...textProps}>
					{val.toLocaleString()}
				</Text>
			)}
			timing="easeOut"
			locale="pt-BR"
		/>
	</Box>
)
