import { useState } from "react";
import parseAddress, { AddressModel } from "../../model/AddressModel";
import { sulkowiceCoordinates, buttonClass } from '../../model/Constants';
import { Coordinates } from "../../model/Coordinates";
import Map from "../GoogleMap"
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../../utils/mapUtils";

const AddressForm = () => {
    const [selectedAddress, selectAddress] = useState<string | null>('');
    const [coordinates, setCoordinates] = useState<Coordinates | null>(sulkowiceCoordinates);

    const onMapLoaded = async (coordinates: Coordinates) => {
        const address = await getAddressFromCoordinates(coordinates);
        selectAddress(address);
    }

    const onMapClicked = async (coordinates: Coordinates) => {
        const address = await getAddressFromCoordinates(coordinates);
        selectAddress(address);
    }

    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const address = new AddressModel();
        address.street = event.target.street.value;
        address.city = event.target.city.value;
        address.postCode = event.target.postCode.value;
        address.country = event.target.country.value;

        const newString = `${address.street}, ${address.postCode} ${address.city}, ${address.country}`;

        selectAddress(newString);

        const coordinates = await getCoordinatesFromAddress(address);
        setCoordinates(coordinates);
    }

    return (
        <div className="grid grid-cols-2 gap-1">
            <div>
                <Map height="400px" zoom={10} onMapLoaded={onMapLoaded} onMapClicked={onMapClicked} markers={[coordinates] as Coordinates[]} center={coordinates as Coordinates}/>
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