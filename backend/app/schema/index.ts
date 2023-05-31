import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    getAllEvents: [Event]
    getAllBookings: [Event]
    getEvent(id: Int): Event
    getUserById(id: Int): User
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
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
    img: String,
    availablePlaces: String,
    signedPeople: Int,
    level: Level,
    tags: [String],
    address: Address
  }

  type Address {
    street: String,
    city: String,
    postCode: String,
    country: String
  }

  type Level {
    num: Int,
    description: String
  }
  
`;
export default schema; 