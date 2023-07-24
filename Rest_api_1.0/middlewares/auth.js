import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtToken from "../services/JwtToken";


export default function auth (req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(CustomErrorHandler.unauthorized());
    }
    try{
        const token = authHeader.split(' ')[1];
        const {_id , role} = JwtToken.verifyToken(token);
        req.user = {
            _id,
            role
        }
        next();

    }catch(error){
        return next(CustomErrorHandler.unauthorized(error));
    }

}