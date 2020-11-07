import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

require('dotenv').config();


const environment = process.env.NODE_ENV;
const port = process.env.PORT;




const schema = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello everyone!"
    }
};


const initializeServer = () => {

    // Initialize Apollo Server Instance
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        introspection: true,
        playground: true,
        cors: true,
        context: ({ req }) => ({ req })
    });

    // Initialize Express 
    const app = express();


    // Apply Middleware 

    server.applyMiddleware({ app, path: "/", cors: true });


    if (environment === 'development') {
        app.listen(port).then(({ url }) => {
            console.log(`:rocket: Apollo server started at ${url}/graphql`);
        });
    } else console.log('Something went wrong initializing server!');


    return app;
};

export default initializeServer;