import events from "../data/dataset";

const bookingsResolver = {
  Query: {
    getAllBookings: () => events, 
  },
};
export default bookingsResolver;