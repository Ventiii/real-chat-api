import { 
    createAccountWithOptions,
    fetchAccountByEmail,
    fetchAccountByUsername,
    fetchTime,
} from '../../../models';
import { UserInputError } from 'apollo-server-express';
import {
    validateRegistrationData,
} from '../../../lib/validations';
import bcrypt from 'bcryptjs';
import getAuthenticationToken from '../../../lib/get-authentication-token';



const resolvers = {
    Mutation: {
        createAccount: async (_, { username, email, password, confirmPassword }) => {

            
            const { valid, errors } = validateRegistrationData(username, email, password);

            if (!valid) throw new UserInputError("Validation Errors", { errors });

            const usernameExists = await fetchAccountByUsername(username);
            const emailExists = await fetchAccountByEmail(email);

            const time = fetchTime();

            if (usernameExists) throw new UserInputError("Username exists", { errors: { username: `An account already exists with the username ${username}.`} });
            if (emailExists) throw new UserInputError("Email Exists", { errors: { email: `This email address is already in use!` } });

            password = await bcrypt.hash(password, 12);


            const newAccountOptions = {
                created_at: time,
                updated_at: time,
                imageUrl: "",
                email,
                username,
                password,
            };

            const newAccount = await createAccountWithOptions(newAccountOptions);

            if (!newAccount) throw new UserInputError("Something went wrong!", { errors: { general: "Sorry something went wrong on our end!" } });

            const authToken = await getAuthenticationToken(newAccount);


            return {
                account: newAccount,
                authToken,
            };
        }
    },
};

export default resolvers;