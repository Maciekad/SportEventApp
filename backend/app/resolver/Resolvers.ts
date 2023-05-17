import events from "../data/dataset"; //get all of the available data from our database.

const Resolvers = {
  Query: {
    getAllEvents: () => events, //if the user runs the getAllPeople command
    //if the user runs the getPerson command:
    getEvent: (_: any, args: any) => { 
      console.log(args);
      //get the object that contains the specified ID.
      return events.find((event) => event.id === args.id);
    },
  },
};
export default Resolvers;