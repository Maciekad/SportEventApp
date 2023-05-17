import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from 'react';
import { Coordinates } from '../model/Coordinates';
import { googleMapsApiKey } from '../model/Constants';

interface GoogleMapProps {
    onMapLoaded: (coordinates: Coordinates) => void,
    onMapClicked: (coordinates: Coordinates) => void,
    center: Coordinates
}

const GoogleMapComponent = (props: GoogleMapProps) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey
    });

    const center = useMemo<Coordinates>(() => (props.center), [props.center]);

    const [markerPosition, setMarkerPosition] = useState<Coordinates>(center);

    useEffect((() => {
        setMarkerPosition(props.center);

    }), [props.center]);

    const onMapLoaded = () => {
        props.onMapLoaded(center);
    };

    const onMapClicked = (ev: google.maps.MapMouseEvent) => {
        
        const lat = ev.latLng?.lat() ?? 0;
        const lng = ev.latLng?.lng() ?? 0;

        let coordinates: Coordinates = { lat: lat, lng: lng};

        setMarkerPosition(coordinates);
        props.onMapClicked(coordinates);
    };

    if (!isLoaded)
        return <div>Loading...</div>

    return <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{width: '100%', height: '400px'}}
            onClick={onMapClicked}
            onLoad={onMapLoaded}>
                <MarkerF position={markerPosition}/>
        </GoogleMap>
};

export default GoogleMapComponent;