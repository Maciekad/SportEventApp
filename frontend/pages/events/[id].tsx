import { Container } from "@chakra-ui/layout"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next/types";
import { addEventAttendee, getEventById, getEventsList } from "../../service/EventsService";
import { ParsedUrlQuery } from "querystring";
import EventItem from "../../model/EventItem";
import { Avatar, Box, Button, Card, Flex, Grid, HStack, Heading, Tag, Text, Tooltip, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { googleMapsApiKey } from "../../model/Constants";
import {  FaMapMarkerAlt, FaMapPin, FaPhone } from "react-icons/fa";
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
    const [signedUp, setSignedUp] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    const { isLoggedIn, currentUser } = useAuth() as IAuth;


    const data = [
        {
            label: 'Description',
            content: <Text py={5}>{event.description}</Text>,
        },
        {
            label: 'Participants',
            content: <Flex gap={2} justifyContent={'flex-start'} flexDirection={'column'} py={5}>
                {event.attendees.map((at: EventAttendee) =>
                    <Tooltip key={at.id} label={at.email}>
                        <HStack>
                            <Avatar ml={1} size='sm' name={`${at.firstName} ${at.lastName}`}>
                            </Avatar>
                            <Text>{at.firstName} {at.lastName}</Text>
                        </HStack>
                    </Tooltip>)}
            </Flex>
        },
    ]

    useEffect(() => {
        const isSignedUp = eventItem.attendees?.some((at: EventAttendee) => at.email === currentUser?.email);
        setSignedUp(isSignedUp)
    }, [currentUser])

    if (!isLoaded)
        return <div>Loading...</div>

    const signUp = async () => {
        console.log(currentUser)
        try {
            const updatedEvent = await addEventAttendee(1, { id: Number(currentUser.id), email: currentUser.email, firstName: currentUser.firstName, lastName: currentUser.lastName })
            setEvent(updatedEvent)
            setSignedUp(true);
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

                    <Text fontWeight={'semibold'} textColor={''} fontSize={'xl'} pb={5}>{level.description}</Text>

                    <Text pb={5} fontWeight={'light'}>Saturday, January, 10 2023</Text>

                    
                    <HStack pb={2}><FaMapMarkerAlt size={30} color="red" /><Text>{address.city}, {address.street}</Text></HStack>

                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <Flex py={2} gap={2} alignItems={'center'}>
                            <Avatar size={'sm'} name="Wiesław Karkowski" />
                            <HStack><Text color={'gray.600'}>Organized by:</Text><Text>WieslawK</Text>
                            </HStack>
                        </Flex>

                        {!signedUp ? <Button onClick={signUp} colorScheme={'green'}>Sign Up</Button> :
                            <Tag size={'lg'}>You've already sign up</Tag>}
                    </Flex>
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
                <Card gridRow={'2/4'} p={5}>
                    <Tabs>
                        <TabList>
                            {data.map((tab, index) => (
                                <Tab key={index}>{tab.label}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {data.map((tab, index) => (
                                <TabPanel p={4} key={index}>
                                    {tab.content}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
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


