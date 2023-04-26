import { Response, Request } from "express";
import passport from "../passport/strategy";


function Authenticate(req: Request, res: Response, next: any): any {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: string, user: any, info: any) => {
        if (info) {
          res.status(401).json({ message: "Missing headers or invalid token" });
        } else {
          next();
        }
      }
    )(req, res);
}

export default Authenticate;
