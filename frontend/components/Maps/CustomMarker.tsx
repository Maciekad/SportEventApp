import { Box, Card, CardBody, Image, Heading, Flex, HStack, Text, Avatar, AvatarGroup, VStack, Tag, Grid, Tooltip } from "@chakra-ui/react";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaMapPin, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import EventItem from "../../model/EventItem";
import { MdKeyboardArrowRight } from "react-icons/md";
import EventAttendee from "../../model/EventAttendee";
import { useRouter } from "next/router";

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
                                <CardBody px={2} py={3}>
                                    <Grid gridTemplateColumns={'3fr 1fr'}>
                                        <Flex direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'}>
                                            <Box pb={3}>
                                                <Heading mr={20} color='gray.700' size='sm'>{ev.category}</Heading>
                                                <Text fontWeight={'light'} fontSize={'sm'}>{ev.level.description}</Text>
                                            </Box>
                                            <AvatarGroup spacing={'-1'} max={6}>
                                                {ev.attendees.map((at: EventAttendee) =>
                                                    <Tooltip label={at.email}>
                                                        <Avatar size={'xs'} name={`${at.firstName} ${at.lastName}`}>
                                                        </Avatar>
                                                    </Tooltip>)}
                                            </AvatarGroup>

                                            <Flex pl={1} pt={4} justifyContent={'space-between'} alignItems={'center'}>
                                                <FaClock color="gray" /><Text fontWeight={'light'} fontSize={'sm'} pl={1}>Jul 12, 3:00pm</Text>
                                            </Flex>

                                        </Flex>
                                        <Flex direction={'column'} justifyContent={'space-between'} alignItems={'flex-end'}>
                                            <Box pb={6}>
                                                <Tag size={'sm'} colorScheme="blue">{ev.attendees.length}/{ev.availablePlaces}</Tag>
                                            </Box>

                                            <MdKeyboardArrowRight color="gray" size={20} />
                                            <Text fontSize={'sm'} pt={4}>20zl/h</Text>
                                        </Flex>
                                    </Grid>
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