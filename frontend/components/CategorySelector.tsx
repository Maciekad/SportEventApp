import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillFilter } from "react-icons/ai";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall, FaMap } from "react-icons/fa";

interface CategorySelectorProps {
    onModalOpen: () => void;
    onMapOpen: () => void;
    isMapOpen: boolean;
}

const CategorySelector = (props: CategorySelectorProps) => {
    const router = useRouter();

    const categories = [{
        name: "Football",
        icon: <FaFutbol size={20} />
    },
    {
        name: "Volleyball",
        icon: <FaVolleyballBall size={20} />
    },
    {
        name: "Basketball",
        icon: <FaBasketballBall size={20} />
    },
    {
        name: "Tennis",
        icon: <BiTennisBall size={20} />
    },
    {
        name: "Cycling",
        icon: <BiCycling size={20} />
    },
    ]

    const onCategoryChanged = (category: string) => {
        router.push({
            query: {
                search: category
            }
        })
    }

    return (
        <Flex px={"20"} justifyContent='space-between' alignItems='center'>
            <Flex py={5} justifyContent="space-between">
                {categories
                    .map((c, index) =>
                        <Box onClick={() => onCategoryChanged(c.name)}
                            key={index}
                            as="button"
                            _hover={{ border: '1px' }}
                            _focus={{
                                border: '1px',
                                bg: '#F7F7F7'
                            }}
                            fontSize='sm'
                            border='1px'
                            borderRadius={10}
                            borderColor='gray.200'
                            p={3}
                            mr={3}>
                            <Flex alignItems='center'>{c.icon}
                                <Text pl={2} fontWeight={'semibold'}>{c.name}</Text></Flex>
                        </Box>
                    )}
            </Flex>
            <Flex>
                <Button mr={2} onClick={props.onMapOpen}><Text pr={1}>{props.isMapOpen ? "Hide" : "Show"} Map</Text> <FaMap /></Button>

                <Button onClick={props.onModalOpen}><Text pr={1}>Filters</Text> <AiFillFilter /></Button>
            </Flex>
        </Flex>
    );
}

export default CategorySelector;