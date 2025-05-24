import { ComponentProps } from 'react'
import { HStack } from '@/components/ui/hstack'
import { Heading, Icon } from '@/components/atoms'
import { Platform, Pressable } from 'react-native'
import { Href, router } from 'expo-router'

interface IScreenHeaderProps extends ComponentProps<typeof HStack> {
	paths: { label: string; href?: Href }[]
	rightComponent?: JSX.Element
}

export const ScreenHeader = ({
	paths,
	children,
	className,
	...props
}: IScreenHeaderProps) => (
	<HStack
		className={`justify-between items-center min-h-16 ${Platform.OS === 'web' ? 'my-3' : 'mb-4 mt-2'} ${className}`}
		{...props}
	>
		<HStack space="sm">
			{paths.map((path, index) => (
				<HStack key={path.label} space="sm" className="items-center">
					{index > 0 && <Icon name="ChevronRight" />}
					<Pressable
						onPress={() => path.href && router.push(path.href)}
						pointerEvents={path.href ? 'auto' : 'none'}
					>
						<Heading
							size="xl"
							color={path.href ? 'typography_500' : 'typography_700'}
							className={
								path.href ? 'hover:underline hover:underline-offset-8' : ''
							}
						>
							{path.label}
						</Heading>
					</Pressable>
				</HStack>
			))}
		</HStack>

		<HStack space="lg">{children}</HStack>
	</HStack>
)
