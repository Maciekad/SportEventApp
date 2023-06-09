import { Image, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiFillFilter } from "react-icons/ai";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall, FaMap } from "react-icons/fa";

interface CategorySelectorProps {
    onModalOpen: () => void;
}

const CategorySelector = (props: CategorySelectorProps) => {
    const router = useRouter();

    const categories = [{
        name: "Football",
        icon: <Image boxSize={'25px'} src='/img/icons/football.png' alt='footballIcon' />
    },
    {
        name: "Volleyball",
        icon: <Image boxSize={'25px'} src='/img/icons/volleyball.png' alt='volleyballIcon' />
    },
    {
        name: "Basketball",
        icon: <Image boxSize={'25px'} src='/img/icons/basketball.png' alt='basketballIcon' />
    },
    {
        name: "Tennis",
        icon: <Image boxSize={'25px'} src='/img/icons/tennis.png' alt='tennisIcon' />
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
        <Flex pl={10} py={2} justifyContent='space-between' alignItems='center'>
            <Flex py={5} justifyContent="space-between">
                {categories
                    .map((c, index) =>
                        <Button onClick={() => onCategoryChanged(c.name)}
                            key={index}
                            p={5}
                            backgroundColor='white'
                            variant={"outline"}
                            _hover={{backgroundColor: '#ffc864', borderColor: '#ffc864'}}
                            size={"lg"}
                            mr={3}>
                            <Flex alignItems='center'>{c.icon}
                                <Text fontSize={'sm'} pl={2}>{c.name}</Text></Flex>
                        </Button>
                    )}
            </Flex>
            <Flex>
                <Button p={5} size={"lg"} variant={"outline"} bgColor={"white"} onClick={props.onModalOpen}><Text fontSize={'sm'} pr={1}>Filters</Text> <AiFillFilter /></Button>
            </Flex>
        </Flex>
    );
}

export default CategorySelector;