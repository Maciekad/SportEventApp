import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    getAllEvents: [Event]
    getAllBookings: [Event]
    getEvent(id: Int): Event
    
  }
  type Event {
    id: ID!,
    title: String,
    description: String,
    img: String,
    availablePlaces: String,
    signedPeople: Int,
    level: Level,
    tags: [String]
  }
  type Level {
    num: Int,
    description: String
  }
  
`;
export default schema; 