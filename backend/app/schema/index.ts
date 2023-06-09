import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    getAllEvents: [Event]
    getEvent(id: Int): Event
    getUser(id: Int): User
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addEventAttendee(eventId: Int!, attendee: AttendeeInput): Event
  }

  type User {
    id: ID,
    firstName: String,
    lastName: String,
    password: String,
    email: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Event {
    id: ID!,
    title: String,
    description: String,
    category: String,
    gender: String,
    img: String,
    availablePlaces: String,
    signedPeople: Int,
    level: Level,
    tags: [String],
    address: Address,
    coordinates: Coordinates
    attendees: [EventAttendee]
  }

  type EventAttendee {
    id: ID!,
    email: String
  }

  type Address {
    street: String,
    city: String,
    postCode: String,
    country: String
  }

  type Coordinates {
    lat: Float,
    lng: Float
  }

  type Level {
    num: Int,
    description: String
  }

  input AttendeeInput {
    id: Int!, 
    email: String!
  }
  
`;
export default schema; 