import Address from "../model/Address";
import parseAddress, { AddressModel } from "../model/AddressModel";
import { Coordinates } from "../model/Coordinates";

export const getCoordinatesFromAddress = async (address: Address): Promise<Coordinates | null> => {

    const geocoder = new window.google.maps.Geocoder();

    const addressString = `${address.street}, ${address.postCode} ${address.city}, ${address.country}`;

    try {
        const response = await geocoder.geocode({ address: addressString });

        if (response.results.length > 0) {

            const lat = response.results[0].geometry.location?.lat() ?? 0;
            const lng = response.results[0].geometry.location?.lng() ?? 0;

            let coordinates: Coordinates = { lat: lat, lng: lng };

            return coordinates;
        }
        else {
            console.info(`No geocoder results found for address: ${address}.`);
            return null;
        }

    } catch (error) {
        console.error(`Geocoder failed due to: ${error}`)
        throw error;
    }

}

export const getAddressFromCoordinates = async (coordinates: Coordinates): Promise<AddressModel | null> => {

    const geocoder = new window.google.maps.Geocoder();

    try {
        const response = await geocoder.geocode({ location: coordinates });
        if (response.results.length > 0) {
            const addressObj = parseAddress(response.results[0].formatted_address);
            return addressObj;
        }
        else {
            console.info(`No geocoder results found for lat: ${coordinates.lat}, lng: ${coordinates.lng}.`);
            return null;
        }
    } catch (error) {
        console.error(`Geocoder failed due to: ${error}`)
        throw error;
    }


}