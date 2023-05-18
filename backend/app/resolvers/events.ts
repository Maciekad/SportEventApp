import events from "../data/dataset";

const eventsResolver = {
  Query: {
    getAllEvents: () => events, 
    getEvent: (_: any, args: any) => { 
      console.log(args);
      return events.find((event) => event.id === args.id);
    },
  },
};
export default eventsResolver;