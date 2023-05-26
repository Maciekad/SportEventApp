import { gql, GraphQLClient } from 'graphql-request';
import AuthPayload from '../model/AuthPayload';
import Login from '../model/Login';
import { User } from '../model/User';

const endpoint = `http://localhost:8000/graphql`

const loginMutation = gql`mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        firstName
        lastName
        password
      }
    }
  }`;


const registerMutation = gql`mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        email
        firstName
        lastName
        password
      }
    }
  }`

export const graphQLClient = new GraphQLClient(endpoint)

export const signIn = async (login: Login): Promise<any> => {
    try {
        const result = await graphQLClient.request<any>(loginMutation, { email: login.email, password: login.password })

        console.log(result.user)
        return result;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const register = async (user: User): Promise<AuthPayload> => {
    try {
        const result = await graphQLClient.request<AuthPayload>(registerMutation, { email: user.email, firstName: user.firstName, lastName: user.lastName, password: user.password })
        return result;
    } catch (error) {
        console.error(error)
        throw error
    }
}