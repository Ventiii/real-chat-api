import * as functions from 'firebase-functions';
import initializeServer from './server';



const server = initializeServer();

const realChatAPI = functions.region('us-central1').https.onRequest(server);


export { realChatAPI };
