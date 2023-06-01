import { Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, Grid, CheckboxGroup, Text, Stack, Checkbox, ModalFooter, Button, Box, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { BiTennisBall } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall } from "react-icons/fa";
import AddressForm from "./Forms/AddressForm";
import { useState } from "react";

interface ModalComponentProps {
    onClose: () => void,
    isOpen: boolean
}

const ModalComponent = (props: ModalComponentProps) => {
    const { isOpen, onClose } = props;

    const labelStyles = {
        mt: '3',
        fontSize: 'sm',
    }
    return (
        <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                    <Box my={5}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Discipline
                        </Text>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                            <Box as="button" _hover={{ border: '2px' }} _focus={{
                                border: '2px',
                                bg: '#F7F7F7'
                            }} border='2px' borderRadius={10} borderColor='gray.200' p={4}>
                                <FaVolleyballBall size={25} />
                                <Text align={'start'} pt={8} fontWeight={'semibold'}>Volleyball</Text>
                            </Box>
                            <Box as="button" _hover={{ border: '2px' }} _focus={{
                                border: '2px',
                                bg: '#F7F7F7'
                            }} border='2px' borderRadius={10} borderColor='gray.200' p={4}>
                                <FaFutbol size={25} />
                                <Text align={'start'} pt={8} fontWeight={'semibold'}>Football</Text>
                            </Box>
                            <Box as="button" _hover={{ border: '2px' }} _focus={{
                                border: '2px',
                                bg: '#F7F7F7'
                            }} border='2px' borderRadius={10} borderColor='gray.200' p={4}>
                                <FaBasketballBall size={25} />
                                <Text align={'start'} pt={8} fontWeight={'semibold'}>Basketball</Text>
                            </Box>
                            <Box as="button" _hover={{ border: '2px' }} _focus={{
                                border: '2px',
                                bg: '#F7F7F7'
                            }} border='2px' borderRadius={10} borderColor='gray.200' p={4}>
                                <BiTennisBall size={25} />
                                <Text align={'start'} pt={8} fontWeight={'semibold'}>Tenis</Text>
                            </Box>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box my={10}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Level
                        </Text>
                        <Slider aria-label='slider-ex-6' step={10} max={40}>
                            <SliderMark value={0} {...labelStyles}>
                            Recreational
                            </SliderMark>
                            <SliderMark value={10} {...labelStyles}>
                                Beginner
                            </SliderMark>
                            <SliderMark value={20} {...labelStyles}>
                                Semi-advanced
                            </SliderMark>
                            <SliderMark value={30} {...labelStyles}>
                                Advanced
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                    <Divider />
                    <Box my={10}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Gender
                        </Text>
                        <CheckboxGroup colorScheme='green' defaultValue={['mix']}>
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                <Checkbox value='naruto'>Male</Checkbox>
                                <Checkbox value='sasuke'>Female</Checkbox>
                                <Checkbox value='kakashi'>Mix</Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    </Box>
                    <Divider />
                    <Box my={5}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Localization
                        </Text>
                    </Box>
                    <Divider />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Show results
                    </Button>
                    <Button variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalComponent;