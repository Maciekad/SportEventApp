import { Modal, Image, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, Grid, CheckboxGroup, Text, Stack, Checkbox, ModalFooter, Button, Box, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack, Flex } from "@chakra-ui/react";
import events from "events";
import EventItem from "../../model/EventItem";
import Filters, { FilterSections } from "../Filters";
import MapComponent from "../Maps/GoogleMap";
import { useState, useEffect } from "react";

interface ModalComponentProps {
    onClose: () => void,
    isOpen: boolean,
    events: EventItem[]
}

const MapModal = (props: ModalComponentProps) => {
    const { isOpen, onClose, events } = props;

    const [categoryFilters, setCategoryFilters] = useState(new Set<String>());

    const [filterSections, setFilterSections] = useState<FilterSections>({ isSportFilter: false, isLevelFilter: false, isGenderFilter: false })

    const [mapEvents, setMapEvents] = useState<EventItem[]>(events);

    useEffect(() => {
        let result: EventItem[] = props.events;

        if (categoryFilters.size !== 0) {

            if (filterSections.isSportFilter) {
                result = events.filter((ev: EventItem) => categoryFilters.has(ev.category));
            }

            if (filterSections.isLevelFilter) {
                result = result.filter((ev: EventItem) => categoryFilters.has(ev.level.description));
            }

            if (filterSections.isGenderFilter) {
                result = result.filter((ev: EventItem) => categoryFilters.has(ev.gender));
            }
        }

        setMapEvents(result);

    }, [categoryFilters, filterSections]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={10} maxW='95vw' maxH='95vh'>
            <ModalCloseButton borderRadius={'3xl'} size={'lg'} backgroundColor={'white'} zIndex={1} />
                <Grid templateColumns="1fr 4fr">
                    <Filters setCategoryFilters={setCategoryFilters} setFilterSections={setFilterSections} />
                    <MapComponent eventItems={mapEvents} />
                </Grid>
            </ModalContent>
        </Modal>
    );
}

export default MapModal;