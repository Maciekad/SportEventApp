import { NextPage, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getEventsList } from "../service/EventsService";
import { useDisclosure, Container, Grid, Flex, Text, Card, Heading, CardBody, Box, Checkbox, CheckboxGroup, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Select, HStack } from "@chakra-ui/react";
import { useSearchParams, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import ModalComponent from "../components/Modals/FiltersModal";
import EventItem from "../model/EventItem";
import MapComponent from "../components/Maps/GoogleMap";
import Filters, { FilterSections, categories } from "../components/Filters";
import { FaMap } from "react-icons/fa";
import { AiFillFilter } from "react-icons/ai";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import FiltersModal from "../components/Modals/FiltersModal";
import MapModal from "../components/Modals/MapModal";

export interface EventPageQuery extends ParsedUrlQuery {
    search?: string,
    category?: string,
    level?: string,
    gender?: string
}

const Dashboard: NextPage = ({
    eventsList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [events, setEvents] = useState<EventItem[]>(eventsList);
    const [isMapShown, setIsMapShown] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    useEffect(() => {
        const { search } = router.query as EventPageQuery;
        if (search) {
            const eventsTemp: any[] = eventsList
                .filter((ev: any) => filterEvent(ev, search));

            setEvents(eventsTemp);

            return;
        }

        setEvents(eventsList);

    }, [router.query]);

    const filterEvent = (ev: EventItem, searchFilter: String): boolean => {

        if (ev.title.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.description.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.category.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.level.description.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        return false;
    }

    return (
        <Box p={10}>
            <FiltersModal isOpen={isOpen} onClose={onClose} />
            <MapModal events={events} isOpen={isMapShown} onClose={() => setIsMapShown(false)} />
            <Flex pb={10} justifyContent={'space-between'}>
                <Heading size={'lg'}>Events</Heading>
                <HStack gap={1}>
                    <Button bgColor={'white'} onClick={onOpen}><AiFillFilter /><Text pl={2}>Filters</Text> </Button>
                    <Button bgColor={'white'} onClick={() => setIsMapShown((current) => !current)}><FaMap />
                        {isMapShown ? <Text pl={2}>Hide Map</Text> : <Text pl={2}>Show Map</Text>}
                    </Button>
                </HStack>
            </Flex>
            <Grid gap={5} gridTemplateColumns={'1fr 1fr 1fr 1fr'}>
                {events
                    .map((ev: EventItem, index) => {
                        return <EventCard key={index} eventItem={ev} />
                    })}

            </Grid>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const eventsList = await getEventsList();
    return {
        props: {
            eventsList,
        },
    };
};

export default Dashboard;