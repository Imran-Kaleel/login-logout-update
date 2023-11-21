import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    age: {type: String, default: ''},
    dob: {type: String, default: ''},
    gender: {type: String, default: ''},
    mobile: {type: String, default: ''}
})

const userModel = mongoose.model('userModel', userSchema);
export default userModel;