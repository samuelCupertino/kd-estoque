import { ComponentProps } from 'react'
import { isThemeColor, IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { Badge, BadgeText } from '../ui/badge'
import { Box } from '../ui/box'

export interface IBagdeProps extends ComponentProps<typeof Box> {
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
	direction?: 'horizontal' | 'vertical' | 'transversal'
	text: string
	bgColor?: IThemeColor
	isDisable?: boolean
}

export const BagdeCard = ({
	position = 'top-right',
	direction = 'transversal',
	text,
	bgColor = { light: 'warning_300', dark: 'warning_100' },
	isDisable,
	children,
	style,
	...props
}: IBagdeProps) => {
	const resolvedColor = useThemeColor(isThemeColor(bgColor) ? bgColor : 'white')
	const backgroundColor = isThemeColor(bgColor) ? resolvedColor : bgColor

	return (
		<Box style={{ pointerEvents: 'none', ...(style as object) }} {...props}>
			<Box className={isDisable ? `opacity-50` : ''}>{children}</Box>
			<Badge
				size="lg"
				variant="solid"
				action="muted"
				className="absolute"
				style={{
					backgroundColor,
					...(position === 'top-left' ? { top: 0, left: 0 } : {}),
					...(position === 'top-right' ? { top: -25, right: -20 } : {}),
					...(position === 'bottom-left' ? { bottom: 0, left: 0 } : {}),
					...(position === 'bottom-right' ? { bottom: 0, right: 0 } : {}),
					...(direction === 'transversal'
						? { transform: `rotate(45deg) translate(30%, 100%)` }
						: {}),
				}}
			>
				<BadgeText style={{ textAlign: 'center', paddingInline: 28 }}>
					{text}
				</BadgeText>
			</Badge>
		</Box>
	)
}
