import Address from './address';
import Coordinates from './coordinates';
import EventAttendee from './eventAttendee';

interface Event {
    id: number,
    title: string,
    description: string,
    discipline: string,
    gender: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: string;
    address: Address | null;
    coordinates: Coordinates;
    attendees: EventAttendee[];
}

export default Event;
