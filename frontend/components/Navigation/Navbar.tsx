import { useState } from 'react';
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
    Text,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import NextLink from 'next/link';
import { IAuth, useAuth } from '../../lib/auth';
import { SearchBar } from '../SearchBar';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import EventCreateModal from '../Modals/EventCreateModal';

export default function Navbar() {
    //const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);
    const [isEventModal, setIsEventModal] = useState<boolean>(false);
    const { currentUser, logout, isLoggedIn } = useAuth() as IAuth;

    return (
        <>
            <Box bg="white" zIndex={3} pos="fixed" width={'100%'} top="0" left='0' paddingBottom={'100px'} borderBottom={"1px"} borderColor={"gray.200"} px={12} py={1}>
                <LoginModal isOpen={isLoginModal} onClose={() => setIsLoginModal(false)} />
                <RegisterModal isOpen={isRegisterModal} onClose={() => setIsRegisterModal(false)} />
                <EventCreateModal isOpen={isEventModal} onClose={() => setIsEventModal(false)} />
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'} py={2}>
                    <Box pl={220}>
                        <SearchBar />
                    </Box>
                    <Box>
                        <Menu>
                            <Button onClick={() => setIsEventModal(true)} p={4} variant='outline' size={"xl"}><Text mr={2} fontSize={'md'}>Create your event</Text><FaPlus /></Button>
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
                                {!isLoggedIn && <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }} as={NextLink} href="" onClick={() => setIsRegisterModal(true)}>Register</Link></MenuItem>}
                                {!isLoggedIn &&
                                    <MenuItem><Link color={'black'} style={{ textDecoration: 'none' }} as={NextLink} href="" onClick={() => setIsLoginModal(true)}>Log in</Link></MenuItem>}

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