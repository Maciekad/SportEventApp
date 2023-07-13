import { useState } from "react";
import { AddressModel } from "../../model/AddressModel";
import { sulkowiceCoordinates, buttonClass } from '../../model/Constants';
import { Coordinates } from "../../model/Constants";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../../utils/mapUtils";
import AddressMap from "../Maps/AddressMap";
import { FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputRightElement, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
    street: string;
    city: string;
    postCode: string;
    country: string;
};

const AddressForm = () => {
    const [selectedAddress, selectAddress] = useState<AddressModel>();
    const [coordinates, setCoordinates] = useState<Coordinates>();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const onMapClicked = async (coordinates: Coordinates) => {
        const promise = await getAddressFromCoordinates(coordinates);
        const result = await Promise.resolve(promise) as AddressModel;

        selectAddress(result)
        setCoordinates(coordinates);
    }

    const onSubmit = async (address: AddressModel) => {
        selectAddress(address);
        const promise = await getCoordinatesFromAddress(address);
        const coordinates = await Promise.resolve(promise) as Coordinates;
        console.log(coordinates)
        setCoordinates(coordinates)
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.street !== undefined} pb={4}>
                    <FormLabel htmlFor='street'>Street</FormLabel>
                    <Input
                        id='street'
                        defaultValue={selectedAddress?.street}
                        placeholder='Street'
                        {...register('street', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.street && errors.street.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.city !== undefined} pb={2}>
                    <FormLabel htmlFor='city'>City</FormLabel>
                    <InputGroup>
                        <Input
                            id='city'
                            defaultValue={selectedAddress?.city}
                            placeholder='Enter city'
                            {...register('city', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.city && errors.city.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.postCode !== undefined} pb={2}>
                    <FormLabel htmlFor='postCode'>Post Code</FormLabel>
                    <InputGroup>
                        <Input
                            id='postCode'
                            defaultValue={selectedAddress?.postCode}
                            placeholder='Enter postCode'
                            {...register('postCode', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.postCode && errors.postCode.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.country !== undefined} pb={2}>
                    <FormLabel htmlFor='country'>Country</FormLabel>
                    <InputGroup>
                        <Input
                            id='country'
                            defaultValue={selectedAddress?.country}
                            placeholder='Enter country'
                            {...register('country', {
                                required: 'This is required',
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}
                        />
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.country && errors.country.message}
                    </FormErrorMessage>
                </FormControl>

                
                <button className={buttonClass} type="submit">Submit</button>
            </form>
        </Box>
    )
}

export default AddressForm