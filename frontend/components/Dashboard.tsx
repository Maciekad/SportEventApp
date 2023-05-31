import EventItem from "../model/EventItem";
import { useEffect } from 'react';
import CategorySelector from "../components/CategorySelector";
import { useSearchParams } from 'next/navigation';
import {
    Container, Grid, useDisclosure, usePanGesture
} from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";
import Map from "../components/GoogleMap";
import { useState } from "react";
import { Coordinates } from "../model/Coordinates";
import EventsList from "./EventsList";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../utils/mapUtils";
import Address from "../model/Address";
import { googleMapsApiKey, sulkowiceCoordinates } from "../model/Constants";
import { useJsApiLoader } from "@react-google-maps/api";

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

    const onMapLoaded = async () => {
        setCoordinates(events);
    }

    return (
        <Container maxW="container.2xl" px={0}>
            <CategorySelector onModalOpen={onOpen} isMapOpen={showMap} onMapOpen={() => setShowMap((current) => !current)} />
            <ModalComponent isOpen={isOpen} onClose={onClose} />
            {showMap ? <Map height={"700px"} zoom={10} onMapLoaded={onMapLoaded} markers={markers as Coordinates[]} center={center as Coordinates} /> : <EventsList events={events} />}
        </Container>
    )
}

export default Dashboard;