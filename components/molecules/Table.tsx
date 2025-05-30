import React, { ComponentProps, useRef } from 'react'
import { Box } from '@/components/ui/box'
import {
	Table as TableUI,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableData,
} from '@/components/ui/table'
import { Platform, ScrollView, ViewStyle } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import {
	ButtonCircle,
	IScrollContainerProps,
	ScrollContainer,
	Text,
} from '@/components/atoms'
import { Pressable } from '@/components/ui/pressable'
import { twMerge } from 'tailwind-merge'
import { SelectMenuField } from './fiends/SelectMenuField'

type IDataRow = { id: string | number } & Record<string, unknown>

type IDataHeader<T> = { col: keyof T; title: string }

export interface ITableProps<T extends IDataRow>
	extends Omit<ComponentProps<typeof Box>, 'children'> {
	data: T[]
	numberOfLines?: number
	lineHeight?: number
	totalRows?: number
	fixedCol?: keyof T
	renderItemHearder?: Partial<
		Record<
			keyof T,
			(props: {
				header: IDataHeader<T>
				headers: IDataHeader<T>[]
				onChangeOrder: () => void
				OrderButton: () => JSX.Element
			}) => JSX.Element
		>
	>
	renderItemCol?: Partial<Record<keyof T, (props: { row: T }) => JSX.Element>>
	mapTableColProps?: Partial<Record<keyof T, ComponentProps<typeof TableData>>>
	mapTitle?: Partial<Record<keyof T, string>>
	scrollContainerProps?: Partial<IScrollContainerProps>
	debug?: boolean
	order?: { by: keyof T; dir: 'asc' | 'desc' }
	onChangeOrder?: (newOrder: ITableProps<T>['order']) => void
	perPage?: number
	onChangePerPage?: (newPerpage: number) => void
	curPage?: number
	onChangeCurPage?: (newCurpage: number) => void
}

const getPagination = (curPage: number, totalPages: number) => {
	if (totalPages <= 5) return [...Array(totalPages).keys()].map((i) => i + 1)
	if (curPage <= 3) return [1, 2, 3, '->', totalPages]
	if (curPage >= totalPages - 2)
		return [1, '<-', totalPages - 2, totalPages - 1, totalPages]
	return [1, '<-', curPage, '->', totalPages]
}

