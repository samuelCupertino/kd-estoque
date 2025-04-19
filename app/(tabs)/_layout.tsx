import { Tabs } from 'expo-router'
import { Icon } from '@/components/atoms'
import { TabBar } from '@/components/organisms'

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				animation: 'fade',
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="Home" size="xl" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="stock"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="PackageSearch" size="xl" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="ai-agents"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="Bot" size="xl" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="Bell" size="xl" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => (
						<Icon name="UserRound" size="xl" color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
