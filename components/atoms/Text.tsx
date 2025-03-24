import { Text as TextUI } from '../ui/text'
import { ComponentProps } from 'react'
import { IColorOption, useThemeColor } from '@/hooks/useThemeColor'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

type ITextUIProps = ComponentProps<typeof TextUI>

export interface TextProps extends Omit<ITextUIProps, 'size'> {
	size?: IBreakPoint<ITextUIProps['size']> | ITextUIProps['size']
	color?: IColorOption
}

export const Text = ({ size, color, style, ...props }: TextProps) => {
	const fontSize: ITextUIProps['size'] = useBreakpoint(
		isBreakPoint(size) ? size : { base: size },
	)
	const resolvedColor = useThemeColor(color ?? 'white')
	const fontColor = color ? resolvedColor : color

	return (
		<TextUI
			size={fontSize}
			style={{
				...(fontColor && { color: fontColor }),
				...(style as object),
			}}
			{...props}
		/>
	)
}
