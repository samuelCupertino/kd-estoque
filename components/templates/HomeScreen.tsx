import { Grid, GridItem } from '../ui/grid'
import { ScrollContainer } from '../atoms'

export const HomeScreen = () => (
	<ScrollContainer>
		{(isLandscape) =>
			isLandscape ? (
				<Grid
					className="gap-2"
					_extra={{ className: 'grid-cols-6' }}
					style={{ paddingLeft: 92 }}
				>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-4' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 1 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
				</Grid>
			) : (
				<Grid
					className="gap-2"
					_extra={{ className: 'grid-cols-6' }}
					style={{ paddingBottom: 92 }}
				>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 1 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 2 }}
					></GridItem>

					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', borderRadius: 24, aspectRatio: 2 / 1 }}
					></GridItem>
				</Grid>
			)
		}
	</ScrollContainer>
)
