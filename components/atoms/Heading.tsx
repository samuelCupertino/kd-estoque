import { Heading as HeadingUI } from '@/components/ui/heading'
import { ComponentProps } from 'react'
import { IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'

type IHeadingUIProps = ComponentProps<typeof HeadingUI>

export interface IHeadingProps extends Omit<IHeadingUIProps, 'size'> {
	size?: IBreakPoint<IHeadingUIProps['size']> | IHeadingUIProps['size']
	color?: IThemeColor
	font?: 'DMSans' | 'SpaceMono'
}

export const Heading = ({
	font = 'DMSans',
	size,
	color,
	style,
	...props
}: IHeadingProps) => {
	const fontSize: IHeadingUIProps['size'] = useBreakpoint(
		isBreakPoint(size) ? size : { base: size },
	)
	const fontColor = useThemeColor(color ?? 'typography_600')

	return (
		<HeadingUI
			size={fontSize}
			style={{
				fontFamily: font,
				...(fontColor && { color: fontColor }),
				...(style as object),
			}}
			{...props}
		/>
	)
}
