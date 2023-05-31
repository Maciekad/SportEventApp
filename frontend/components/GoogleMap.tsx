import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from 'react';
import { Coordinates } from '../model/Coordinates';
import { googleMapsApiKey } from '../model/Constants';

interface GoogleMapProps {
    markers: Coordinates[],
    onMapLoaded: (coordinates: Coordinates) => void,
    onMapClicked?: (coordinates: Coordinates) => void,
    center: Coordinates,
    height: string,
    zoom: number
}

const Map = (props: GoogleMapProps) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    const center = useMemo<Coordinates>(() => (props.center), [props.center]);

    const [markerPositions, setMarkerPositions] = useState<Coordinates[]>(props.markers);

    useEffect((() => {
        props.markers && setMarkerPositions(props.markers);

    }), [props.markers]);

    const onMapLoaded = () => {
        props.onMapLoaded(center);
    };

    // const onMapClicked = (ev: google.maps.MapMouseEvent) => {
        
    //     const lat = ev.latLng?.lat() ?? 0;
    //     const lng = ev.latLng?.lng() ?? 0;

    //     let coordinates: Coordinates = { lat: lat, lng: lng};

    //     setMarkerPosition(coordinates);
    //     props.onMapClicked(coordinates);
    // };

    if (!isLoaded)
        return <div>Loading...</div>

    return <GoogleMap
            zoom={props.zoom}
            center={center}
            mapContainerStyle={{width: '100%', height: props.height}}
            onLoad={onMapLoaded}>
                {markerPositions?.map((mark, index) => <MarkerF key={index} position={mark} />)}
        </GoogleMap>
};

export default Map;