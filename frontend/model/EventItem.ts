import { AddressModel } from "./AddressModel";
import { Coordinates } from "./Coordinates";
import { Level } from "./Level";

interface EventItem {
    id: number,
    title: string,
    description: string,
    category: string,
    gender: string,
    img: string,
    availablePlaces: number,
    signedPeople: number,
    level: Level;
    tags: string[];
    address: AddressModel;
    coordinates: Coordinates;
}

export default EventItem;
