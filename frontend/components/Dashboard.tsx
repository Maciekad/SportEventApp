import EventItem from "../model/EventItem";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import AddressForm from "./Forms/AddressForm";
import CategorySelector from "../components/CategorySelector";
import { useSearchParams } from 'next/navigation';
import {
    Button, ButtonGroup, Card, CardBody,
    CardFooter, Container, Grid, Heading, Stack,
    Image, Text, Tag, TagCloseButton, TagLabel,
    HStack, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, useDisclosure, Box, Flex, Divider, Checkbox, CheckboxGroup
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { buttonClass } from "../model/Constants";
import { AiFillFilter } from "react-icons/ai"
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall } from "react-icons/fa";
import ModalComponent from "./ModalComponent";


interface DashboardPageProps {
    events: any;
}

const Dashboard = (
    props: DashboardPageProps,
) => {

    const [events, setEvents] = useState(props.events);
    const [filter, setFilter] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const searchParams = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('search');
        search ? setFilter(search) : setFilter('');
    }, [searchParams]);

    useEffect(() => {

        console.log(filter)
        const eventsTemp: any[] = props.events
            .filter((ev: any) => filterEvent(ev));

        setEvents(eventsTemp);

    }, [filter]);

    const onSearchTextChanged = (text: string) => {
        setFilter(text);
    }

    const filterEvent = (ev: EventItem): boolean => {

        if (ev.title.toLowerCase().includes(filter.toLowerCase()))
            return true;

        if (ev.description.toLowerCase().includes(filter.toLowerCase()))
            return true;

        if (ev.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
            return true;

        return false;
    }

    return (
        <Container maxW="container.2xl" px={20}>
            <Flex py={5} justifyContent='space-between' alignItems='center'>
            <CategorySelector />
                <Button onClick={onOpen}><Text pr={1}>Filters</Text> <AiFillFilter /></Button>
            </Flex>
            <ModalComponent isOpen={isOpen} onClose={onClose} />
            
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {events
                    .map((ev: any) => {
                        return <Card maxW='sm'>
                            <CardBody>
                                <Image
                                    src={ev.img}
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{ev.title}</Heading>
                                    <Text>
                                        {ev.description}
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        {ev.signedPeople}/{ev.availablePlaces}
                                    </Text>
                                    <Text>
                                        {ev.level.description}
                                    </Text>
                                    <HStack spacing={2}>
                                        {ev.tags.map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined) => {
                                            return <Tag
                                                size="sm"
                                                key="md"
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
                    })}
            </Grid>
        </Container>
    )
}

export default Dashboard;