import { NextPage, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getEventsList } from "../service/EventsService";
import { useDisclosure, Container, Grid, Flex, Text, Card, Heading, CardBody, Box, Checkbox, CheckboxGroup, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import ModalComponent from "../components/ModalComponent";
import EventItem from "../model/EventItem";
import Map from "../components/GoogleMap";

const Dashboard: NextPage = ({
    result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [events, setEvents] = useState<EventItem[]>(result);
    const [filter, setFilter] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const searchParams = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('search');
        search ? setFilter(search) : setFilter('');
    }, [searchParams]);

    useEffect(() => {
        const eventsTemp: any[] = result
            .filter((ev: any) => filterEvent(ev));

        setEvents(eventsTemp);

    }, [filter]);

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
        <Container maxW={'10xl'} px={5} py={5}>
            {/* <CategorySelector onModalOpen={onOpen} /> */}
            {/* <Flex px={10} py={5}>
                <Breadcrumb spacing='8px' separator={<MdKeyboardArrowRight color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'><Text fontSize={"md"}>Home</Text></BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'><Text fontSize={"md"}>Dashboard</Text></BreadcrumbLink>
                    </BreadcrumbItem>

                </Breadcrumb>
            </Flex> */}
            <ModalComponent isOpen={isOpen} onClose={onClose} />
            <Grid templateColumns="1fr 4fr 2fr">
                <Flex height={'100vh'} overflow={'scroll'} direction={'column'}>
                    <Card>
                        <CardBody>
                            <Heading size={"md"}>Filter by the following criteria</Heading>
                            <Box my={5}>
                                <Text fontWeight='semibold' my={4}>
                                    Sport
                                </Text>
                                <CheckboxGroup colorScheme='green' defaultValue={['mix']}>
                                    <Stack  spacing={[1, 2]}>
                                        <Checkbox size={'md'} value='naruto'><Text >Football</Text></Checkbox>
                                        <Checkbox value='sasuke'>Volleyball</Checkbox>
                                        <Checkbox value='kakashi'>Basketball</Checkbox>
                                        <Checkbox value='kakashi'>Tennis</Checkbox>
                                        <Checkbox value='kakashi'>Cycling</Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                            <Box my={5}>
                                <Text fontWeight='semibold' my={4}>
                                    Level
                                </Text>
                                <CheckboxGroup colorScheme='green' defaultValue={['mix']}>
                                    <Stack spacing={[1, 2]}>
                                        <Checkbox value='naruto'>Advanced</Checkbox>
                                        <Checkbox value='sasuke'>Semi-advanced</Checkbox>
                                        <Checkbox value='kakashi'>Beginner</Checkbox>
                                        <Checkbox value='kakashi'>Recreational</Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                            <Box my={5}>
                                <Text fontWeight='semibold' my={4}>
                                    Gender
                                </Text>
                                <CheckboxGroup colorScheme='green' defaultValue={['mix']}>
                                    <Stack spacing={[1, 2]}>
                                        <Checkbox value='naruto'>Male</Checkbox>
                                        <Checkbox value='sasuke'>Female</Checkbox>
                                        <Checkbox value='kakashi'>Mix</Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                        </CardBody>
                    </Card>
                </Flex>

                <Map eventItems={result} />
                <Flex px={5} gap={5} height={'100vh'} overflow={'scroll'} direction={'column'}>
                    {events
                        .map((ev: EventItem, index) => {
                            return <EventCard key={index} eventItem={ev} />
                        })}
                </Flex>
            </Grid>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const result = await getEventsList();
    return {
        props: {
            result,
        },
    };
};

export default Dashboard;