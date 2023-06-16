import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import NextLink from 'next/link';
import { IAuth, useAuth } from '../../lib/auth';
import { SearchBar } from '../SearchBar';

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
            <Box bg="white" zIndex={3} pos="fixed" width={'100%'} top="0" left='0' paddingBottom={'100px'} borderBottom={"1px"} borderColor={"gray.200"} px={12} py={1}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} py={2}>
                    <Box pl={220}>
                        <SearchBar />
                    </Box>
                    <Box>
                        <Menu>
                            <Button p={4} variant='outline' size={"xl"}><Text mr={2} fontSize={'md'}>Create your event</Text><FaPlus /></Button>
                            <MenuButton
                                _hover={{ textDecoration: "none" }}
                                pl={4}
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
                    </Box>
                </Flex>
            </Box >
        </>
    );
}