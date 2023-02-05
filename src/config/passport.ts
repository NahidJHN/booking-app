import { Strategy as JwtStrategy, ExtractJwt, } from "passport-jwt"
import config from "./config";
import { tokenTypes } from "./token";
import User from "../models/User";

interface payload {
  type: string,
  sub: string
}

const jwtOptions = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: payload, done: Function) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy