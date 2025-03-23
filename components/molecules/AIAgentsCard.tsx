import { ComponentProps } from 'react'
import { Box } from '../ui/box'
import { Heading } from '../ui/heading'
import { HStack } from '../ui/hstack'
import { Icon, IconProps } from '../atoms'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'

export interface IAIAgentsCardProps extends ComponentProps<typeof Box> {
	iconName: IconProps['name']
	title: string
	text: string
}

export const AIAgentsCard = ({
	iconName,
	title,
	text,
	...props
}: IAIAgentsCardProps) => (
	<Box
		className="justify-between items-center rounded-3xl bg-background-50 p-5"
		{...props}
	>
		<HStack space="md" className="w-full items-center">
			<Icon name={iconName} size={32} className="color-primary-700" />
			<Heading size="lg">{title}</Heading>
		</HStack>
		<Divider className="mt-2" />
		<Text className="w-full mt-2" style={{ fontFamily: 'DMSans' }} size="lg">
			{text}
		</Text>
	</Box>
)
