import { ComponentProps, useState } from 'react'

import React from 'react'
import { IconCircle, IIconCircleProps, Text, Heading } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { twMerge } from 'tailwind-merge'
import { Dimensions } from 'react-native'
import { Box } from '@/components/ui/box'

import {
	Modal as ModalUI,
	ModalBackdrop,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@/components/ui/modal'

export interface IModalProps
	extends Omit<ComponentProps<typeof ModalUI>, 'children'> {
	title: string
	subtitle: string
	iconName: IIconCircleProps['name']
	iconColor?: IIconCircleProps['color']
	bodyProps?: ComponentProps<typeof ModalBody>
	showFooterDivider?: boolean
	children?:
		| ComponentProps<typeof ModalUI>['children']
		| ((props: {
				isOpen: boolean
				setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
		  }) => ComponentProps<typeof ModalUI>['children'])
	renderButton?: (props: {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
	renderFooter?: (props: {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
}

export const Modal = ({
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
}: IModalProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const maxHeight = Dimensions.get('window').height * 0.8

	return (
		<>
			{renderButton?.({ isOpen, setIsOpen })}
			<ModalUI
				isOpen={isOpen}
				onClose={() => {
					onClose?.()
					setIsOpen(false)
				}}
				{...props}
			>
				<ModalBackdrop />
				<ModalContent className="border-background-300 p-0 rounded-3xl">
					<ModalHeader className="p-4">
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

						<ModalCloseButton>
							<Pressable
								className="hover:scale-110 duration-500"
								onResponderEnd={() => {
									onClose?.()
									setIsOpen(false)
								}}
							>
								<IconCircle
									name="XIcon"
									size={16}
									color={{ light: 'background_600', dark: 'background_800' }}
								/>
							</Pressable>
						</ModalCloseButton>
					</ModalHeader>

					<Box className="px-4">
						<Divider className="rounded-full" />
					</Box>

					<ModalBody
						className={twMerge('my-0', bodyProps?.className)}
						{...bodyProps}
						style={{ maxHeight, ...(bodyProps?.style as object) }}
					>
						{typeof children === 'function'
							? children({ isOpen, setIsOpen })
							: children}
					</ModalBody>

					{renderFooter && (
						<>
							{showFooterDivider && (
								<Box className="px-4 mb-4">
									<Divider className="rounded-full" />
								</Box>
							)}
							<ModalFooter className="px-4 pt-0 pb-4">
								{renderFooter({ isOpen, setIsOpen })}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</ModalUI>
		</>
	)
}
