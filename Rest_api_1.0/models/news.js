import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    source : {
        type : String,
        required : true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type:String,
        required: true,
        
    },
    url: {
        type: String,
        required: true
    },
    urlToImage : {
        type : String,
        required : true
    },
    publishedAt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }

});

const newsModel = mongoose.model('news', newsSchema ,"newsapidata");
export default newsModel;