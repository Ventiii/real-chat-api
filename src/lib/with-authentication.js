import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
require('dotenv').config();

const AUTH_TOKEN = process.env.AUTH_TOKEN;


const withAuthentication = (context) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader){
        const token = authHeader.split('Bearer ')[1];
        if (token){
            try {

                let currentAccount = jwt.verify(token, AUTH_TOKEN);

                if (currentAccount) currentAccount.verified = true;
                else currentAccount.verified = false;

            
                return currentAccount;
            } catch (err){
                console.log(`Something went wrong during authentication!`, err);
                throw new AuthenticationError("Invalid / Expired Token!", err);
            }
        }
        throw new AuthenticationError("Authentication token must be 'Bearer [token]'");
    }
    throw new AuthenticationError("Authorization header must be provided!");
};

export default withAuthentication;