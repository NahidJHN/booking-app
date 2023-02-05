import { Router } from "express";
import auth from "../../middlewares/auth"
import authController from "../../controllers/auth.controller";
import validate from "../../middlewares/validate.middleware";
import authValidation from "../../validations/auth.validation";


const authRoute = Router();

authRoute.post('/register/', validate(authValidation.register), authController.register);
authRoute.post('/login', validate(authValidation.login), authController.login);

// authRoute.post('/logout', validate(authValidation.logout), authController.logout);
// authRoute.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// authRoute.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// authRoute.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// authRoute.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// authRoute.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default authRoute;

