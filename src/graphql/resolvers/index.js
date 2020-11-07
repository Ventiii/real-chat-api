import users from './users';




const resolvers = {
    Query: {
        ...users.Query,
    },
    Mutation: {
        ...users.Mutation,
    }
};

export default resolvers;