import { gql } from 'apollo-server-express';



const schema = gql`
type Query {
    accounts: [Account]
}

type Mutation {
    createAccount(username: String! email: String! password: String! confirmPassword: String!): SessionIdentityPayload!
    loginAccount(username: String! password: String!): SessionIdentityPayload!
}

scalar Time
scalar Date


type Account {
    id: Int!
    _id: String!
    username: String!
    email: String!
    imageUrl: String!
    created_at: Date
    updated_at: Time
}


type SessionIdentityPayload {
    account: Account!
    authToken: String!
}

type ValidationError {
    message: String
    errors: [ErrorMessage]
}

type ErrorMessage {
    message: String
}

`;

export default schema;