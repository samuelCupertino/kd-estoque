import { ComponentProps } from 'react'
import { HStack } from '../ui/hstack'
import { Heading } from '../ui/heading'

interface IScreenHeaderProps extends ComponentProps<typeof HStack> {
	title: string
	rightConponet?: JSX.Element
}

export const ScreenHeader = ({
	title,
	children,
	...props
}: IScreenHeaderProps) => (
	<HStack className="justify-between items-center p-4" {...props}>
		<Heading size="2xl">{title}</Heading>
		<HStack space="lg">{children}</HStack>
	</HStack>
)
