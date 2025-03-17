import React from 'react'
import { Link, Stack } from 'expo-router'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<Center>
				<Text>This screen doesn't exist.</Text>
				<Link href="/">
					<Button variant="link">Go to home screen!!</Button>
				</Link>
			</Center>
		</>
	)
}
