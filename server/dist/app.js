import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import http from "http";
import cors from "cors";
const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use("/graphql", cors(), express.json(), expressMiddleware(server));
    await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:3000/`);
};
export default startApolloServer;
