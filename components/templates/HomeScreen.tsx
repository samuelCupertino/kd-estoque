import { Grid, GridItem } from '../ui/grid'
import { ScrollContainer } from '../molecules'

export const HomeScreen = () => (
	<ScrollContainer>
		{(isLandscape) =>
			isLandscape ? (
				<Grid className="gap-2" _extra={{ className: 'grid-cols-6' }}>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-4' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-2' }}
						style={{ height: '100%', aspectRatio: 1 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
				</Grid>
			) : (
				<Grid className="gap-2" _extra={{ className: 'grid-cols-6' }}>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 1 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-3' }}
						style={{ height: '100%', aspectRatio: 1 / 1 }}
					></GridItem>

					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', aspectRatio: 2 / 2 }}
					></GridItem>

					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
					<GridItem
						className="bg-background-50 rounded-3xl"
						_extra={{ className: 'col-span-6' }}
						style={{ height: '100%', aspectRatio: 2 / 1 }}
					></GridItem>
				</Grid>
			)
		}
	</ScrollContainer>
)
