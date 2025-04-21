import { ComponentProps, useState } from 'react'
import { Heading } from '../ui/heading'

import React from 'react'
import { IconCircle, IIconCircleProps, Text } from '../atoms'
import { Pressable } from '../ui/pressable'
import { Divider } from '../ui/divider'
import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { twMerge } from 'tailwind-merge'
import { Dimensions } from 'react-native'
import { Box } from '../ui/box'

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
	children?: ComponentProps<typeof ModalUI>['children']
	renderButton: (prop: {
		showModal: boolean
		setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	}) => JSX.Element
	renderFooter?: (prop: {
		showModal: boolean
		setShowModal: React.Dispatch<React.SetStateAction<boolean>>
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
	...props
}: IModalProps) => {
	const [showModal, setShowModal] = useState(false)
	const maxHeight = Dimensions.get('window').height * 0.6

	return (
		<>
			{renderButton({ showModal, setShowModal })}
			<ModalUI
				isOpen={showModal}
				onClose={() => {
					onClose?.()
					setShowModal(false)
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
									setShowModal(false)
								}}
							>
								<IconCircle
									name="XIcon"
									size={16}
									color={{ light: 'background_400', dark: 'background_800' }}
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
						{children}
					</ModalBody>

					{renderFooter && (
						<ModalFooter className="px-4 pt-0 pb-4">
							{renderFooter({ showModal, setShowModal })}
						</ModalFooter>
					)}
				</ModalContent>
			</ModalUI>
		</>
	)
}
