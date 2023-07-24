import { REFRESH_TOKEN_SECRET_KEY } from "../../config";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtToken from "../../services/JwtToken";
import { refreshTokenModel } from "../../models";

const refreshTokenController = {
  async refresh(req, res, next) {
    //validate request body carrying token
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
      return next(CustomErrorHandler.unauthorized("Invalid Refresh Token"));
    }
    try {
      //check if token exist in DB
      const IsTokenExist = await refreshTokenModel.findOne({ refreshToken });
      //verify refresh Token
      if(!IsTokenExist){
        return next(CustomErrorHandler.unauthorized("No Such refresh Token Exist"));
      }
      const { _id, role } = JwtToken.verifyToken(
        refreshToken,
        REFRESH_TOKEN_SECRET_KEY
      );
      //create New access token
      let access_token = JwtToken.signToken({ _id, role });
      res.json({ access_token, refresh_token : refreshToken });
      next();
    } catch (error) {
      return next(CustomErrorHandler.unauthorized(error));
    }
  }
};

export default refreshTokenController;
