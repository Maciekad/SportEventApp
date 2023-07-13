import { NextPage, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getEventsList } from "../service/EventsService";
import { useDisclosure, Grid, Flex, Text, Heading, Box, Button, HStack, Tag, Badge, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import EventItem from "../model/EventItem";
import { FaMap } from "react-icons/fa";
import { AiFillFilter } from "react-icons/ai";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import FiltersModal from "../components/Modals/FiltersModal";
import MapModal from "../components/Modals/MapModal";
import { Category } from "../components/Filters";

export interface EventPageQuery extends ParsedUrlQuery {
    search: string,
    discipline: string[],
    level: string[],
    gender: string[]
}

const Dashboard: NextPage = ({
    eventsList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [events, setEvents] = useState<EventItem[]>(eventsList);
    const [isMapShown, setIsMapShown] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [categoryFilters, setCategoryFilters] = useState(new Set<String>());

    const router = useRouter();

    useEffect(() => {
        const { search, discipline, level, gender } = router.query as EventPageQuery;

        let result: EventItem[] = eventsList;

        if (search) {
            result = eventsList
                .filter((ev: any) => filterEventBySearch(ev, search));

            setCategoryFilters(prev => {
                prev.clear();
                return prev
            })
        }

        if (discipline) {
            result = filterEventsByCategory(result, Category.DISCIPLINE, discipline);
            addParamsToFilter(discipline);
        };

        if (level) {
            result = filterEventsByCategory(result, Category.LEVEL, level);
            addParamsToFilter(level)
        };

        if (gender) {
            result = filterEventsByCategory(result, Category.GENDER, gender);
            addParamsToFilter(gender)
        }

        setEvents(result);

    }, [router.query]);

    const filterEventBySearch = (ev: EventItem, searchFilter: String): boolean => {

        if (ev.title.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.description.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.discipline.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        if (ev.level.toLowerCase().includes(searchFilter.toLowerCase()))
            return true;

        return false;
    };

    const filterEventsByCategory = (events: EventItem[], category: string, params: string[]) => {
        return events.filter((ev: any) => params.includes(ev[category]));
    }

    const addParamsToFilter = (params: string[] | string) => {
        // parse query param to array
        const filters = params.toString().split(',');

        setCategoryFilters(prev => {
            filters.forEach(f => prev.add(f))
            return prev
        })
    };

    return (
        <Box p={10}>
            <FiltersModal isOpen={isOpen} onClose={onClose} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters} />
            <MapModal events={events} isOpen={isMapShown} onClose={() => setIsMapShown(false)} />
            <Flex pb={10} alignItems={'center'} justifyContent={'space-between'}>
                <Heading size={'lg'}>Upcoming Events</Heading>
                <HStack gap={1}>
                    <Button bgColor={'white'} onClick={onOpen}>
                        <AiFillFilter />
                        <Text pl={2}>Filters</Text>
                        {categoryFilters.size > 0 && <Badge py={1} px={2} colorScheme="red" borderRadius={'xl'} position={'absolute'} top={-2} right={-2}>{categoryFilters.size}</Badge>}
                    </Button>
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