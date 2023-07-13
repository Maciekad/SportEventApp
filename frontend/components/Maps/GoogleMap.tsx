import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from 'react';
import { Coordinates } from '../../model/Coordinates';
import { googleMapsApiKey, sulkowiceCoordinates } from '../../model/Constants';
import CustomMarker from "./CustomMarker";
import EventItem from "../../model/EventItem";

interface GoogleMapProps {
    eventItems: EventItem[],
    center: Coordinates
}

interface MapMarkerItem {
    position: Coordinates,
    events: EventItem[];
}

const MapComponent = (props: GoogleMapProps) => {

    const [center, setCenter] = useState<Coordinates>(sulkowiceCoordinates);

    const [markers, setMarkers] = useState<MapMarkerItem[]>();

    const [markerPosition, setMarkerPosition] = useState<Coordinates>(center);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey as string
    });

    const defaultMapOptions = {
        fullscreenControl: false,
        streetViewControl: false
    };

    useEffect(() => {

        let markerEvents = new Array<MapMarkerItem>();

        props.eventItems.forEach(ev => {

            const markerEvent = markerEvents.find((me) => me.position.lat === ev.coordinates.lat && me.position.lng === ev.coordinates.lng);

            if (!markerEvent) {
                const eventsArray = new Array<EventItem>();
                eventsArray.push(ev);
                markerEvents.push({ position: ev.coordinates, events: eventsArray });
            } else {
                markerEvent.events.push(ev);
            }

        });

        setMarkers(markerEvents)

    }, [props.eventItems]);

    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <GoogleMap
            zoom={10}
            center={center}
            options={defaultMapOptions}
            mapContainerStyle={{ width: '100%', height: '85vh' }}
        >
            {markers?.map((marker, index) => <OverlayViewF key={index} position={marker.position} mapPaneName={"floatPane"}><CustomMarker eventItems={marker.events} /></OverlayViewF>)}
        </GoogleMap>)
};
export default MapComponent;