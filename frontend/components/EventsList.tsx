import { Container, Grid } from "@chakra-ui/react";
import EventItem from "../model/EventItem";
import CardComponent from "./CardComponent";

interface EventsListProps {
    events: EventItem[];
}

const EventsList = (props: EventsListProps) => {
    const { events } = props;

    return (
        <Container maxW={"container.2xl"} px={"20"}>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {events
                    .map((ev: EventItem, index) => {
                        return <CardComponent key={index} eventItem={ev} />
                    })}
            </Grid>
        </Container>
    );
}

export default EventsList;