import { Text as TextUI } from '@/components/ui/text'
import { ComponentProps } from 'react'
import { IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

type ITextUIProps = ComponentProps<typeof TextUI>

export interface ITextProps extends Omit<ITextUIProps, 'size'> {
	size?: IBreakPoint<ITextUIProps['size']> | ITextUIProps['size']
	color?: IThemeColor
	font?: 'DMSans' | 'SpaceMono'
}

export const Text = ({
	font = 'DMSans',
	size,
	color,
	style,
	...props
}: ITextProps) => {
	const fontSize: ITextUIProps['size'] = useBreakpoint(
		isBreakPoint(size) ? size : { base: size },
	)
	const fontColor = useThemeColor(color ?? 'typography_600')

	return (
		<TextUI
			size={fontSize}
			style={{
				...(fontColor && { color: fontColor }),
				...(style as object),
				fontFamily: font,
			}}
			{...props}
		/>
	)
}
