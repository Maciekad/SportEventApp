import { Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button, HStack, Tag, TagCloseButton, TagLabel, Image } from "@chakra-ui/react";
import EventItem from "../model/EventItem";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";


interface CardProps {
    eventItem: EventItem
}

const CardComponent = (props: CardProps) => {
    const { description, img, title, signedPeople, availablePlaces, level, tags } = props.eventItem;
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={img}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text>
                        {description}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        {signedPeople}/{availablePlaces}
                    </Text>
                    <Text>
                        {level.description}
                    </Text>
                    <HStack spacing={2}>
                        {tags.map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined, index) => {
                            return <Tag
                                size="sm"
                                key={index}
                                borderRadius='full'
                                colorScheme='gray'
                            >
                                <TagLabel>{item}</TagLabel>
                                <TagCloseButton />
                            </Tag>
                        })}
                    </HStack>
                </Stack>
            </CardBody>
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default CardComponent;