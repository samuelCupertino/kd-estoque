import EditScreenInfo from '@/components/EditScreenInfo'
import { Center } from '@/components/ui/center'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value'

export default function Home() {
  const val: string = useBreakpointValue({
    default: 'red',
    xs: 'white',
    sm: 'pink',
    md: 'green',
    lg: 'yellow',
    xl: 'black',
  })

  return (
    <Center className="flex-1" style={{ backgroundColor: val }}>
      <Heading className="font-bold text-2xl">Expo V3</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Text className="p-4">Example below to use gluestack-ui components.</Text>
      <EditScreenInfo path="app/(app)/(tabs)/index.tsx" />
    </Center>
  )
}
