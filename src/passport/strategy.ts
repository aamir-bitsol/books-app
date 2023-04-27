import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { Passport } from "passport";
import User from "../db/user.model";
import dotenv from "dotenv";

dotenv.config();

const passport = new Passport();

interface IOptionsInterface {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string | undefined;
}
let opts: IOptionsInterface = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.MY_SECRET_KEY,
};

passport.use(
  new Strategy(opts, async function (jwt_payload, done) {
    try {
      const user: any = await User.findOne({
        where: { username: jwt_payload.username },
      });
      if (!user) {
        console.log(user);
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
    if (!opts.jwtFromRequest) {
      done(null, false);
    }
    done(null, true);
  })
);

export default passport;
