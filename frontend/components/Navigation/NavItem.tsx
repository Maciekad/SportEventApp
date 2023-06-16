import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import NextLink from 'next/link';

interface NavItemProps {
    href: string,
    icon: IconType,
    title: String,
    description: String,
    active: Boolean,
    navSize: String
}

export default function NavItem(props: NavItemProps) {

    const { href, icon, title, description, active, navSize } = props;
    return (
        <Flex
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu>
                <Link
                    href={href}
                    as={NextLink}
                    backgroundColor={active && "#EDF2F7"}
                    borderLeft={active && '4px'}
                    borderLeftColor={active && '#48BB78'}
                    p={5}
                    _hover={{ textDecor: 'none', backgroundColor: "#EDF2F7", borderLeft: '4px', borderLeftColor: '#48BB78' }}
                    w={"100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl"/>
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}