import express from 'express';
import { APP_PORT,MONGODB_USERNAME,MONGODB_PASSWORD } from "./config";
import cors  from "cors";
import mongoose from 'mongoose';

//middleware
import {errorHandler} from "./middlewares";

//routes
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.atxnj0o.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true , useFindAndModify : true , useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected successfully!');
}); 







app.use(errorHandler);
app.listen(APP_PORT, () => {
    console.log(`Currently listening on Port ${APP_PORT} `);

})