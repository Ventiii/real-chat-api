import createAccount from './create-account';
import loginAccount from './login-account';
import {
    fetchAllAccounts,
} from '../../../models';
import withAuthentication from '../../../lib/with-authentication';
import { AuthenticationError } from 'apollo-server-express';


const resolvers = {
    Query: {
        accounts: async (_, {}, context) => {
            const currentAccount = withAuthentication(context);

            if (!currentAccount) throw new AuthenticationError("Unauthorized!");
            const identityId = currentAccount._id;


            const users = await fetchAllAccounts();
            const filteredUsers = [];

            await Promise.all(users.map(async (user) => {
                const uid = `${user._id}`;

                console.log(`UID:`, uid, `identity id:`, identityId);
                if (uid === identityId) return;
                
                filteredUsers.push(user);
                })
            );

            console.log(`FILTERED:`, filteredUsers);
            console.log(`CURRENT ACCOUNT:`, currentAccount);
            
            
            return filteredUsers;
        }
    },
    Mutation: {
        ...createAccount.Mutation,
        ...loginAccount.Mutation
    }
};

export default resolvers;