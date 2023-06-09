import { addEventAttendee, getAllEvents, getEventById } from "../services/eventService";

const eventsResolver = {
  Query: {
    getAllEvents: async () => await getAllEvents(),
    getEvent: async (_: any, args: any) => {
      return await getEventById(args.id);
    },
  },
  Mutation: {
    addEventAttendee: async (parent: any, args: any) => {
      console.log(args);
      return await addEventAttendee(args.eventId, args.attendee);
    }
  }
};
export default eventsResolver;