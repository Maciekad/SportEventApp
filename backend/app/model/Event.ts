import Address from './address';
import Level from './level';

interface Event {
    id: number,
    title: string,
    description: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: Level;
    tags: string[];
    address: Address | null;
}

export default Event;
