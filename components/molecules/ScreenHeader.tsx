import { ComponentProps } from 'react'
import { HStack } from '@/components/ui/hstack'
import { Heading } from '@/components/atoms'
import { Platform } from 'react-native'

interface IScreenHeaderProps extends ComponentProps<typeof HStack> {
	title: string
	rightComponent?: JSX.Element
}

export const ScreenHeader = ({
	title,
	children,
	className,
	...props
}: IScreenHeaderProps) => (
	<HStack
		className={`justify-between items-center min-h-16 ${Platform.OS === 'web' ? 'my-3' : 'mb-4 mt-2'} ${className}`}
		{...props}
	>
		<Heading size="xl" className="color-typography-700">
			{title}
		</Heading>
		<HStack space="lg">{children}</HStack>
	</HStack>
)
