import { ComponentProps, useEffect, useState } from 'react'

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
import { LayoutChangeEvent, ScrollView } from 'react-native'
import { Box } from '@/components/ui/box'

export interface IDrawerProps
	extends Omit<ComponentProps<typeof DrawerUI>, 'children' | 'size'> {
	title: string
	subtitle: string
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	bodyProps?: ComponentProps<typeof DrawerBody>
	showFooterDivider?: boolean
	children?:
		| ((size: { width: number; height: number }) => JSX.Element)
		| JSX.Element
	renderButton: (prop: {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
	renderFooter?: (prop: {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
	showFooterDivider = true,
	...props
}: IDrawerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [bodySize, setBodySize] = useState({ width: 0, height: 0 })

	const sizeStr = isFullScreen ? 'full' : undefined
	const drawerResponsiveProps = useBreakpoint({
		base: { size: sizeStr ?? 'lg', anchor: 'bottom' },
		sm: { size: sizeStr ?? 'lg', anchor: 'right' },
		lg: { size: sizeStr ?? 'md', anchor: 'right' },
	})

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setBodySize({ width, height })
	}

	useEffect(() => {
		if (isOpen === false && onClose) onClose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	return (
		<>
			{renderButton({ isOpen, setIsOpen })}

			<DrawerUI
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				{...drawerResponsiveProps}
				{...props}
			>
				<DrawerBackdrop />
				<DrawerContent
					className={twMerge(
						'border-background-300 p-0 bg-background-0',
						drawerResponsiveProps.size === 'full' ? '!border-0 border-t-0' : '',
					)}
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
					<DrawerHeader
						className={twMerge(
							'p-4',
							drawerResponsiveProps.size === 'full' ? 'pt-14' : '',
						)}
					>
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
									color={{ light: 'typography_600', dark: 'typography_800' }}
								>
									{subtitle}
								</Text>
							</VStack>
						</HStack>
						<HStack className="gap-2">
							{drawerResponsiveProps.anchor === 'bottom' && (
								<Pressable
									className="hover:scale-110 duration-500"
									onResponderEnd={() => setIsFullScreen(!isFullScreen)}
								>
									<IconCircle
										name={
											drawerResponsiveProps.size === 'full'
												? 'Shrink'
												: 'Expand'
										}
										size={16}
										color={{ light: 'background_600', dark: 'background_800' }}
									/>
								</Pressable>
							)}
							<Pressable
								className="hover:scale-110 duration-500"
								onResponderEnd={() => setIsOpen(false)}
							>
								<IconCircle
									name="XIcon"
									size={16}
									color={{ light: 'background_600', dark: 'background_800' }}
								/>
							</Pressable>
						</HStack>
					</DrawerHeader>
					<Box className="px-4">
						<Divider className="rounded-full" />
					</Box>

					<ScrollView
						contentContainerStyle={{ flexGrow: 1 }}
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
							<>
								{showFooterDivider && (
									<Box className="px-4 mb-4">
										<Divider className="rounded-full" />
									</Box>
								)}
								<DrawerFooter className="px-4 pt-0 pb-6">
									{renderFooter({ isOpen, setIsOpen })}
								</DrawerFooter>
							</>
						)}
					</ScrollView>
				</DrawerContent>
			</DrawerUI>
		</>
	)
}
