import React from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import {
	ISelectActionsheetFieldProps,
	SelectActionsheetField,
} from './SelectActionsheetField'
import { ISelectMenuFieldProps, SelectMenuField } from './SelectMenuField'

type ISelectFieldProps<T> = ISelectActionsheetFieldProps<T> &
	ISelectMenuFieldProps<T>

export const SelectField = <ValueType extends string | number>({
	...props
}: ISelectFieldProps<ValueType>) => {
	const isMobile: number = useBreakpoint({ base: true, md: false })

	return isMobile ? (
		<SelectActionsheetField {...props} />
	) : (
		<SelectMenuField {...props} />
	)
}
