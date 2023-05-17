import { gql } from "apollo-server-express";
const Schema = gql`
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
  type Query {
    getAllEvents: [Event] 
    getEvent(id: Int): Event
  }
`;
export default Schema; 