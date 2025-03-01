import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'react-native';
import { Button, ButtonText } from '../ui/button';
import { Center } from '../ui/center';
import { Heading } from '../ui/heading';
import { Divider } from '../ui/divider';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '../ui/checkbox';
import { CheckIcon } from 'lucide-react-native';

export const HomeScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]

    return (
        <Box className='h-full'>
            <Text size='4xl' className='color-red-600'>home!</Text>

            <Center>
                {sizes.map((size, index) => (
                    <Heading size={size} key={index}>
                        {size}
                    </Heading>
                ))}
            </Center>

            <Divider className="my-0.5" />

            <Center>
                {sizes.map((size, index) => (
                    <Text size={size} key={index} className="text-center">
                        {size}
                    </Text>
                ))}
            </Center>

            <Divider className="my-0.5" />

            <Center>
                <Button size="md" variant="solid" action="primary">
                    <ButtonText>Hello World!</ButtonText>
                </Button>

                <Checkbox size="md" isInvalid={false} isDisabled={false} value='ola'>
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Label</CheckboxLabel>
                </Checkbox>


                {/* <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField placeholder="Enter Text here..." />
                </Input>


                <Input>
                    <InputField />
                    <InputSlot>
                        <InputIcon><CheckIcon /></InputIcon>
                    </InputSlot>
                </Input> */}
            </Center>


        </Box>
    )
};
