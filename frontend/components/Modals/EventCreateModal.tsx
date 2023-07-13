import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, useSteps, Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Heading, Flex, HStack, Radio, RadioGroup, Stack, Button, ModalFooter, Input, FormControl, FormLabel, Textarea, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall, FaRocket, FaUmbrellaBeach, FaTableTennis } from "react-icons/fa";
import AddressForm from "../Forms/AddressForm";

interface ModalComponentProps {
    onClose: () => void,
    isOpen: boolean
}

const steps = [
    { title: 'First', description: 'Basic Details' },
    { title: 'Second', description: 'Event Details' },
    { title: 'Third', description: 'Date & Time' },
    { title: 'Fourth', description: 'Localization' },
    { title: 'Fifth', description: 'Summary' }
]

const levels = ['Recreational', 'Beginner', 'Semi-advanced', 'Advanced'];
const genders = ['Male', 'Female', 'Mix'];

const EventCreateModal = (props: ModalComponentProps) => {
    const { isOpen, onClose } = props;


    const initialDisciplines = [
        { name: 'Volleyball', icon: <FaVolleyballBall size={15} />, isSelected: false },
        { name: 'Football', icon: <FaFutbol size={15} />, isSelected: false },
        { name: 'Basketball', icon: <FaBasketballBall size={15} />, isSelected: false },
        { name: 'Tennis', icon: <BiTennisBall size={15} />, isSelected: false },
        { name: 'Cycling', icon: <BiCycling size={15} />, isSelected: false },
        { name: 'Badminton', icon: <FaRocket size={15} />, isSelected: false },
        { name: 'Beach volleyball', icon: <FaUmbrellaBeach size={15} />, isSelected: false },
        { name: 'Table tennis', icon: <FaTableTennis size={15} />, isSelected: false }
    ]

    const [sportDisciplines, setSportDisciplines] = useState(initialDisciplines);

    const [date, setDate] = useState(new Date());

    const [startTime, setStartTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);
    const [endTime, setEndTime] = useState(`${new Date().getHours() + 2}:${new Date().getMinutes()}`);


    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    return (
        <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader justifyContent={'center'}>Event Creator</ModalHeader>
                <Divider />
                <ModalCloseButton />

                <ModalBody>
                    <Stepper colorScheme="green" pb={10} pt={5} index={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={index} onClick={() => setActiveStep(index)}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    <Divider />
                    {activeStep === 1 && <Box>
                        <Box py={5}>
                            <Text fontSize={"xl"} fontWeight='semibold'>
                                Title
                            </Text>
                            <Text textColor={'gray.500'} pt={2} pb={4}>
                                Enter the title of your event
                            </Text>
                            <Input placeholder='Enter title' />
                        </Box>
                        <Divider />
                        <Box py={5}>
                            <Text fontSize={"xl"} fontWeight='semibold'>
                                Description
                            </Text>
                            <Text textColor={'gray.500'} pt={2} pb={4}>
                                Describe your event
                            </Text>
                            <Textarea placeholder="Description" size={'md'} />
                        </Box>
                        <Divider />
                        <FormControl py={5}>
                            <Text fontSize={"xl"} fontWeight='semibold'>
                                Price of the event
                            </Text>
                            <Text textColor={'gray.500'} pt={2} pb={4}>
                                Enter the price per hour
                            </Text>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input placeholder='Enter amount' />
                            </InputGroup>
                        </FormControl>
                        <Divider />
                    </Box>
                    }
                    {activeStep === 2 &&
                        <Box>

                            <Box py={10}>
                                <Text fontSize={"xl"} fontWeight='semibold'>
                                    Discipline
                                </Text>
                                <Text textColor={'gray.500'} pt={2} pb={4}>
                                    Select sport discipline that you like
                                </Text>
                                <Flex wrap={'wrap'} columnGap={2} rowGap={2}>
                                    {sportDisciplines.map((discipline, index) =>
                                        <HStack
                                            key={index}
                                            p={3}
                                            as="button"
                                            _hover={{ border: '1px' }}
                                            border='1px'
                                            borderRadius={20}>
                                            {discipline.icon}
                                            <Text fontSize={'sm'}>{discipline.name}</Text>
                                        </HStack>)}
                                </Flex>
                            </Box>
                            <Divider />
                            <Box py={10}>
                                <Text fontSize={"xl"} fontWeight='semibold'>
                                    Level
                                </Text>
                                <Text textColor={'gray.500'} pt={2} pb={4}>
                                    Select demanded level of players
                                </Text>
                                <RadioGroup defaultValue='2'>
                                    <Stack spacing={5} direction='row'>
                                        {levels.map((level, index) =>
                                            <Radio key={index} colorScheme='green' value={level}>
                                                {level}
                                            </Radio>
                                        )}
                                    </Stack>
                                </RadioGroup>
                            </Box>
                            <Divider />
                            <Box py={10}>
                                <Text fontSize={"xl"} fontWeight='semibold'>
                                    Gender
                                </Text>
                                <Text textColor={'gray.500'} pt={2} pb={4}>
                                    Select target gender for event
                                </Text>
                                <RadioGroup defaultValue='2'>
                                    <Stack spacing={5} direction='row'>
                                        {genders.map((gender, index) =>
                                            <Radio key={index} colorScheme='green' value={gender}>
                                                {gender}
                                            </Radio>
                                        )}
                                    </Stack>
                                </RadioGroup>
                            </Box>
                            <Divider />
                        </Box>}


                    {activeStep === 3 &&
                        <Box>
                            <Box py={10}>
                                <Text fontSize={"xl"} fontWeight='semibold'>
                                    Which day of the month will this event run on?
                                </Text>
                                <FormControl py={4}>
                                    <Text textColor={'gray.500'} py={2}>
                                        Select date and time of the event
                                    </Text>
                                    <SingleDatepicker
                                        name="fromDateInput"
                                        date={date}
                                        onDateChange={setDate}
                                    />
                                </FormControl>
                                <HStack>
                                    <FormControl>
                                        <Text pb={2} textColor={'gray.500'}>Start time</Text>
                                        <Input type="time" onChange={(e) => setStartTime(e.target.value)} value={startTime} />
                                    </FormControl>

                                    <FormControl>
                                        <Text pb={2} textColor={'gray.500'}>End time</Text>
                                        <Input type="time" onChange={(e) => setEndTime(e.target.value)} value={endTime} />
                                    </FormControl>
                                </HStack>
                            </Box>
                            <Divider />
                        </Box>
                    }

                    {activeStep === 4 &&
                        <Box>
                            <Box py={10}>
                                <Text fontSize={"xl"} fontWeight='semibold'>
                                    Where will your event take place?
                                </Text>
                                <Text textColor={'gray.500'} pt={2} pb={4}>
                                    Select place on map
                                </Text>
                                <Box>
                                    <AddressForm />
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    }

                    {activeStep === 5 &&
                        <Box>
                            Summary

                        </Box>
                    }
                    <ModalFooter>
                        <Button mr={3} onClick={() => setActiveStep(activeStep - 1)} variant='ghost'>Back</Button>
                        <Button colorScheme='green' onClick={() => setActiveStep(activeStep + 1)}>
                            Save & Continue
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default EventCreateModal;