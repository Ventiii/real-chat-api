import mongoose, { model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import userSchema from './user';
require('dotenv').config();


const key = process.env.MONGOOSE_DEVELOPMENT_API_KEY;

const connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
};

var connection = mongoose.createConnection(key, connectionOptions);


    mongoose.set('useCreateIndex', true);

autoIncrement.initialize(connection);


if (connection) console.log('Auto Increment plugin connected successfully!');
 else console.log(`Mongoose Auto Increment failed to connect!`);

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: "id" });

export const fetchTime = () => Math.round(new Date().getTime() / 1000);


// Models
const User = model('User', userSchema);
// const Message = model('Message', messageSchema);



// User Functions 
const createAccountWithOptions = async (accountOptions) => await new User(accountOptions).save();
const fetchAccountByAccountId = async (userId) => await User.findOne({ id: userId });
const fetchAccountByEmail = async (email) => await User.findOne({ email: email });
const fetchAccountByUsername = async (username) => await User.findOne({ username: username });
const fetchAccountById = async (id) => await User.findById(id);
const fetchAllAccounts = async () => await User.find().sort({ created_at: -1 });

// Message Functions 
// TODO:




export default User;
export {
    createAccountWithOptions,
    fetchAccountByAccountId,
    fetchAccountByEmail,
    fetchAccountByUsername,
    fetchAccountById,
    fetchAllAccounts,
};