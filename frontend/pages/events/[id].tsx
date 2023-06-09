import { Container } from "@chakra-ui/layout"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next/types";
import { getEventById, getEventsList } from "../../service/EventsService";
import { ParsedUrlQuery } from "querystring";
import EventItem from "../../model/EventItem";
import { Avatar, Box, Button, Card, Flex, Grid, HStack, Heading, Tag, Text } from "@chakra-ui/react";
import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { googleMapsApiKey } from "../../model/Constants";
import { FaCalendar, FaMapPin } from "react-icons/fa";

interface Params extends ParsedUrlQuery {
    id: string,
}

type Props = {
    eventItem: EventItem
}

const EventDetails: NextPage<Props> = ({
    eventItem
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { id, description, category, address, signedPeople, availablePlaces, gender, level, tags, coordinates } = eventItem;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <Container p={5} maxW={'5xl'}>
            <Flex pt={5} justifyContent={'space-between'}>
                <Box>
                    <Heading>{category}</Heading>
                    <Flex py={2} alignItems={'center'}>
                        <Avatar size={'sm'} name="Wiesław Karkowski" />
                        <HStack pl={1}><Text color={'gray.600'}>Organized by:</Text><Text ml={'1'}>WieslawK</Text>
                        </HStack>
                    </Flex>
                </Box>
                <Box>
                    <Tag mr={2} size={'lg'}>JAN 25</Tag>
                    <Tag size={'lg'}>15:00</Tag>
                </Box>
                {/* <Button colorScheme={'green'}>Sign Up</Button> */}
            </Flex>
            <Text py={2}>25 marca, 2015</Text>
            <Text>{address.city}, {address.street}</Text>
            <Grid py={10} gap={5} gridTemplateColumns={'2fr 1fr'}>
                <Box>
                    <Heading pb={3} size={'lg'}>Description</Heading>
                    <Text>Dzień doberek, gramy dzisiaj w siatkówke o godzinie 15, kto chętny proszę o sms'a do godziny 16.</Text>
                </Box>
                <Box>
                    <Heading pb={3} size={'lg'}>Location</Heading>
                    <GoogleMap
                        zoom={13}
                        center={coordinates}
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                    >
                        <MarkerF position={coordinates} />
                    </GoogleMap>
                </Box>
            </Grid>
        </Container>

    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.params as Params;
    const eventItem = await getEventById(id);
    return {
        props: { eventItem }
    };
};

export default EventDetails;


