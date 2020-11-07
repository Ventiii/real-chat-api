import * as functions from 'firebase-functions';
import initializeServer from './server';



const server = initializeServer();



// REAL CHAT API URL
// https://us-central1-flickup-api.cloudfunctions.net/realChatAPI

// IMPORTANT NOTE
//  Once you go to this url make sure you edit the url in the graphql editor to be the same as above
//  as it will end on https://us-central1-flickup-api.cloudfunction.net/
//  -> so just add realChatAPI OR realChatAPI/graphql

const realChatAPI = functions.region('us-central1').https.onRequest(server);


export { realChatAPI };
