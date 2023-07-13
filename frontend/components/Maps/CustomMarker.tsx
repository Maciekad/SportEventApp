import { Box, Card, CardBody, Image, Heading, Flex, HStack, Text, Avatar, AvatarGroup, VStack, Tag, Grid, Tooltip, Badge } from "@chakra-ui/react";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaMapPin, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import EventItem from "../../model/EventItem";
import { MdKeyboardArrowRight } from "react-icons/md";
import EventAttendee from "../../model/EventAttendee";
import { useRouter } from "next/router";
import { FiClock, FiMapPin } from "react-icons/fi";

interface CustomMarkerProps {
    eventItems: EventItem[];
}

const CustomMarker = (props: CustomMarkerProps) => {
    const router = useRouter();
    const [showCard, setShowCard] = useState(false);
    const { eventItems } = props;

    return (
        <>
            <Box onMouseLeave={() => setShowCard(false)} _hover={{ cursor: 'pointer' }} >
                <Box style={{ position: 'absolute', top: '0', left: '0', transform: 'translateZ(0) translate(-50%, -50%)' }} onMouseOver={() => setShowCard(true)}>
                    <FaMapMarkerAlt size={30} color="red" />
                </Box>
                {showCard &&
                    <Box style={{ position: 'absolute', top: '15px', left: '-100px', zIndex: 1 }}>
                        {eventItems.map((ev: EventItem) =>
                            <Card onClick={() => router.replace(`events/${ev.id}`)} zIndex={2} direction={'row'} borderColor='gray.200' _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}>
                                <Image
                                    p={2}
                                    objectFit='cover'
                                    w={{ sm: '150px' }}
                                    src={ev.img}
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <CardBody>
                                    <Flex pb={2} align="baseline">
                                        <Badge colorScheme="blue">{ev.level}</Badge>
                                        <Text
                                            ml={2}
                                            textTransform="uppercase"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color="blue.800"
                                        >
                                            {ev.discipline}
                                        </Text>
                                    </Flex>
                                    <Heading color='gray.700' pb={2} size='sm'>{ev.title}</Heading>
                                    <Text pb={3} color='blue.600' fontSize='md'>
                                        {ev.price}
                                    </Text>
                                    <Flex color='gray.700' pb={1} alignItems={'center'} fontSize="xs">
                                        <FiClock size={15} /> <Text pl={1}>12th Aug | 4:00PM</Text>
                                    </Flex>
                                    <Flex color='gray.700' pb={3} alignItems={'center'} fontSize="xs">
                                        <FiMapPin size={15} fontWeight={'bold'} /> <Text pl={1}>{ev.address.city}, {ev.address.street}</Text>
                                    </Flex>
                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                        <Text fontSize={'sm'}>{ev.attendees.length}/{ev.availablePlaces}</Text>
                                        <AvatarGroup spacing={'-1'} max={6}>
                                            {ev.attendees.map((at: EventAttendee) =>
                                                <Tooltip label={at.email}>
                                                    <Avatar size={'xs'} name={`${at.firstName} ${at.lastName}`}>
                                                    </Avatar>
                                                </Tooltip>)}
                                        </AvatarGroup>
                                    </Flex>
                                </CardBody>
                            </Card>)
                        }
                    </Box>
                }
            </Box>
        </>
    );
}

export default CustomMarker;