import path from "path";
import { readJsonFile, updateJsonFile, writeJsonFile } from "../utils/fileUtils";
import Event from "../model/event"
import EventAttendee from "../model/eventAttendee";

const filePath = '../data/events.json'

export const createEvent = async (event: Event): Promise<Event> => {
    try {
        await writeJsonFile(path.resolve(__dirname, filePath), event)
        return event;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        throw error;
    }
}

export const updateEvent = async (id: number, event: Event): Promise<Event> => {
    try {
        const jsonData = await readJsonFile(path.resolve(__dirname, filePath));
        let updatedEvent = getEventById(id);

        if (!updatedEvent) {
            throw new Error(`Event with ID: ${id} doesn't exist.`);
        }

        return event;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        throw error;
    }
}

export const getEventById = async (id: Number): Promise<Event> => {
    try {
        const jsonData = await readJsonFile(path.resolve(__dirname, filePath));
        const event = jsonData.find((event: Event) => event.id === id)
        return event;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const events = await readJsonFile(path.resolve(__dirname, filePath));
        return events;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

export const addEventAttendee = async (id: number, attendee: EventAttendee): Promise<Event> => {
    try {
        const changedEvent = await getEventById(id);

        if (!changedEvent) {
            throw new Error(`Event with ID: ${id} does not exist`);
        }

        const isSignedUp = changedEvent.attendees.find(at => at.id === attendee.id || at.email === attendee.email);

        if (isSignedUp) {
            throw new Error(`Attendee with ID: ${attendee.id} and email: ${attendee.email} has alrady signed up for event.`);
        }
 
        changedEvent.attendees.push(attendee);

        await updateJsonFile(path.resolve(__dirname, filePath), changedEvent);

        return changedEvent;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
