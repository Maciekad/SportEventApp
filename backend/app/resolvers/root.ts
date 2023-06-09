import eventsResolver from "./events";
import usersResolver from "./users";
import authResolver from "./auth";

const rootResolver = {
  Query: {
    ...eventsResolver.Query,
    ...usersResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventsResolver.Mutation
  }
};


console.log(rootResolver)
export default rootResolver;