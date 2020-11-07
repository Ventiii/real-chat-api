import { UserInputError } from 'apollo-server-express';
import getAuthenticationToken from '../../../lib/get-authentication-token';
import {
    fetchAccountByUsername,
} from '../../../models';
import { validateLoginData } from '../../../lib/validations';
import bcrypt from 'bcryptjs';


const resolvers = {
    Mutation: {
        loginAccount: async (_, { username, password }) => {

            
            // Validate login Data and check for errors

            const { valid, errors } = validateLoginData(username, password);

            if (!valid) throw new UserInputError("Validation Errors", { errors });

            const currentAccount = await fetchAccountByUsername(username);

            if (!currentAccount) throw new UserInputError("Doesn't exist!", { errors: { general: `An account with username ${username} could not be found!` } });

            const matched = await bcrypt.compare(password, currentAccount.password);

            if (!matched) throw new UserInputError("Wrong Credentials", { errors: { general: "Wrong credentials!" } });

            const authToken = await getAuthenticationToken(currentAccount);

            return {
                account: currentAccount,
                authToken,
            };
        }
    },
};

export default resolvers;