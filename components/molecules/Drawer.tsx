import { ComponentProps, useState } from 'react'
import { Heading } from '../ui/heading'

import {
	Drawer as DrawerUI,
	DrawerBackdrop,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
} from '@/components/ui/drawer'
import React from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { IconCircle, IIconCircleProps, Text } from '../atoms'
import { Pressable } from '../ui/pressable'
import { Divider } from '../ui/divider'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'

export interface IDrawerProps extends ComponentProps<typeof DrawerUI> {
	title: string
	subtitle: string
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	renderButton: (prop: {
		showDrawer: boolean
		setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
	renderFooter?: (prop: {
		showDrawer: boolean
		setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
}

export const Drawer = ({
	title,
	subtitle,
	iconName,
	iconColor = 'typography_400',
	renderButton,
	renderFooter,
	children,
	...props
}: IDrawerProps) => {
	const [showDrawer, setShowDrawer] = useState(false)
	const drawerResponsiveProps = useBreakpoint({
		base: { size: 'lg', anchor: 'bottom' },
		sm: { size: 'lg', anchor: 'right' },
		lg: { size: 'md', anchor: 'right' },
	})

	return (
		<>
			{renderButton({ showDrawer, setShowDrawer })}

			<DrawerUI
				isOpen={showDrawer}
				onClose={() => setShowDrawer(false)}
				{...drawerResponsiveProps}
				{...props}
			>
				<DrawerBackdrop />
				<DrawerContent
					className="border-background-300"
					style={{
						...(drawerResponsiveProps.anchor === 'bottom'
							? {
									borderTopLeftRadius: 24,
									borderTopRightRadius: 24,
									borderWidth: 1,
									borderBottomWidth: 0,
								}
							: {
									borderTopLeftRadius: 24,
									borderBottomLeftRadius: 24,
									borderWidth: 1,
									borderRightWidth: 0,
								}),
					}}
				>
					<DrawerHeader>
						<HStack className="gap-3 items-center">
							<IconCircle
								name={iconName}
								color={iconColor}
								size={32}
								borderRadius={8}
							/>
							<VStack>
								<Heading size="lg" className="color-typography-600">
									{title}
								</Heading>
								<Text
									size="sm"
									color={{ light: 'background_600', dark: 'background_800' }}
								>
									{subtitle}
								</Text>
							</VStack>
						</HStack>
						<Pressable onResponderEnd={() => setShowDrawer(false)}>
							<IconCircle
								name="XIcon"
								size={16}
								color={{ light: 'background_400', dark: 'background_800' }}
							/>
						</Pressable>
					</DrawerHeader>

					<Divider className="rounded-full mt-3 -mb-4" />

					<DrawerBody className="pt-4">{children}</DrawerBody>

					{renderFooter && (
						<DrawerFooter>
							{renderFooter({ showDrawer, setShowDrawer })}
						</DrawerFooter>
					)}
				</DrawerContent>
			</DrawerUI>
		</>
	)
}