export function Table<T extends IDataRow>({
	data,
	lineHeight = 50,
	numberOfLines = 2,
	totalRows = data.length,
	fixedCol,
	renderItemHearder,
	renderItemCol,
	mapTableColProps,
	mapTitle,
	scrollContainerProps,
	debug,
	order,
	onChangeOrder,
	curPage = 1,
	onChangeCurPage,
	perPage = 10,
	onChangePerPage,
	...props
}: ITableProps<T>) {
	const headerScrollRef = useRef<ScrollView>(null)
	const bodyScrollRef = useRef<ScrollView>(null)

	const dataMapCols = Object.keys(mapTitle || data[0] || {})
	const dataMapColsStyle = dataMapCols.reduce(
		(acc, e) => ({
			...acc,
			[e]: mapTableColProps?.[e] ?? { style: { width: 180 } },
		}),
		{} as Record<keyof T, ComponentProps<typeof TableData>>,
	)
	const dataCols = [
		dataMapCols.find((col) => col === fixedCol),
		...dataMapCols.filter((col) => col !== fixedCol),
	].filter(Boolean) as (keyof T)[]
	const headers: IDataHeader<T>[] = dataCols.map((col) => ({
		col: col,
		title: String(mapTitle?.[col] ?? col),
	}))
	const totalPages = Math.ceil(totalRows / perPage)
	const pagination = getPagination(curPage, totalPages)

	const syncScroll = (scrollX: number) => {
		if (headerScrollRef.current) {
			headerScrollRef.current.scrollTo({ x: scrollX, animated: false })
		}
	}

	const TableHaderConponent = (ThProps: { headers: typeof headers }) => (
		<TableHeader>
			<TableRow className="border-b-0 bg-background-0 py-0 dark:bg-background-50">
				{ThProps.headers.map((header, i) => (
					<TableHead
						key={header.title}
						className="pl-4 pr-2"
						{...(dataMapColsStyle?.[header.col] ?? {})}
						style={{
							...((dataMapColsStyle?.[header.col]?.style ?? {}) as object),
							...(debug && {
								backgroundColor: i % 2 === 0 ? 'red' : 'blue',
							}),
						}}
					>
						{renderItemHearder?.[header.col]?.({
							header,
							headers: ThProps.headers,
							onChangeOrder: () => {
								onChangeOrder?.({
									by: header.col,
									dir: order?.dir === 'asc' ? 'desc' : 'asc',
								})
							},
							OrderButton: () =>
								order?.by === header.col ? (
									<ButtonCircle
										size="2xs"
										iconProps={{
											size: 'sm',
											name: order.dir === 'asc' ? 'ChevronUp' : 'ChevronDown',
											color: 'typography_600',
										}}
										className="bg-background-100 pointer-events-none"
									/>
								) : (
									<></>
								),
						}) ?? (
							<Pressable
								onPress={() => {
									onChangeOrder?.({
										by: header.col,
										dir: order?.dir === 'asc' ? 'desc' : 'asc',
									})
								}}
							>
								<HStack className="items-center gap-2">
									<Text size="sm" numberOfLines={numberOfLines}>
										{header.title}
									</Text>
									{order?.by === header.col && (
										<ButtonCircle
											size="2xs"
											iconProps={{
												size: 'sm',
												name: order.dir === 'asc' ? 'ChevronUp' : 'ChevronDown',
												color: 'typography_600',
											}}
											className="bg-background-100 pointer-events-none"
										/>
									)}
								</HStack>
							</Pressable>
						)}
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
	)

	const TableBodyConponent = (TbProps: {
		data: typeof data
		dataCols: typeof dataCols
	}) => (
		<TableBody>
			{TbProps.data.map((row, rowIdx) => (
				<TableRow
					key={row.id}
					className={`border-b-0 min-h-14 bg-primary-${rowIdx % 2 === 0 ? 100 : 50} dark:bg-background-${rowIdx % 2 === 0 ? 100 : 200}`}
				>
					{TbProps.dataCols.map((col, i) => (
						<TableData
							key={String(col)}
							className="pl-4 pr-2 py-0"
							{...(dataMapColsStyle?.[col] ?? {})}
							style={{
								...((dataMapColsStyle?.[col]?.style ?? {}) as object),
								...(debug && {
									backgroundColor: i % 2 === 0 ? 'red' : 'blue',
								}),
							}}
						>
							<Box
								className="w-full h-full justify-center items-start overflow-hidden"
								style={{ height: lineHeight }}
							>
								{renderItemCol?.[col]?.({ row }) ?? (
									<Text size="sm" numberOfLines={numberOfLines}>
										{String(row[col])}
									</Text>
								)}
							</Box>
						</TableData>
					))}
				</TableRow>
			))}
		</TableBody>
	)

	const fixedColStyle = dataMapColsStyle?.[fixedCol]?.style as ViewStyle
	const offset = Math.max(curPage - 1, 0) * perPage
	const dataFormatted = data
		.sort((a, b) => {
			if (order?.dir === 'asc') return a[order.by] < b[order.by] ? -1 : 1
			if (order?.dir === 'desc') return a[order.by] > b[order.by] ? -1 : 1
			return 0
		})
		.slice(offset, offset + perPage)

	return (
		<Box
			className="overflow-hidden bg-background-0 dark:bg-background-50 border-2 border-background-0 dark:border-background-100"
			{...props}
			style={{ ...(props.style as object), borderRadius: 24 }}
		>
			{/*  HEADER FIXED */}
			<Box>
				{/*  HEADER FIXED > FIXED COLUMN */}
				{fixedCol && (
					<TableUI
						className="absolute border-r-2 border-background-0 dark:border-background-50 z-10"
						style={{ width: fixedColStyle?.width ?? fixedColStyle?.minWidth }}
					>
						<TableHaderConponent
							headers={headers.filter((e) => e.col === fixedCol)}
						/>
					</TableUI>
				)}

				{/* HEADER FIXED > SCROLL COLUMNS */}
				<ScrollView
					horizontal
					ref={headerScrollRef}
					scrollEnabled={false}
					showsHorizontalScrollIndicator={false}
				>
					<TableUI className="w-full">
						<TableHaderConponent headers={headers} />
					</TableUI>
				</ScrollView>
			</Box>

			{/* BODY SCROLL */}
			<ScrollContainer
				scrollViewProps={{ showsVerticalScrollIndicator: true }}
				{...scrollContainerProps}
			>
				<Box style={{ marginTop: -48 }}>
					{/* BODY SCROLL > FIXED COLUMN */}
					{fixedCol && (
						<TableUI
							className="absolute border-r-2 border-background-0 dark:border-background-50 z-10"
							style={{ width: fixedColStyle?.width ?? fixedColStyle?.minWidth }}
						>
							<TableHaderConponent
								headers={headers.filter((e) => e.col === fixedCol)}
							/>
							<TableBodyConponent data={dataFormatted} dataCols={[fixedCol]} />
						</TableUI>
					)}

					{/* BODY SCROLL > SCROLL COLUMNS */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ minWidth: '100%' }}
						bounces={false}
						overScrollMode="never"
						ref={bodyScrollRef}
						onScroll={(e) => syncScroll(e.nativeEvent.contentOffset.x)}
						scrollEventThrottle={16}
					>
						<TableUI className="w-full">
							<TableHaderConponent headers={headers} />
							<TableBodyConponent data={dataFormatted} dataCols={dataCols} />
						</TableUI>
					</ScrollView>
				</Box>
			</ScrollContainer>

			{/* FOOTER */}
			<HStack
				className={twMerge(
					'items-center gap-1 pl-4 pr-1 bg-background-0 dark:bg-background-50',
					Platform.OS === 'web' ? 'py-1' : 'py-2',
				)}
			>
				<SelectMenuField
					options={[
						{
							value: 5,
							label: `Exibir 5 em ${Math.ceil(totalRows / 5)} paginas`,
						},
						{
							value: 10,
							label: `Exibir 10 em ${Math.ceil(totalRows / 10)} paginas`,
						},
						{
							value: 25,
							label: `Exibir 25 em ${Math.ceil(totalRows / 25)} paginas`,
						},
						{
							value: 50,
							label: `Exibir 50 em ${Math.ceil(totalRows / 50)} paginas`,
						},
						{
							value: 100,
							label: `Exibir 100 em ${Math.ceil(totalRows / 100)} paginas`,
						},
					].filter((e) => e.value <= totalRows)}
					renderButtonText={({ optionSelected }) =>
						`${optionSelected?.value} de ${totalRows}`
					}
					size="sm"
					value={perPage}
					onChange={(op) => {
						onChangePerPage?.(op.value)
						onChangeCurPage?.(1)
					}}
				/>

				<HStack
					className={twMerge(
						'ml-auto items-center gap-1',
						Platform.OS === 'web' ? 'scale-75 -mr-6' : 'scale-90 -mr-1',
					)}
				>
					<ButtonCircle
						size="sm"
						iconProps={{
							name: 'ChevronLeft',
							color: { light: 'background_500', dark: 'background_700' },
						}}
						disabled={curPage === 1}
						onPress={() => onChangeCurPage?.(curPage - 1)}
					/>

					{pagination.map((page) => {
						const isValid = typeof page === 'number'
						const isActive = page === curPage

						return (
							<ButtonCircle
								key={page}
								size="sm"
								className={
									isValid && isActive
										? '!bg-primary-700 hover:!bg-primary-700 hover:dark:!bg-primary-700'
										: ''
								}
								disabled={!isValid}
								pointerEvents={isValid ? 'auto' : 'none'}
								onPress={() => isValid && onChangeCurPage?.(page)}
							>
								{isValid ? (
									<Text
										color={{
											light: isActive ? 'background_0' : 'typography_700',
											dark: isActive ? 'background_50' : 'typography_700',
										}}
									>
										{page}
									</Text>
								) : (
									<Text color="typography_700">...</Text>
								)}
							</ButtonCircle>
						)
					})}

					<ButtonCircle
						size="sm"
						disabled={curPage === totalPages}
						iconProps={{
							name: 'ChevronRight',
							color: { light: 'background_500', dark: 'background_700' },
						}}
						onPress={() => onChangeCurPage?.(curPage + 1)}
					/>
				</HStack>
			</HStack>
		</Box>
	)
}
