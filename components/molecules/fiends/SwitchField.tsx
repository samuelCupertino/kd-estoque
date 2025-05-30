import React, { ComponentProps, forwardRef } from 'react'
import { VStack } from '@/components/ui/vstack'
import { Icon, IIconProps, Skeleton, Text } from '@/components/atoms'
import { Switch } from '@/components/ui/switch'
import { HStack } from '@/components/ui/hstack'
import { Pressable } from '@/components/ui/pressable'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TextInput } from 'react-native'
import { Popover } from '@/components/molecules/Popover'
import { twMerge } from 'tailwind-merge'

interface ISwitchFieldProps
	extends Omit<ComponentProps<typeof VStack>, 'children'> {
	label?: string
	size?: ComponentProps<typeof Switch>['size']
	title?: string
	description?: string
	helper?: string
	warning?: string
	error?: string
	isDisabled?: boolean
	isLoading?: boolean
	value?: boolean
	iconProps?: IIconProps
	onChange?: (newIsChecked: boolean) => void
}

export const SwitchField = forwardRef<TextInput, ISwitchFieldProps>(
	(
		{
			label,
			size,
			title,
			description,
			helper,
			warning,
			error,
			isDisabled,
			isLoading,
			value,
			iconProps,
			onChange,
			...props
		},
		ref,
	) => {
		const checkedBgColor = useThemeColor('secondary_800')
		const checkedDotColor = useThemeColor('secondary_400')
		const uncheckedBgColor = useThemeColor('background_500')
		const uncheckedDotColor = useThemeColor('background_800')

		return (
			<VStack {...props}>
				{label && (
					<Popover
						text={helper}
						offset={-10}
						renderButton={() => (
							<HStack className="items-center gap-1 pb-1 mr-auto">
								<Text size="md" color="typography_600">
									{label}
								</Text>
								{helper && (
									<Icon size="sm" name="HelpCircle" color="typography_400" />
								)}
							</HStack>
						)}
					/>
				)}

				{/* Fazer o ref focar aqui */}
				<TextInput
					ref={ref}
					className="absolute opacity-0"
					showSoftInputOnFocus={false}
				/>

				<Skeleton isLoading={isLoading}>
					<Pressable onPress={() => onChange?.(!value)}>
						<HStack
							className={twMerge(
								'rounded-2xl justify-between items-center p-2 overflow-hidden bg-background-100 dark:bg-background-50 border duration-500',
								error
									? 'border-error-600  dark:border-error-600'
									: 'border-background-200 dark:border-background-100 dark:hover:border-background-500',
								isDisabled ? 'opacity-35' : 'opacity-100',
							)}
						>
							<HStack className="items-center p-1 flex-1 pointer-events-none">
								{iconProps && <Icon {...iconProps} />}
								<VStack className="justify-center">
									<Text size={size} className="mb-1">
										{title}
									</Text>
									<Text size="sm" color="typography_500">
										{description}
									</Text>
								</VStack>
							</HStack>
							<Switch
								className="pointer-events-none"
								size={size}
								isDisabled={isDisabled}
								value={value}
								isChecked={value}
								trackColor={{ false: uncheckedBgColor, true: checkedBgColor }}
								thumbColor={value ? checkedDotColor : uncheckedDotColor}
								ios_backgroundColor={checkedDotColor}
								onChange={() => onChange?.(!value)}
							/>
						</HStack>
					</Pressable>
				</Skeleton>

				{!label && helper && (
					<Text size="sm" color="typography_400">
						{helper}
					</Text>
				)}
				{!error && warning && (
					<Text size="sm" color="warning_600">
						{warning}
					</Text>
				)}
				{error && (
					<Text size="sm" color="error_600">
						{error}
					</Text>
				)}
			</VStack>
		)
	},
)
