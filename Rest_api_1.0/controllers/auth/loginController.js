import Joi from "joi";
import { UserModel, refreshTokenModel } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtToken from "../../services/JwtToken";
import bcrypt from "bcrypt";
import { REFRESH_TOKEN_SECRET_KEY } from "../../config";

const loginController = {
  async login(req, res, next) {
    //validate user
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    //step 2 - verify is it correct user (CHECK email and password )
    let isItRealUser = await UserModel.findOne({ email: req.body.email });

    if (!isItRealUser) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    let result = await bcrypt.compare(req.body.password, isItRealUser.password);

    if (!result) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    // step 3 - Generate token now
    let access_token = JwtToken.signToken({
      _id: isItRealUser._id,
      role: isItRealUser.role,
    });

    //create JWT refresh Token
    let refresh_token = JwtToken.signToken(
      { _id: isItRealUser._id, role: isItRealUser.role },
      "1y",
      REFRESH_TOKEN_SECRET_KEY
    );

    //white listing token in database (SAVING A TOKEN IN DB)
    await refreshTokenModel.create({ refreshToken: refresh_token });

    res.json({
      message: "logged in sucessfully!",
      access_token,
      refresh_token,
    });
  },

  async logout(req, res, next) {
    //validate request body carrying token
    const refreshToken = req.body.refresh_token;
    let refreshTokenSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshTokenSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      //check if token exist in DB
      const IsTokenExist = await refreshTokenModel.findOne({ refreshToken });
      //verify refresh Token
      if (!IsTokenExist) {
        return next(
          CustomErrorHandler.unauthorized("No Such refresh Token Exist")
        );
      }

      //Delete the refresh token from whitelist in DB

      const deletedToken = await refreshTokenModel.findOneAndDelete({
        refreshToken
      });

      res.json({
        deletedToken,
        message:
          "Token deleted successfully and user logged out of application",
      });
      next();
    } catch (error) {
      return next(CustomErrorHandler.unauthorized(error));
    }
  },
};

export default loginController;
