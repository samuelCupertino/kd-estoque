import millify from 'millify'
import { MillifyOptions } from 'millify/dist/options'

export const formatTruncateText = (
	text: string,
	maxLength: number,
	suffix = '...',
) => (text.length > maxLength ? text.slice(0, maxLength) + suffix : text)

export const formatNumberShort = (
	number: number,
	options: Partial<MillifyOptions> = { units: ['', 'mil', 'mi', 'bi'] },
) => millify(number, options)
