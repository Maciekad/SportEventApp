import { ApolloServer, AuthenticationError } from "apollo-server-express";
import schema from "./schema";
import rootResolver from "./resolvers/root";
import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const { PORT, JWT_SECRET } = process.env

const app = express();

let server: any = null;

const startServer = async () => {
  server = new ApolloServer({
    typeDefs: schema,
    resolvers: rootResolver,
    context: async ({ req }) => {
      const token = req.get('Authorization')?.split(' ')[1] as string;

      if (!token) {
        return null;
      }

      try {
        // Verify and decode the JWT token
        const user = jwt.verify(token, JWT_SECRET as string);
        return { user };
      } catch (error) {
        throw new AuthenticationError('Invalid or expired token');
      }
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