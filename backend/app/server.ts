import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import rootResolver from "./resolvers/root";
import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const { PORT, JWT_SECRET } = process.env

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET as string)
    }
    return null;
  } catch (error) {
    return null
  }
}

const app = express();

let server: any = null;

const startServer = async () => {
  server = new ApolloServer({
    typeDefs: schema,
    resolvers: rootResolver,
    context: ({ req }) => {
      const token = req.get('Authorization') || ''
      return { user: getUser(token.replace('Bearer', '')) }
    }
  });

  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// handling REST api calls
const httpserver = http.createServer(app);

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);