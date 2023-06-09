import { GoogleMap, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useState } from 'react';
import { Coordinates } from '../model/Coordinates';
import { googleMapsApiKey, sulkowiceCoordinates } from '../model/Constants';
import CustomMarker from "./CustomMarker";
import EventItem from "../model/EventItem";

interface GoogleMapProps {
    eventItems: EventItem[]
}

const Map = (props: GoogleMapProps) => {

    const [center, setCenter] = useState<Coordinates>(sulkowiceCoordinates);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{ width: '100%', height: '100vh' }}>
            {props.eventItems?.map((event, index) => <OverlayViewF key={index} position={event.coordinates} mapPaneName={"floatPane"}><CustomMarker eventItem={event}/></OverlayViewF>)}
        </GoogleMap>)
};

export default Map;