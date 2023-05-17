import request, { gql } from "graphql-request";

const getAllEventsQuery = gql`
  query {
    getAllEvents { 
        id
        title
        description
        img
        availablePlaces
        signedPeople
        level {
            num
            description
        }
        tags
    }
  }
`;

export const getEventsList = async (): Promise<any> => {
    const res = await request<any>("http://localhost:4000/graphql", getAllEventsQuery);
    const result = res.getAllEvents;
    return result
}