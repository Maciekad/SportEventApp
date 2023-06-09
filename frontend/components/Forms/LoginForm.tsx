import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react';
import { IAuth, useAuth } from '../../lib/auth';
import Login from '../../model/Login';
import { useRouter } from 'next/router';

type FormData = {
    email: string;
    password: string;
};

const LoginForm = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const router = useRouter();

    const { login } = useAuth() as IAuth;

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const onSubmit = async (value: Login) => {
        try {
            await login(value);
            router.push('/');

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
        </form>
    )
}

export default LoginForm;