import { Icon, Text } from '../atoms'
import { Card } from '../ui/card'
import { twMerge } from 'tailwind-merge'
import { HStack } from '../ui/hstack'
import { Collapse } from './Collapse'
import { Box } from '../ui/box'
import { ComponentProps } from 'react'
import { isThemeColor, IThemeColor, useThemeColor } from '@/hooks/useThemeColor'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface IChatMessageTextProps
	extends Omit<ComponentProps<typeof Card>, 'children'> {
	children: JSX.Element | string
	isAuthor?: boolean
	authorName?: string
	date: string
	bgColor?: IThemeColor | (string & {})
}

export const ChatMessageText = ({
	children,
	isAuthor,
	authorName,
	date,
	className,
	bgColor = 'background_50',
	style,
	...props
}: IChatMessageTextProps) => {
	const resolvedColor = useThemeColor(isThemeColor(bgColor) ? bgColor : 'white')
	const backgroundColor = isThemeColor(bgColor) ? resolvedColor : bgColor
	const width = useBreakpoint({ base: 300, xs: 400, xl: 500 })
	const padding = 40

	return (
		<Card
			size="sm"
			className={twMerge(
				`p-0 border rounded-2xl bg-background-50 border-background-100 dark:bg-background-100 dark:border-background-200`,
				isAuthor ? 'ml-auto rounded-br-none' : 'mr-auto rounded-bl-none',
				className,
			)}
			style={{ backgroundColor, maxWidth: width, ...(style as object) }}
			{...props}
		>
			<Collapse
				visible={({ isOpen }) => (
					<Box
						className="transition-all duration-30"
						style={{
							...(isOpen
								? {
										minWidth: width - padding,
										justifyContent: 'center',
										alignItems: isAuthor ? 'flex-end' : 'flex-start',
									}
								: { minWidth: 'auto', maxWidth: width - padding }),
							paddingBlock: 4,
							paddingLeft: isAuthor ? 8 : 0,
							paddingRight: isAuthor ? 0 : 8,
						}}
					>
						{typeof children === 'string' ? (
							<Text size={{ base: 'md', xs: 'sm' }} className="text-justify">
								{children}
							</Text>
						) : (
							children
						)}
					</Box>
				)}
				chevronIcon={isAuthor ? 'right' : 'left'}
			>
				{({ isOpen }) => (
					<HStack
						className={twMerge(
							'mb-1',
							isAuthor ? 'ml-auto' : 'mr-auto',
							isOpen ? 'opacity-100' : 'opacity-0',
						)}
					>
						<Text
							size={{ base: 'sm', xs: 'xs' }}
							color={{ light: 'typography_500', dark: 'typography_300' }}
						>
							{authorName}
						</Text>
						<Icon
							name="Dot"
							color={{ light: 'typography_500', dark: 'typography_300' }}
						/>
						<Text
							size={{ base: 'sm', xs: 'xs' }}
							color={{ light: 'typography_500', dark: 'typography_300' }}
						>
							{date}
						</Text>
					</HStack>
				)}
			</Collapse>
		</Card>
	)
}
