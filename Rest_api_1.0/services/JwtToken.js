import {SECRET_KEY} from '../config';
import jwt from "jsonwebtoken";

export default class JwtToken {
    static signToken(payload, expiry = '150000s', secretKey = SECRET_KEY){
        return jwt.sign(payload, secretKey, {expiresIn : expiry})       
        
    }

    static verifyToken(token, secretKey = SECRET_KEY){
        return jwt.verify(token, secretKey);       
        
    }
}