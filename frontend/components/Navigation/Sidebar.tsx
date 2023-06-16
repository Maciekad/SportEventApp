import React, { useState } from 'react'
import {
    Flex,
    Box,
    Link
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import NextLink from 'next/link';

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            bgColor={'white'}
            zIndex={4}
            position={'fixed'}
            left="0"
            top="0"
            borderRight={"1px"}
            h={'100%'}
            borderColor={"gray.200"}
            w={navSize == "small" ? "75px" : "230px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                flexDir="column"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <Box pl={10} pt={5} pb={10}>
                    <Link fontWeight={"semibold"} fontSize={'xl'} style={{ textDecoration: 'none' }} as={NextLink} href="/">SportEventHub
                    </Link>
                </Box>
                <NavItem href='/dashboard' navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." active={false} />
                <NavItem href='/dashboard' navSize={navSize} icon={FiCalendar} title="Calendar" active={false} description={''} />
                <NavItem href='/dashboard' navSize={navSize} icon={FiUser} title="Clients" description={''} active={false} />
                <NavItem href='/dashboard' navSize={navSize} icon={IoPawOutline} title="Animals" description={''} active={false} />
                <NavItem href='/dashboard' navSize={navSize} icon={FiDollarSign} title="Stocks" description={''} active={false} />
                <NavItem href='/dashboard' navSize={navSize} icon={FiBriefcase} title="Reports" description={''} active={false} />
                <NavItem href='/dashboard' navSize={navSize} icon={FiSettings} title="Settings" description={''} active={false} />
            </Flex>
        </Flex>
    )
}