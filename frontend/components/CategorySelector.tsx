import { Box, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall } from "react-icons/fa";

interface CategorySelectorProps {
}

const CategorySelector = (props: CategorySelectorProps) => {

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

    return (
        <Flex py={5} justifyContent="space-between">
            {categories
                .map((c) =>
                    <Link href={{ query: { search: c.name } }}>
                        <HStack>
                            <Box>{c.icon}</Box>
                            <Box>{c.name}</Box>
                        </HStack>
                    </Link>
                )}
        </Flex>
    );
}

export default CategorySelector;