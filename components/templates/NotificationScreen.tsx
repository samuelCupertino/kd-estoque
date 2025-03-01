import { ScrollView } from 'react-native';
import { Grid, GridItem } from '../ui/grid';

export const NotificationScreen = () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, padding: 8 }}
            showsVerticalScrollIndicator={false}
        >

            <Grid className='gap-2' _extra={{ className: "grid-cols-2" }}>
                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>
                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>

                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-2" }}
                >
                </GridItem>


                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>
                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>


                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-2" }}
                >
                </GridItem>

                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>
                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-1" }}
                >
                </GridItem>

                <GridItem
                    className="bg-background-50 rounded-3xl h-52"
                    _extra={{ className: "col-span-2" }}
                >
                </GridItem>

            </Grid>
        </ScrollView>
    )
};
