import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    
    refreshToken: {
        type: String,
        unique: true
    }

},{timestamps : false});

const refreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);
export default refreshTokenModel;