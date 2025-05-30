import React, { ComponentProps } from 'react'
import { Box } from '@/components/ui/box'
import {
	Table as TableUI,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableData,
} from '@/components/ui/table'
import { ScrollView } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import { ButtonCircle, Icon, Text } from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'

type IDataRow = { id: string | number } & Record<string, unknown>

interface ITableProps<T extends IDataRow>
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	minColWidth?: number
	minFirstColWidth?: number
	data: T[]
	mapItemColRender?: Partial<Record<keyof T, (row: T) => JSX.Element>>
	mapTableColProps?: Partial<Record<keyof T, ComponentProps<typeof TableData>>>
	mapTitle?: Partial<Record<keyof T, string>>
	perPage?: number
	onChangePerPage?: (newPerpage: number) => void
}

export function Table<T extends IDataRow>({
	data,
	minColWidth = 180,
	minFirstColWidth = 84,
	mapItemColRender,
	mapTableColProps,
	mapTitle,
	perPage = 10,
	onChangePerPage,
	...props
}: ITableProps<T>) {
	const dataCols = Object.keys(data[0] || {}) as (keyof T)[]
	const headers = dataCols.map((col) => ({
		col: col,
		title: String(mapTitle?.[col] ?? col),
	}))
	const totalRows = data.length
	const totalPages = Math.ceil(totalRows / perPage)

	return (
		<Box
			className="overflow-hidden bg-background-0 dark:bg-background-50 border-2 border-background-100"
			{...props}
			style={{ ...(props.style as object), borderRadius: 24 }}
		>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ minWidth: '100%' }}
				bounces={false}
				overScrollMode="never"
			>
				<TableUI className="w-full">
					<TableHeader>
						<TableRow className="border-b-0 bg-background-0 dark:bg-background-50">
							{headers.map((e, i) => (
								<TableHead
									key={e.title}
									className="pl-4 pr-2"
									{...(mapTableColProps?.[e.col] ?? {})}
									style={{
										minWidth: i === 0 ? minFirstColWidth : minColWidth,
										...((mapTableColProps?.[e.col]?.style ?? {}) as object),
									}}
								>
									<Text size="lg">{e.title}</Text>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.slice(0, perPage).map((row, rowIdx) => {
							const rowCols = Object.keys(row) as unknown as (keyof T)[]

							return (
								<TableRow
									key={row.id}
									className={`border-b-0 min-h-14 bg-background-${rowIdx % 2 === 0 ? 100 : 200}`}
								>
									{rowCols.map((col, colIdx) => (
										<TableData
											key={String(col)}
											className="pl-4 pr-2 py-0"
											{...(mapTableColProps?.[col] ?? {})}
											style={{
												minWidth: colIdx === 0 ? minFirstColWidth : minColWidth,
												...((mapTableColProps?.[col]?.style ?? {}) as object),
											}}
										>
											<Box className="w-full h-full min-h-14 justify-center items-start">
												{mapItemColRender?.[col]?.(row) ?? (
													<Text size="md">{String(row[col])}</Text>
												)}
											</Box>
										</TableData>
									))}
								</TableRow>
							)
						})}
					</TableBody>
				</TableUI>
			</ScrollView>

			<TableUI className="absolute" style={{ width: minFirstColWidth }}>
				<TableHeader>
					<TableRow className="border-b-0 bg-background-0 dark:bg-background-50">
						<TableHead className="pl-4 pr-2">
							<Text size="lg">{headers[0].title}</Text>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.slice(0, perPage).map((row, i) => (
						<TableRow
							key={row.id}
							className={`border-b-0 min-h-14 bg-background-${i % 2 === 0 ? 100 : 200}`}
						>
							<TableData
								key={row.id}
								className="pl-4 pr-2 py-0"
								{...(mapTableColProps?.['id'] ?? {})}
							>
								<Box className="w-full h-full min-h-14 justify-center items-start">
									{mapItemColRender?.['id']?.(row) ?? (
										<Text size="md">{row.id}</Text>
									)}
								</Box>
							</TableData>
						</TableRow>
					))}
				</TableBody>
			</TableUI>

			<HStack className="items-center gap-1 pl-4 pr-1 py-2">
				<Pressable onPress={() => onChangePerPage?.(10)}>
					<HStack className="items-center gap-1">
						<Text size="md">
							{perPage} de {totalRows}
						</Text>
						<Icon name="ChevronDown" color="typography_400" />
					</HStack>
				</Pressable>

				<HStack className="ml-auto items-center gap-1 scale-90">
					<ButtonCircle
						size="sm"
						iconProps={{
							name: 'ChevronLeft',
							color: { light: 'background_500', dark: 'background_700' },
						}}
					/>
					{Array.from(
						{ length: Math.min(totalPages, totalPages === 3 ? 3 : 2) },
						(_, i) => (
							<ButtonCircle key={i} size="sm">
								<Text>{String(i + 1)}</Text>
							</ButtonCircle>
						),
					)}

					{totalPages > 3 && (
						<>
							<Text className="px-1">...</Text>
							<ButtonCircle size="sm">
								<Text>{totalPages}</Text>
							</ButtonCircle>
						</>
					)}

					<ButtonCircle
						size="sm"
						iconProps={{
							name: 'ChevronRight',
							color: { light: 'background_500', dark: 'background_700' },
						}}
					/>
				</HStack>
			</HStack>
		</Box>
	)
}
