import { Box } from '@/components/ui/box'
import { ComponentProps } from 'react'
import {
	Avatar,
	AvatarFallbackText,
	AvatarGroup,
	AvatarImage,
} from '@/components/ui/avatar'
import { twMerge } from 'tailwind-merge'

export interface IImageGroupProps
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	src: string[]
	size?: ComponentProps<typeof Avatar>['size']
	display?: number
}

export const ImageGroup = ({
	src,
	size = 'sm',
	display = 3,
	...props
}: IImageGroupProps) => (
	<Box {...props}>
		<AvatarGroup>
			{[...src.slice(0, display), ...(src.length > display ? ['...'] : [])].map(
				(uri, index) => (
					<Avatar
						key={index}
						size={size}
						className={twMerge(
							'border rounded-lg bg-background-400 dark:bg-background-500 border-background-300',
						)}
						style={{ marginLeft: uri === '...' ? -12 : 0 }}
					>
						{uri === '...' ? (
							<AvatarFallbackText className="ml-auto mr-0.5">
								{'+ ' + (src.length - display)}
							</AvatarFallbackText>
						) : (
							<AvatarImage source={{ uri }} className="rounded-md" />
						)}
					</Avatar>
				),
			)}
		</AvatarGroup>
	</Box>
)
