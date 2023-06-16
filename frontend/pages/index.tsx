import { Box, Button, Card, CardBody, Flex, Heading, Text, Image } from "@chakra-ui/react";
import router from "next/router";

const Home = () => {
  return (
    <Flex py={10} justifyContent={'center'} gap={3}>
      <Card maxW='28rem' size={'sm'} border={"1px "} borderColor='gray.200' onClick={() => router.push('/dashboard')} _hover={{ border: '1px', cursor: 'pointer' }}>
        <CardBody>
          <Heading textAlign={'center'} px={10} py={5} size={"lg"} mb={4}>Find sports facilities in your area</Heading>
          <Box>
            <Flex justifyContent={'center'}>
              <Image textAlign={'center'} src='/img/map.png' alt='mapPicture' />
            </Flex>
            <Text fontWeight={'light'} textAlign={'center'} fontSize={'xl'} px={5} pt={5}>This is the easiest way to find your favourite sport event. Check place on map and see what is happening there.</Text>
          </Box>
          <Flex p={6} justifyContent={'center'}>
            <Button size='lg' colorScheme='green'>
              Display map
            </Button>
          </Flex>
        </CardBody>
      </Card>
      <Card maxW='28rem' size={'sm'} border={"1px "} borderColor='gray.200' onClick={() => console.log('clicked')} _hover={{ border: '1px', cursor: 'pointer' }}>
        <CardBody>
          <Heading textAlign={'center'} px={10} py={5} size={"lg"} mb={4}>Create your own sport event</Heading>
          <Flex justifyContent={'center'}>
            <Image src='/img/calendar.png' alt='mapPicture' />
          </Flex>
          <Text fontWeight={'light'} textAlign={'center'} fontSize={'xl'} px={5} pt={5}>
            Pick up the sport you like and invite others to play together. You can choose criteria like level of advancement for a better fit.
          </Text>
          <Flex p={6} justifyContent={'center'}>
            <Button size='lg' colorScheme='green'>
              Create your first event
            </Button>
          </Flex>
        </CardBody>
      </Card>

    </Flex>
  )
}


export default Home;

