import express from 'express';
import { registerController, loginController, userController, refreshTokenController , newsDataController} from '../controllers/index';
import auth from "../middlewares/auth";

let router  = express.Router();

router.post('/register' , registerController.resolveReq);

router.post('/login', loginController.login);

router.get('/me', auth, userController.me);

router.get('/news', newsDataController.getAllNews);

router.post('/refreshToken', refreshTokenController.refresh);

router.post('/logout', auth ,loginController.logout);

export default router;