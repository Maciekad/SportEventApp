import { AddressModel } from "./AddressModel";
import { Coordinates } from "./Coordinates";
import EventAttendee from "./EventAttendee";

interface EventItem {
    id: number,
    title: string,
    description: string,
    price: string,
    discipline: string,
    gender: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: string;
    tags: string[];
    address: AddressModel;
    coordinates: Coordinates;
    attendees: EventAttendee[];
}

export default EventItem;
