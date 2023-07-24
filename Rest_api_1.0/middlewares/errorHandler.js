import { ValidationError } from 'joi';
import { DEBUG_MODE } from "../config";
import CustomErrorHandler from "../services/CustomErrorHandler";

function errorHandler (err, req,res,next) {
    let statusCode = 500;
    let data = {
        message : "Internal server error",
        ...(DEBUG_MODE === 'true' && {original_error : err.message})
        // if(DEBUG_MODE === 'true'){
        //     orginial_Message 
        // }
    }
    
    if(err instanceof ValidationError){
        //422 unprocess entity
        statusCode =  422;
        data = {
            message : err.message
        }
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.statusCode;
        data ={
            message : err.message
        }
    }
    return res.status(statusCode).json(data);
}

export default errorHandler;