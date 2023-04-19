import { Response, Request } from "express";
import { verify } from "jsonwebtoken";


function middleware(req: Request, res: Response, next: any){
    const token: string | undefined = req.headers['authorization'];
    if(!token){
        return res.status(401).send({message: "Please send token in headers."})
    }
    try{
        token && verify(token.split(" ")[1], process.env.MY_SECRET_KEY as string);
        next();
    }
    catch(err){
        return res.status(400).send({"message": "Invalid Token"})
    }
}

export default middleware;