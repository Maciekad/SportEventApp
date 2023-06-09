import Address from './address';
import Coordinates from './coordinates';
import Level from './Level';
import EventAttendee from './eventAttendee';

interface Event {
    id: number,
    title: string,
    description: string,
    category: string,
    gender: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: Level;
    address: Address | null;
    coordinates: Coordinates;
    attendees: EventAttendee[];
}

export default Event;
