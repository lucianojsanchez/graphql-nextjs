import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import { connectDB } from "./db.js";

const app = express();
const httpServer = http.createServer(app);

connectDB();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
