import jwt from 'jsonwebtoken';
require('dotenv').config();

const AUTH_TOKEN = process.env.AUTH_TOKEN;


const getAuthenticationToken = (account) => {
    return jwt.sign(
        {
            _id: account._id,
            id: account.id,
            username: account.username,
            imageUrl: account.imageUrl,
            email: account.email,
            password: account.password,
            created_at: account.created_at,
            updated_at: account.updated_at,
        },
        AUTH_TOKEN,
        {
            expiresIn: '24H'
        }
    );
};

export default getAuthenticationToken;