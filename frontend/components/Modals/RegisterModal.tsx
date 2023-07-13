import { Modal, Image, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody, Grid, CheckboxGroup, Text, Stack, Checkbox, ModalFooter, Button, Box, Slider, SliderMark, SliderFilledTrack, SliderThumb, SliderTrack, Heading } from "@chakra-ui/react";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

interface ModalComponentProps {
    onClose: () => void,
    isOpen: boolean
}

const RegisterModal = (props: ModalComponentProps) => {
    const { isOpen, onClose } = props;

    const labelStyles = {
        mt: '3',
        fontSize: 'sm',
    }
    return (
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader justifyContent={'center'}>Register</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>                 
                    <RegisterForm onClose={onClose}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default RegisterModal;