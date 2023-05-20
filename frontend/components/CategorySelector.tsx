import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall } from "react-icons/fa";

interface CategorySelectorProps {
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
        <Flex py={5} justifyContent="space-between">
            {categories
                .map((c) =>
                    <Box onClick={() => onCategoryChanged(c.name)}
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
    );
}

export default CategorySelector;