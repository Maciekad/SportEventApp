import { AddressModel } from "./AddressModel";
import { Coordinates } from "./Coordinates";
import EventAttendee from "./EventAttendee";
import { Level } from "./Level";

interface EventItem {
    id: number,
    title: string,
    description: string,
    price: string,
    category: string,
    gender: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: Level;
    tags: string[];
    address: AddressModel;
    coordinates: Coordinates;
    attendees: EventAttendee[];
}

export default EventItem;
