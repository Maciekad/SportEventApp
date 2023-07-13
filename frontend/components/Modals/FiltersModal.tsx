import { Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, Text, Stack, Checkbox, ModalFooter, Button, Box, Flex, HStack, Select, } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiCycling, BiTennisBall } from "react-icons/bi";
import { FaBasketballBall, FaFutbol, FaRocket, FaTableTennis, FaUmbrellaBeach, FaVolleyballBall } from "react-icons/fa";
import { Category } from "../Filters";
import { addQueryParamToRouter, removeQueryParamsFromRouter } from "../../utils/routerUtils";

interface ModalComponentProps {
    onClose: () => void,
    isOpen: boolean,
    categoryFilters: Set<String>,
    setCategoryFilters: React.Dispatch<React.SetStateAction<Set<String>>>
}

const FiltersModal = (props: ModalComponentProps) => {
    const { isOpen, onClose, categoryFilters, setCategoryFilters } = props;
    const router = useRouter();

    const levels = ['Recreational', 'Beginner', 'Semi-advanced', 'Advanced'];
    const genders = ['Male', 'Female', 'Mix'];

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

    const onSubmit = () => {

        removeQueryParamsFromRouter(router, ['search']);

        const disicplineFilters = sportDisciplines.map(sd => sd.name).filter(name => categoryFilters.has(name));
        const levelFilters = levels.filter(level => categoryFilters.has(level));
        const genderFilters = genders.filter(gender => categoryFilters.has(gender));

        addQueryParamToRouter(router, Category.DISCIPLINE, disicplineFilters);
        addQueryParamToRouter(router, Category.LEVEL, levelFilters);
        addQueryParamToRouter(router, Category.GENDER, genderFilters);

        onClose();
    };

    const updateFilters = (checked: Boolean, categoryFilter: String) => {
        if (checked) {
            setCategoryFilters((prev) => new Set(prev).add(categoryFilter));
        }
        if (!checked) {

            setCategoryFilters((prev) => {
                const next = new Set(prev);
                next.delete(categoryFilter);
                return next;
            });
        }
    };

    const updateDisciplineCheckboxes = (isSelected: boolean, discipline: String) => {
        // if discipline wasn't selected, set opposite value
        const checked = !isSelected;

        const updatededDisciplines = sportDisciplines.map(sd => {
            if (sd.name === discipline) {
                return { ...sd, isSelected: checked }
            }

            return sd;
        });

        updateFilters(checked, discipline);
        setSportDisciplines(updatededDisciplines);
    };

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
                        <Flex wrap={'wrap'} columnGap={2} rowGap={2}>
                            {sportDisciplines.map((discipline, index) =>
                                <HStack
                                    onClick={() => updateDisciplineCheckboxes(categoryFilters.has(discipline.name), discipline.name)}
                                    key={index}
                                    p={3}
                                    as="button"
                                    _hover={{ border: '1px' }}
                                    bg={categoryFilters.has(discipline.name) ? '#F7F7F7' : 'white'}
                                    border='1px'
                                    borderRadius={20}
                                    borderColor={categoryFilters.has(discipline.name) ? 'black' : 'gray.200'}>
                                    {discipline.icon}
                                    <Text fontSize={'sm'}>{discipline.name}</Text>
                                </HStack>)}
                        </Flex>
                    </Box>
                    <Divider />
                    <Box my={10}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Localization
                        </Text>
                        <Select placeholder='Select option'>
                            <option value='option1'>Warsaw</option>
                            <option value='option2'>Chynów</option>
                            <option value='option3'>Cracow</option>
                        </Select>
                        {/*  */}
                    </Box>
                    <Divider />
                    <Box my={10}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Level
                        </Text>
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            {levels.map((level, index) =>
                                <Checkbox isChecked={categoryFilters.has(level)} key={index} onChange={(e) => updateFilters(e.target.checked, level)} colorScheme='green'>
                                    {level}
                                </Checkbox>)}
                        </Stack>
                        {/*  */}
                    </Box>
                    <Divider />
                    <Box my={10}>
                        <Text fontSize={"xl"} fontWeight='semibold' my={4}>
                            Gender
                        </Text>
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            {genders.map((gender, index) =>
                                <Checkbox isChecked={categoryFilters.has(gender)} key={index} onChange={(e) => updateFilters(e.target.checked, gender)} colorScheme='green'>
                                    {gender}
                                </Checkbox>)}
                        </Stack>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onSubmit}>
                        Show results
                    </Button>
                    <Button onClick={onClose} variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FiltersModal;