import { Container } from "@chakra-ui/layout"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next/types";
import { addEventAttendee, getEventById, getEventsList } from "../../service/EventsService";
import { ParsedUrlQuery } from "querystring";
import EventItem from "../../model/EventItem";
import { Avatar, Box, Button, Card, Flex, Grid, HStack, Heading, Link, Tag, Text, Image, AvatarGroup } from "@chakra-ui/react";
import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { googleMapsApiKey } from "../../model/Constants";
import { FaArrowLeft, FaCalendar, FaMapMarkedAlt, FaMapMarkerAlt, FaMapPin, FaPhone } from "react-icons/fa";
import NextLink from 'next/link';
import { IAuth, useAuth } from "../../lib/auth";
import { useEffect, useState } from "react";
import EventAttendee from "../../model/EventAttendee";
import Email from "next-auth/providers/email";

interface Params extends ParsedUrlQuery {
    id: string,
}

type Props = {
    eventItem: EventItem
}

const EventDetails: NextPage<Props> = ({
    eventItem
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [event, setEvent] = useState<EventItem>(eventItem)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    const { isLoggedIn, currentUser } = useAuth() as IAuth;

    if (!isLoaded)
        return <div>Loading...</div>

    const signUp = async () => {
        console.log(currentUser)
        try {
            const updatedEvent = await addEventAttendee(1, { id: 1, email: currentUser.email, firstName: currentUser.firstName, lastName: currentUser.lastName })
            console.log(updatedEvent)
            setEvent(updatedEvent)
        } catch (error) {
            console.error('Register error')
        }
    }

    const { id, description, title, img, category, address, signedPeople, availablePlaces, gender, level, tags, coordinates, attendees } = event;

    return (
        <Container maxW={'8xl'} px={5}>
            <Grid templateColumns={'2fr 1fr'} py={5} gap={5}>
                <Card p={5}>
                    <Flex pb={5} justifyContent={'space-between'}>
                        <Box>
                            <Heading>{title}</Heading>
                        </Box>
                        <Box>
                            <Tag mr={2} size={'lg'}>JAN 25</Tag>
                            <Tag size={'lg'}>15:00</Tag>
                        </Box>
                    </Flex>

                    <AvatarGroup pb={5} size='sm' spacing={'0.5'} max={6}>
                        {attendees.map((at: EventAttendee) => <Avatar name={`${at.firstName} ${at.lastName}`}></Avatar>)}
                    </AvatarGroup>

                    <Text pb={5}>{level.description}</Text>
                    <HStack pb={2}><FaMapMarkerAlt size={30} color="red" /><Text>{address.city}, {address.street}</Text></HStack>

                    <Flex py={2} alignItems={'center'}>
                        <Avatar size={'sm'} name="Wiesław Karkowski" />
                        <HStack pl={2}><Text color={'gray.600'}>Organized by:</Text><Text ml={'1'}>WieslawK</Text>
                        </HStack>
                    </Flex>

                    <Flex justifyContent={'space-between'} alignItems={'center'}><Text fontWeight={'light'}>Saturday, January, 10 2023</Text><Button onClick={signUp} colorScheme={'green'}>Sign Up</Button></Flex>
                </Card>

                <Box>
                    <GoogleMap
                        zoom={13}
                        center={coordinates}
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                    >
                        <MarkerF position={coordinates} />
                    </GoogleMap>
                </Box>
                <Card p={5}>
                    <Heading pb={1} size="md">Description</Heading>
                    <Text fontWeight={'light'}>{description}</Text>
                </Card>


                <Card p={5}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <Box>
                            <Heading pb={1} size={'md'}>Need some help?</Heading>
                            <Text fontWeight={'light'}>Contact organizer and ask him a question</Text>
                        </Box>
                        <Button filter={!isLoggedIn ? 'auto' : 'initial'} blur={'4px'}><FaPhone /><Text pl={2}>664120444</Text></Button>
                    </Flex>
                </Card>


            </Grid>
        </Container >

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


