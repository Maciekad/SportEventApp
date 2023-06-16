import React, { ReactElement, ReactNode, useState } from "react";
import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import router from "next/router";

export const SearchBar = () => {

    const [searchedValue, setSearchedValue] = useState('');

    const onSearchClick = () => {
        if (searchedValue) {
            router.push({
                query: {
                    search: searchedValue,
                }
            });
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <FormControl>
            <InputGroup boxShadow={'base'} borderRadius={'md'} size="md">
                <InputLeftElement
                    pointerEvents="none"
                    children={<FaSearch color="gray.600" />}
                />
                <Input onChange={(e) => setSearchedValue(e.currentTarget.value)} type="text" placeholder="Search..." />
                <InputRightAddon
                    p={0}
                    border="none"
                >
                    <Button onClick={() => onSearchClick()} borderLeftRadius={0} borderRightRadius={'md'}>
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </FormControl>
    );
};