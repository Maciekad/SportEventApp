import events from "../data/dataset";

const Resolvers = {
  Query: {
    getAllEvents: () => events, 
    getEvent: (_: any, args: any) => { 
      console.log(args);
      return events.find((event) => event.id === args.id);
    },
  },
};
export default Resolvers;