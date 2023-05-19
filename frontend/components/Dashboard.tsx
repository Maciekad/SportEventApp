import EventItem from "../model/EventItem";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import Modal from "../components/Modal";
import AddressForm from "../components/AddressForm";
import CategorySelector from "../components/CategorySelector";
import { useSearchParams } from 'next/navigation';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Container, Grid, Heading, Stack, Image, Text, Tag, TagCloseButton, TagLabel, HStack, Box } from "@chakra-ui/react";


interface DashboardPageProps {
    events: any;
}

const Dashboard = (
    props: DashboardPageProps,
) => {

    const [events, setEvents] = useState(props.events);
    const [filter, setFilter] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Container maxW="container.2xl" px={10}>
            {/* <div className="px-20">
                <SearchInput onSearchTextChanged={onSearchTextChanged} />
                <button
                    className={buttonClass}
                    onClick={openModal}>
                    Open modal
                </button>
            </div> */}
            {/* <Box p={4}>
                <CategorySelector />
            </Box> */}
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
            {modalIsOpen &&
                <Modal onCancel={closeModal} onSubmit={closeModal}>
                    <AddressForm />
                </Modal>}


            
        </Container>
    )
}

export default Dashboard;