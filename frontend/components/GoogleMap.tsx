import { GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from 'react';
import { Coordinates } from '../model/Coordinates';
import { googleMapsApiKey, levels } from '../model/Constants';
import GoogleMapReact from 'google-map-react';
import CustomMarker from "./CustomMarker";
import { Box, Card, Container, Flex, Grid } from "@chakra-ui/react";
import EventCard from "./EventCard";
import eventsList from "../lib/dataset";
import EventItem from "../model/EventItem";
import { getAddressFromCoordinates } from "../utils/mapUtils";
import { AddressModel } from "../model/AddressModel";

interface GoogleMapProps {
    markers: Coordinates[],
    onMapLoaded: () => void,
    onMarkerClicked: (coordinates: Coordinates) => void,
    center: Coordinates
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

   

    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            onLoad={props.onMapLoaded}>
            {markerPositions?.map((mark, index) => <OverlayViewF key={index} position={mark} mapPaneName={"floatPane"}><CustomMarker position={mark} onClick={props.onMarkerClicked} /></OverlayViewF>)}
        </GoogleMap>)
};

export default Map;