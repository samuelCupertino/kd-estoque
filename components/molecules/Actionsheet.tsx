import React, { ComponentProps } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonText } from '@/components/ui/button'
import {
	Actionsheet as ActionsheetUI,
	ActionsheetContent,
	ActionsheetItem,
	ActionsheetItemText,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ActionsheetBackdrop,
} from '@/components/ui/actionsheet'

interface IActionsheetProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	title: string
	subtitle: string
	// iconName: IIconCircleProps['name']
	// iconColor?: IIconCircleProps['color']
	// bodyProps?: ComponentProps<typeof DrawerBody>
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

export const Actionsheet = ({
	children,
	renderButton,
	renderFooter,
	...props
}: IActionsheetProps) => {
	const [showActionsheet, setShowActionsheet] = React.useState(false)
	const handleClose = () => setShowActionsheet(false)

	return (
		<VStack {...props}>
			<Button onPress={() => setShowActionsheet(true)}>
				<ButtonText>Open Actionsheet</ButtonText>
			</Button>
			<ActionsheetUI isOpen={showActionsheet} onClose={handleClose}>
				<ActionsheetBackdrop />
				<ActionsheetContent>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<ActionsheetItem onPress={handleClose}>
						<ActionsheetItemText>Edit Message</ActionsheetItemText>
					</ActionsheetItem>
					<ActionsheetItem onPress={handleClose}>
						<ActionsheetItemText>Mark Unread</ActionsheetItemText>
					</ActionsheetItem>
					<ActionsheetItem onPress={handleClose}>
						<ActionsheetItemText>Remind Me</ActionsheetItemText>
					</ActionsheetItem>
					<ActionsheetItem onPress={handleClose}>
						<ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
					</ActionsheetItem>
					<ActionsheetItem isDisabled onPress={handleClose}>
						<ActionsheetItemText>Delete</ActionsheetItemText>
					</ActionsheetItem>
				</ActionsheetContent>
			</ActionsheetUI>
		</VStack>
	)
}
