import request, { gql, GraphQLClient } from "graphql-request";

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
        address {
          street
          city
          postCode
          country
        }
    }
  }
`;

export const getEventsList = async (): Promise<any> => {
  const res = await request<any>("http://localhost:8000/graphql", getAllEventsQuery);
  console.log(res)
  const result = res.getAllEvents;
  return result
}