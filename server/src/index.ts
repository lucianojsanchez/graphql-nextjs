import { graphqlUploadExpress } from "graphql-upload-minimal";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import { connectDB } from "./db.js";

interface MyContext {
  token?: string;
  cloudinary?: string;
}

const app = express();
const httpServer = http.createServer(app);

connectDB();
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: false,
});

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),

  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
    }),
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
