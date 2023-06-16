import { Card, CardBody, Heading, Text, Button, Image, Flex, AvatarGroup, Tooltip, Avatar, Tag, Badge, Box, Progress } from "@chakra-ui/react";
import EventItem from "../model/EventItem";
import { FiMapPin, FiClock } from "react-icons/fi"
import { useRouter } from "next/router";
import EventAttendee from "../model/EventAttendee";

interface EventCardProps {
    eventItem: EventItem
}

const EventCard = (props: EventCardProps) => {
    const { id, title, price, attendees, category, img, address, signedPeople, availablePlaces, gender, level, tags } = props.eventItem;

    const router = useRouter();
    return (
        <Card onClick={() => router.replace(`events/${id}`)} zIndex={2} size={'sm'} direction={'column'} borderColor='gray.200' _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}>
            <Image
                px={4}
                pt={4}
                borderRadius={'xl'}
                maxW={{ base: '100%', sm: '400px' }}
                maxH={{ sm: '200px' }}
                objectFit='cover'
                src={img}
                alt='Green double couch with wooden legs'
            />
            <CardBody px={5} pb={5}>
                <Flex pb={4} align="baseline">
                    <Badge colorScheme="blue">{level.description}</Badge>
                    <Text
                        ml={2}
                        textTransform="uppercase"
                        fontSize="sm"
                        fontWeight="bold"
                        color="blue.800"
                    >
                        {category} &bull; {gender}
                    </Text>
                </Flex>
                <Heading color='gray.700' pb={2} size='md'>{title}</Heading>
                <Text pb={3} color='blue.600' fontSize='2xl'>
                    {price}
                </Text>
                <Flex color='gray.700' pb={1} alignItems={'center'} fontSize="sm">
                    <FiClock size={17} /> <Text pl={1}>12th Aug | 4:00PM</Text>
                </Flex>
                <Flex color='gray.700' pb={4} alignItems={'center'} fontSize="sm">
                    <FiMapPin size={17} fontWeight={'bold'} /> <Text pl={1}>{address.city}, {address.street}</Text>
                </Flex>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Box>{attendees.length}/{availablePlaces}</Box>
                    <AvatarGroup spacing={'-1'} max={6}>
                        {attendees.map((at: EventAttendee) =>
                            <Tooltip label={at.email}>
                                <Avatar size={'sm'} name={`${at.firstName} ${at.lastName}`}>
                                </Avatar>
                            </Tooltip>)}
                    </AvatarGroup>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default EventCard;