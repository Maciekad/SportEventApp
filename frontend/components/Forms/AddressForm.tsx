import { useState } from "react";
import parseAddress, { AddressModel } from "../../model/AddressModel";
import { sulkowiceCoordinates, buttonClass } from '../../model/Constants';
import { Coordinates } from "../../model/Coordinates";
import GoogleMapComponent from "../GoogleMap"

const AddressForm = () => {
    const [selectedAddress, selectAddress] = useState('');
    const [coordinates, setCoordinates] = useState(sulkowiceCoordinates);

    const onMapLoaded = (coordinates: Coordinates) => {
        getAddressFromCoordinates(coordinates);
    }

    const onMapClicked = (coordinates: Coordinates) => {
        getAddressFromCoordinates(coordinates);
    }

    const handleSubmit = (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const address = new AddressModel();
        address.address = event.target.street.value;
        address.city = event.target.city.value;
        address.postCode = event.target.postCode.value;
        address.country = event.target.country.value;

        const newString = `${address.address}, ${address.postCode} ${address.city}, ${address.country}`;

        selectAddress(newString);

        getCoordinatesFromAddress(newString);
    }

    const getAddressFromCoordinates = (coordinates: Coordinates) => {

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: coordinates })
            .then((response) => {
                if (response.results.length > 0) {
                    const addressObj = parseAddress(response.results[0].formatted_address);
                    
                    const newString = addressObj === null ? "Choose another adress" :
                        `${addressObj.address}, ${addressObj.postCode} ${addressObj.city}, ${addressObj.country}`;

                    selectAddress(newString);
                }
                else {
                    console.info(`No geocoder results found for lat: ${coordinates.lat}, lng: ${coordinates.lng}.`);
                }
            })
            .catch((error) => console.error(`Geocoder failed due to: ${error}`));
    }

    const getCoordinatesFromAddress = (address: string) => {

        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: address })
            .then((response) => {
                if (response.results.length > 0) {

                    const lat = response.results[0].geometry.location?.lat() ?? 0;
                    const lng = response.results[0].geometry.location?.lng() ?? 0;

                    let coordinates: Coordinates = { lat: lat, lng: lng};

                    setCoordinates(coordinates);
                }
                else {
                    console.info(`No geocoder results found for address: ${address}.`);
                }
            })
            .catch((error) => console.error(`Geocoder failed due to: ${error}`));
    }

    return (
        <div className="grid grid-cols-2 gap-1">
            <div>
                <GoogleMapComponent  onMapLoaded={onMapLoaded} onMapClicked={onMapClicked} center={coordinates}/>
                {selectedAddress}
            </div>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">Ulica</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="street"
                        name="street"
                        //value={selectedAddress.address}
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postCode">Kod pocztowy</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="postCode"
                        name="postCode"
                        //value={selectedAddress.postCode}
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Miasto</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="city"
                        name="city"
                        //value={selectedAddress.city}
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Kraj</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="country"
                        name="country"
                        //value={selectedAddress.country}
                        />
                </div>

                <button className={buttonClass} type="submit">Submit</button>
            </form>
        </div>
        )
}

export default AddressForm