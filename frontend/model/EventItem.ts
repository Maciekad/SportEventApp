import { Level } from "./Level";

interface EventItem {
    id: number,
    title: string,
    description: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: Level;
    tags: string[]
}

export default EventItem;
