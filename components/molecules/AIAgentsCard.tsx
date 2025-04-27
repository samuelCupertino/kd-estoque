import { ComponentProps } from 'react'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import {
	IconCircle,
	IIconCircleProps,
	Text,
	Heading,
	ButtonCircle,
} from '@/components/atoms'
import { Divider } from '@/components/ui/divider'

export interface IAIAgentsCardProps
	extends Omit<ComponentProps<typeof Box>, 'role'> {
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	name: string
	renderFooter?: () => JSX.Element
	role: string
	description: string
}

export const AIAgentsCard = ({
	iconName,
	iconColor = 'background_700',
	name,
	role,
	description,
	renderFooter,
	style,
	...props
}: IAIAgentsCardProps) => (
	<Box
		className="justify-between items-center rounded-3xl bg-background-0 dark:bg-background-50 p-5 border-2 border-background-100"
		style={{ borderRadius: 24, ...(style as object) }}
		{...props}
	>
		<HStack space="md" className="w-full items-center">
			<IconCircle
				name={iconName}
				color={iconColor}
				size={28}
				borderRadius={8}
			/>
			<Box>
				<Heading size="md" className="color-typography-600">
					{name}
				</Heading>
				<Text
					size="sm"
					color={{ light: 'background_600', dark: 'background_800' }}
				>
					{role}
				</Text>
			</Box>
			<ButtonCircle
				size="xs"
				className="ml-auto mb-auto"
				iconProps={{
					name: 'Ellipsis',
					color: { light: 'background_500', dark: 'background_700' },
				}}
			/>
		</HStack>
		<Divider className="mt-2" />
		<Text className="w-full mt-2" style={{ fontFamily: 'DMSans' }} size="md">
			{description}
		</Text>

		<Divider className="my-2" />

		<HStack space="md" className="w-full">
			{renderFooter?.()}
		</HStack>
	</Box>
)
