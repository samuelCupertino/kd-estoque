import { ComponentProps, useState } from 'react'

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
import { IconCircle, IIconCircleProps, Text, Heading } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { twMerge } from 'tailwind-merge'
import { LayoutChangeEvent } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Box } from '@/components/ui/box'

export interface IDrawerProps
	extends Omit<ComponentProps<typeof DrawerUI>, 'children'> {
	title: string
	subtitle: string
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	bodyProps?: ComponentProps<typeof DrawerBody>
	children?:
		| ((size: { width: number; height: number }) => JSX.Element)
		| JSX.Element
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
	onClose,
	bodyProps,
	...props
}: IDrawerProps) => {
	const [showDrawer, setShowDrawer] = useState(false)
	const [bodySize, setBodySize] = useState({ width: 0, height: 0 })
	const drawerResponsiveProps = useBreakpoint({
		base: { size: 'lg', anchor: 'bottom' },
		sm: { size: 'lg', anchor: 'right' },
		lg: { size: 'md', anchor: 'right' },
	})

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setBodySize({ width, height })
	}

	return (
		<>
			{renderButton({ showDrawer, setShowDrawer })}

			<DrawerUI
				isOpen={showDrawer}
				onClose={() => {
					onClose?.()
					setShowDrawer(false)
				}}
				{...drawerResponsiveProps}
				{...props}
			>
				<DrawerBackdrop />
				<DrawerContent
					className="border-background-300 p-0"
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
						maxWidth: 740,
					}}
				>
					<DrawerHeader className="p-4">
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
						<Pressable
							className="hover:scale-110 duration-500"
							onResponderEnd={() => {
								onClose?.()
								setShowDrawer(false)
							}}
						>
							<IconCircle
								name="XIcon"
								size={16}
								color={{ light: 'background_400', dark: 'background_800' }}
							/>
						</Pressable>
					</DrawerHeader>
					<Box className="px-4">
						<Divider className="rounded-full" />
					</Box>

					<KeyboardAwareScrollView
						contentContainerStyle={{ flexGrow: 1 }}
						enableOnAndroid={true}
						extraScrollHeight={0}
						keyboardShouldPersistTaps="handled"
					>
						<DrawerBody
							onLayout={handleLayout}
							{...bodyProps}
							className={twMerge('my-0', bodyProps?.className)}
						>
							{typeof children === 'function' ? children(bodySize) : children}
						</DrawerBody>

						{renderFooter && (
							<DrawerFooter className={twMerge('px-4 pt-0 pb-6')}>
								{renderFooter({ showDrawer, setShowDrawer })}
							</DrawerFooter>
						)}
					</KeyboardAwareScrollView>
				</DrawerContent>
			</DrawerUI>
		</>
	)
}
