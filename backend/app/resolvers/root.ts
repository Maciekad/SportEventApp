import eventsResolver from "./events";
import bookingsResolver from "./bookings";
import usersResolver from "./users";
import authResolver from "./auth";

const rootResolver = {
  Query: {
    ...eventsResolver.Query,
    ...bookingsResolver.Query,
    ...usersResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation
  }
};


console.log(rootResolver)
export default rootResolver;