import { Box, Card, CardBody, Image, Heading, Text, Flex, HStack, Tag } from "@chakra-ui/react";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaMapPin, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import EventItem from "../model/EventItem";

interface CustomMarkerProps {
    eventItem: EventItem;
}

const CustomMarker = (props: CustomMarkerProps) => {

    const [showCard, setShowCard] = useState(false);
    const { description, category, img, address, signedPeople, availablePlaces, gender, level, tags } = props.eventItem;

    return (
        <>
            {showCard && <Card style={{ position: 'absolute', top: '20px', left: '-100px'}} zIndex={1} direction={'row'} borderColor='gray.200' _hover={{ cursor: 'pointer' }}>
                <Image
                    p={2}
                    objectFit='cover'
                    w={{ sm: '150px' }}
                    src={img}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <CardBody py={5}>
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
            </Card>}
            <Box zIndex={0} _hover={{ cursor: 'pointer' }} style={{ position: 'absolute', top: '0', left: '0', transform: 'translateZ(0) translate(-50%, -50%)' }}>
                <FaMapMarkerAlt onMouseOver={() => setShowCard(true)} onMouseOut={() => setShowCard(false)} size={30} color="red" />
            </Box>
        </>
    );
}

export default CustomMarker;