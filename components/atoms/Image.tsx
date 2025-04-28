import { Image as ImageUI } from '@/components/ui/image'
import { ComponentProps } from 'react'
import { IBreakPoint, isBreakPoint, useBreakpoint } from '@/hooks/useBreakpoint'
import { twMerge } from 'tailwind-merge'
import { Center } from '@/components/ui/center'

export const assetToImage = {
	'@/assets/images/icon.png': require('@/assets/images/icon.png'),
}

type IImageUIProps = ComponentProps<typeof ImageUI>

export interface IImageProps
	extends Omit<ComponentProps<typeof ImageUI>, 'size' | 'src'> {
	src?: keyof typeof assetToImage | (string & {})
	alt: string
	size?: IBreakPoint<IImageUIProps['size']> | IImageUIProps['size']
	containerProps?: ComponentProps<typeof Center>
}

export const Image = ({
	src,
	size = 'sm',
	containerProps,
	...props
}: IImageProps) => {
	const imageSize: IImageUIProps['size'] = useBreakpoint(
		isBreakPoint(size) ? size : { base: size },
	)
	const source = assetToImage[src as keyof typeof assetToImage] ?? { uri: src }

	return (
		<Center
			{...containerProps}
			className={twMerge('w-fit rounded-lg', containerProps?.className)}
		>
			<ImageUI size={imageSize} source={source} {...props} />
		</Center>
	)
}
