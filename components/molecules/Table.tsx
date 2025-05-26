import React, { ComponentProps } from 'react'
import { Badge, BadgeText } from '@/components/ui/badge'
import { Box } from '@/components/ui/box'
import {
	Table as TableUI,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableData,
} from '@/components/ui/table'

interface ITableProps extends Omit<ComponentProps<typeof Box>, 'children'> {
	data: any[]
}

export const Table = ({ data, ...props }: ITableProps) => (
	<Box className="w-full bg-red-500 rounded-lg overflow-hidden" {...props}>
		<TableUI className="w-full">
			<TableHeader>
				<TableRow className="border-b-0 bg-background-0 hover:bg-background-0">
					<TableHead className="font-bold">Order id</TableHead>
					<TableHead>Items</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>City</TableHead>
					<TableHead>Order price</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="border-b-0 bg-background-50">
					<TableData>5771</TableData>
					<TableData>3</TableData>
					<TableData>Rajesh Kumar</TableData>
					<TableData>New Jersey</TableData>
					<TableData>$ 200</TableData>
					<TableData>
						<Badge size="sm" action="success" className="w-fit justify-center">
							<BadgeText>Completed</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
				<TableRow className="border-b-0 hover:bg-background-0">
					<TableData>5231</TableData>
					<TableData>2</TableData>
					<TableData>Priya Sharma</TableData>
					<TableData>Austin</TableData>
					<TableData>$ 150</TableData>
					<TableData>
						<Badge size="sm" action="info" className="w-fit justify-center">
							<BadgeText>Processing</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
				<TableRow className="border-b-0 bg-background-50">
					<TableData>5771</TableData>
					<TableData>3</TableData>
					<TableData>Ravi Patel</TableData>
					<TableData>Seattle</TableData>
					<TableData>$ 215</TableData>
					<TableData>
						<Badge size="sm" action="warning" className="w-fit justify-center">
							<BadgeText>Shipped</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
				<TableRow className="border-b-0 hover:bg-background-0">
					<TableData>5231</TableData>
					<TableData>4</TableData>
					<TableData>Ananya Gupta</TableData>
					<TableData>California</TableData>
					<TableData>$ 88</TableData>
					<TableData>
						<Badge size="sm" action="info" className="w-fit justify-center">
							<BadgeText>Processing</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
				<TableRow className="border-b-0 bg-background-50">
					<TableData>5771</TableData>
					<TableData>3</TableData>
					<TableData>Arjun Singh</TableData>
					<TableData>Seattle</TableData>
					<TableData>$ 115</TableData>
					<TableData>
						<Badge size="sm" action="success" className="w-fit justify-center">
							<BadgeText>Completed</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
				<TableRow className="border-b-0 bg-background-0 hover:bg-background-0">
					<TableData>5771</TableData>
					<TableData>3</TableData>
					<TableData>Nisha Verma</TableData>
					<TableData>Seattle</TableData>
					<TableData>$ 115</TableData>
					<TableData>
						<Badge size="sm" action="info" className="w-fit justify-center">
							<BadgeText>Processing</BadgeText>
						</Badge>
					</TableData>
				</TableRow>
			</TableBody>
		</TableUI>
	</Box>
)
