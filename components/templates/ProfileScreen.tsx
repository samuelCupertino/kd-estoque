import { ScrollView } from 'react-native'
import { Grid, GridItem } from '@/components/ui/grid'

export const ProfileScreen = () => (
	<ScrollView
		contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, padding: 8 }}
		showsVerticalScrollIndicator={false}
	>
		<Grid className="gap-2" _extra={{ className: 'grid-cols-2' }}>
			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>
			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>

			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-2' }}
			></GridItem>

			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>
			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>
			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>
			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-1' }}
			></GridItem>

			<GridItem
				className="bg-background-50 rounded-3xl h-52"
				_extra={{ className: 'col-span-2' }}
			></GridItem>
		</Grid>
	</ScrollView>
)
