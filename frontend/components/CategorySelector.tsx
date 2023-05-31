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
                        <Button onClick={() => onCategoryChanged(c.name)}
                            key={index}
                            p={5}
                            backgroundColor='white'
                            variant={"outline"}
                            size={"sm"}
                            mr={3}>
                            <Flex alignItems='center'>{c.icon}
                                <Text pl={2} fontWeight={'semibold'}>{c.name}</Text></Flex>
                        </Button>
                    )}
            </Flex>
            <Flex>
                <Button p={5} size={"sm"} variant={"outline"} bgColor={"white"} mr={2} onClick={props.onMapOpen}><Text pr={1}>{props.isMapOpen ? "Hide" : "Show"} Map</Text> <FaMap/></Button>

                <Button p={5} size={"sm"} variant={"outline"} bgColor={"white"} onClick={props.onModalOpen}><Text pr={1}>Filters</Text> <AiFillFilter /></Button>
            </Flex>
        </Flex>
    );
}

export default CategorySelector;