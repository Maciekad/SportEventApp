import { Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button, HStack, Tag, TagCloseButton, TagLabel, Image, Divider, Flex } from "@chakra-ui/react";
import EventItem from "../model/EventItem";
import { FaCalendar, FaClock, FaMapPin, FaPeopleCarry, FaUserFriends } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md"
import { useRouter } from "next/router";

interface EventCardProps {
    eventItem: EventItem
}

const EventCard = (props: EventCardProps) => {
    const { id, description, category, img, address, signedPeople, availablePlaces, gender, level, tags } = props.eventItem;

    const router = useRouter();
    return (
        <Card onClick={() => router.replace(`events/${id}`)} zIndex={2} size={'sm'} direction={'row'} borderColor='gray.200' _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}>
            <Image
                p={2}
                maxW={{ base: '100%', sm: '200px' }}
                objectFit='cover'
                src={img}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
            />
            <CardBody p={5}>
                <Heading color='gray.700' pb={2} size='sm'>{category}</Heading>
                <Flex color='gray.700' pb={1} alignItems={'center'} fontSize="sm">
                    <FaMapPin size={15} fontWeight={'bold'} /> <Text pl={1}>{address.city}, {address.street}</Text>
                </Flex>
                <Flex color='gray.700' pb={1} alignItems={'center'} fontSize="sm">
                    <FaUserFriends /> <Text pl={1}>{signedPeople}/{availablePlaces}</Text>
                </Flex>
                <Flex color='gray.700' pb={1} alignItems={'center'} fontSize="sm">
                    <FaClock /> <Text pl={1}>16:00</Text>
                </Flex>
                <Flex color='gray.700' alignItems={'center'} fontSize="sm">
                    <FaCalendar /> <Text pl={1}>Pon: 5.06</Text>
                </Flex>
                <HStack py={2} spacing={1}>
                    <Tag backgroundColor={'blue.200'} size={'sm'}>{level.description}</Tag>
                    <Tag backgroundColor={'green.200'} size={'sm'}>{gender}</Tag>
                </HStack>
            </CardBody>
            <HStack pr={2}><MdKeyboardArrowRight size={25} /></HStack>

        </Card>
    )
}

export default EventCard;