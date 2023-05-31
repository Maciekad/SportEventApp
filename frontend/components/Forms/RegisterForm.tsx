import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Text
} from '@chakra-ui/react'
import { useState } from 'react';
import { IAuth, useAuth } from '../../lib/auth';
import { User } from '../../model/User';
import { registerUser } from "../../service/AuthService";

type FormData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

const RegisterForm = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [message, setMessage] = useState('')

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const onSubmit = async (value: User) => {
        console.log(value); 
        try {
            await registerUser(value)
            setMessage('Succesfull register, Thank you!')

        } catch (error) {
            console.error('Register error')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email !== undefined} pb={4}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                    id='email'
                    placeholder='Email'
                    {...register('email', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.firstName !== undefined} pb={4}>
                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                <Input
                    id='firstName'
                    placeholder='First Name'
                    {...register('firstName', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName !== undefined} pb={4}>
                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                <Input
                    id='lastName'
                    placeholder='Last Name'
                    {...register('lastName', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined} pb={2}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                    <Input
                        id='password'
                        placeholder='Enter password'
                        {...register('password', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                        type={show ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
            <Text>{message}</Text>
        </form>
    )
}

export default RegisterForm;