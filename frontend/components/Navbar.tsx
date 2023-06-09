import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text
} from '@chakra-ui/react';
import { FaHamburger, FaDoorClosed, FaPlus } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import NextLink from 'next/link';
import { IAuth, useAuth } from '../lib/auth';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentUser, logout, isLoggedIn } = useAuth() as IAuth;

    return (
        <>
            <Box bgColor={"green.500"} color={"white"} borderBottom={"1px"} borderColor={"gray.200"} px={12} py={1}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} px={12}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <FaDoorClosed /> : <FaHamburger />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><Link fontWeight={"semibold"} fontSize={'xl'} style={{ textDecoration: 'none' }} as={NextLink} href="/">SportEventHub</Link></Box>
                        <Box><Link style={{ textDecoration: 'none' }} as={NextLink} href="/dashboard">Events</Link></Box>
                        <Box><Link style={{ textDecoration: 'none' }} as={NextLink} href="/dashboard">Help</Link></Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <Button p={3} _hover={{ border: '1px', bgColor: "green.400" }} size={"xl"} variant={"outline"}><Text fontSize={'md'}>Create your event</Text></Button>
                            <MenuButton
                                pl={3}
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    name={currentUser && `${currentUser?.firstName} ${currentUser?.lastName}`}
                                />
                            </MenuButton>
                            <MenuList zIndex={3}>
                                {!isLoggedIn && <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }} as={NextLink} href="/register">Register</Link></MenuItem>}
                                {!isLoggedIn &&
                                    <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }} as={NextLink} href="/login">Log in</Link></MenuItem>}

                                {isLoggedIn && <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }}>Profile</Link></MenuItem>}
                                <MenuDivider />
                                <MenuItem color={'black'}>Help</MenuItem>
                                {isLoggedIn && <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }} onClick={logout}>Log out</Link></MenuItem>}

                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box >
        </>
    );
}