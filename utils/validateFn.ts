// Função utilitária para cálculo de checksum (reutilizável)
const calculateChecksum = (digits: number[], weights: number[]) => {
	const sum = digits.reduce(
		(acc, digit, index) => acc + digit * weights[index % weights.length],
		0,
	)
	return (10 - (sum % 10)) % 10
}

// Validação EAN-13
export const isValidEan13 = (barcode: string) => {
	if (!/^\d{13}$/.test(barcode)) return false

	const digits = [...barcode].map(Number)
	const [dataDigits, checksum] = [digits.slice(0, 12), digits[12]]

	return checksum === calculateChecksum(dataDigits, [1, 3])
}

// Validação EAN-8
export const isValidEan8 = (barcode: string) => {
	if (!/^\d{8}$/.test(barcode)) return false

	const digits = [...barcode].map(Number)
	const [dataDigits, checksum] = [digits.slice(0, 7), digits[7]]

	return checksum === calculateChecksum(dataDigits, [3, 1])
}

// Validação UPC-A
export const isValidUpcA = (barcode: string) => {
	if (!/^\d{12}$/.test(barcode)) return false

	const digits = [...barcode].map(Number)
	const [dataDigits, checksum] = [digits.slice(0, 11), digits[11]]

	return checksum === calculateChecksum(dataDigits, [3, 1])
}

// Conversão UPC-E para UPC-A (imutável)
export const convertUpcEtoUpcA = (upcE: string) => {
	const patterns: Record<string, (s: string) => string> = {
		'0': (s) => `0${s.substring(0, 2)}00000${s.substring(2, 5)}`,
		'1': (s) => `0${s.substring(0, 2)}10000${s.substring(2, 5)}`,
		'2': (s) => `0${s.substring(0, 2)}20000${s.substring(2, 5)}`,
		'3': (s) => `0${s.substring(0, 3)}00000${s.substring(3, 5)}`,
		'4': (s) => `0${s.substring(0, 4)}00000${s.substring(4, 5)}`,
		default: (s) => `0${s.substring(0, 5)}0000${s[6]}`,
	}

	const patternFn = patterns[upcE[6]] || patterns.default
	return patternFn(upcE) + upcE[7]
}

// Validação UPC-E
export const isValidUpcE = (barcode: string) => {
	if (!/^[0-9]{6,8}$/.test(barcode)) return false

	const paddedBarcode = barcode.padStart(8, '0')
	const upcA = convertUpcEtoUpcA(paddedBarcode)
	return isValidUpcA(upcA)
}

// Validação Code39
export const isValidCode39 = (barcode: string) =>
	/^[A-Z0-9\-\.\ \$\/\+\%]+$/.test(barcode)

// Validação Code128
export const isValidCode128 = (barcode: string) => {
	if (!/^[\x00-\x7F]+$/.test(barcode) || barcode.length < 4) return false

	const startChar = barcode.charCodeAt(0)
	const validStarts = [103, 104, 105]
	const stopChar = barcode.charCodeAt(barcode.length - 1)

	return validStarts.includes(startChar) && stopChar === 106
}
