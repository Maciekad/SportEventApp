import EventItem from "../model/EventItem";
import { useEffect } from 'react';
import CategorySelector from "../components/CategorySelector";
import { useSearchParams } from 'next/navigation';
import {
    Container, Flex, Grid, useDisclosure, usePanGesture, Text, Box
} from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";
import Map from "../components/GoogleMap";
import { useState } from "react";
import { Coordinates } from "../model/Coordinates";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../utils/mapUtils";
import { googleMapsApiKey, sulkowiceCoordinates } from "../model/Constants";
import EventCard from "./EventCard";

interface DashboardPageProps {
    events: EventItem[];
}

const Dashboard = (
    props: DashboardPageProps,
) => {

    const [events, setEvents] = useState<EventItem[]>(props.events);
    const [filter, setFilter] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [center, setCenter] = useState<Coordinates>(sulkowiceCoordinates);
    const [markers, setMarkers] = useState<Coordinates[]>();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const searchParams = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('search');
        search ? setFilter(search) : setFilter('');
    }, [searchParams]);

    useEffect(() => {
        const eventsTemp: any[] = props.events
            .filter((ev: any) => filterEvent(ev));

        setEvents(eventsTemp);
        if (showMap) setCoordinates(eventsTemp);

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

    const setCoordinates = async (events: EventItem[]) => {
        const addresses = events.filter(ev => ev.address).map(ev => ev.address);
        const promises = addresses.map(async ad => await getCoordinatesFromAddress(ad));
        const markers = await Promise.all(promises);
        setMarkers(markers as Coordinates[])
    }

    const onMapLoaded = () => {
        setShowMap(true);
        setCoordinates(events);
    }

    const onMarkerClick = async (coordinates: Coordinates) => {
        const address = await getAddressFromCoordinates(coordinates);
        const eventsTemp: any[] = props.events
            .filter((ev: EventItem) => JSON.stringify(ev.address) === JSON.stringify(address));

        setEvents(eventsTemp);
    };

    return (
        <Container maxW={'10xl'} px={5}>
            <CategorySelector onModalOpen={onOpen} />
            <ModalComponent isOpen={isOpen} onClose={onClose} />
            <Grid templateColumns="1fr 3fr">
                <Flex height={'100vh'} overflow={'scroll'} direction={'column'} alignItems={'center'} gap={5}>
                    {events
                        .map((ev: EventItem, index) => {
                            return <EventCard key={index} eventItem={ev} />
                        })}
                </Flex>
                <Map onMarkerClicked={onMarkerClick} onMapLoaded={onMapLoaded} markers={markers as Coordinates[]} center={center as Coordinates} />
            </Grid>
        </Container>
    )
}

export default Dashboard;