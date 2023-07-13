import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from 'react';
import { Coordinates } from '../../model/Coordinates';
import { googleMapsApiKey, sulkowiceCoordinates } from "../../model/Constants";

interface GoogleMapProps {
    onMapClicked: (coordinates: Coordinates) => void,
    markerPosition?: Coordinates
}
const AddressMap = (props: GoogleMapProps) => {

    const [markerPosition, setMarkerPosition] = useState<Coordinates | undefined>(props.markerPosition);

    const [center, setCenter] = useState<Coordinates>(sulkowiceCoordinates);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    const defaultMapOptions = {
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
    };

    useEffect(() => {

        props.markerPosition && setCenter(props.markerPosition)
        props.markerPosition && setMarkerPosition(props.markerPosition)

    }, [props.markerPosition]);

    const onMapClicked = (ev: google.maps.MapMouseEvent) => {

        const lat = ev.latLng?.lat() ?? 0;
        const lng = ev.latLng?.lng() ?? 0;

        let coordinates: Coordinates = { lat: lat, lng: lng };

        setMarkerPosition(coordinates);
        props.onMapClicked(coordinates);
    };

    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <GoogleMap
            zoom={10}
            center={center}
            options={defaultMapOptions}
            mapContainerStyle={{ width: '100%', height: '45vh' }}
            onClick={onMapClicked}
        >
            {markerPosition && <MarkerF position={markerPosition} />}
        </GoogleMap>)
};
export default AddressMap;