import { Response, Request } from "express";
import passport from "../passport/strategy";

// This middleware checks for headers and see if given token is correct or not.
function authMiddleware(req: Request, res: Response, next: any): any {
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

export default authMiddleware;
