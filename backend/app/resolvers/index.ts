import eventsResolver from "./events";
import bookingsResolver from "./bookings";
import usersResolver from "./users";

const rootResolver = {
  Query: {
    ...eventsResolver.Query,
    ...bookingsResolver.Query,
    ...usersResolver.Query
  }
};


console.log(rootResolver)
export default rootResolver;