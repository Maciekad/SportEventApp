import eventsResolver from "./events";
import bookingsResolver from "./bookings";

const rootResolver = {
  Query: {
    ...eventsResolver.Query,
    ...bookingsResolver.Query
  }
};


console.log(rootResolver)
export default rootResolver;