import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';
require('dotenv').config();


const environment = process.env.NODE_ENV;
const port = process.env.PORT;


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

    // Connect mongoose database connection 

    const initializeMongoose = async (options) => {
        options = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false };
       
        let database_key;

        try {

            if (environment === 'development') database_key = process.env.MONGOOSE_DEVELOPMENT_API_KEY;
            else if (environment === 'production') database_key = process.env.MONGOOSE_PRODUCTION_API_KEY;
            else {
                database_key = process.env.MONGOOSE_DEVELOPMENT_API_KEY;
            }

            await mongoose.connect(database_key, options);

        } catch (error){
            console.log(`There was an error connecting to mongoose!`, error);
        }
    };

    initializeMongoose().then(() => console.log(`Mongoose successfully connected!`));


    if (environment === 'development') {
       
    
        app.listen(port, () => {
            console.log(`Server successfully started at http://localhost:${port}/graphql`);
        });

    } else console.log('Something went wrong initializing server!');


    return app;
};


// Connect Mongoose Database





export default initializeServer;