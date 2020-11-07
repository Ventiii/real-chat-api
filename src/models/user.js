import { Schema } from 'mongoose';



const time = Math.round(new Date().getTime() / 1000);



const userSchema = new Schema({
    id: { type: Number },
    username: {
        type: String,
        required: true,
        default: null,
    },
    email: { 
        type: String,
        required: true,
        default: null
    },
    imageUrl: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: time
    },
    updated_at: {
        type: Number,
        default: time
    }
});


export default userSchema;