import request, { gql, GraphQLClient } from "graphql-request";
import EventItem from "../model/EventItem";
import EventAttendee from "../model/EventAttendee";

interface GetEventsListResponse {
  getAllEvents: EventItem[];
}

interface GetEventResponse {
  getEvent: EventItem;
}

interface AddEventAttendeeResponsee {
  addEventAttendee: EventItem;
}

const event = gql`
  id
  title
  description
  category
  gender
  img
  availablePlaces
  signedPeople
  level {
      num
      description
  }
  tags
  address {
      street
      city
      postCode
      country
  }
  coordinates {
    lat
    lng
  }
  attendees {
    id
    email
    firstName
    lastName
  }
  `

const getAllEventsQuery = gql`
  query {
    getAllEvents { 
        ${event}
    }
  }
`;


const getEventQuery = gql`
  query GetEvent($getEventId: Int) {
      getEvent(id: $getEventId) {
        ${event}
      }
    } 
  `;



const addEventAttendeeMutation = gql`mutation addEventAttendee($eventId: Int!, $attendee: AttendeeInput) {
  addEventAttendee(eventId: $eventId, attendee: $attendee) {
    ${event}
  }
}`;

export const graphQLClient = new GraphQLClient(`${process.env.GRAPHQL_URL}`)

export const getEventsList = async (): Promise<EventItem[]> => {
  const result = await graphQLClient.request<GetEventsListResponse>(getAllEventsQuery);
  return result.getAllEvents;
}

export const getEventById = async (id: string): Promise<EventItem> => {
  const result = await graphQLClient.request<GetEventResponse>(getEventQuery, { getEventId: Number(id) });
  return result.getEvent;
}

export const addEventAttendee = async (id: number, attendee: EventAttendee): Promise<EventItem> => {
  const result = await graphQLClient.request<AddEventAttendeeResponsee>(addEventAttendeeMutation, { eventId: id, attendee })
  return result.addEventAttendee;
}