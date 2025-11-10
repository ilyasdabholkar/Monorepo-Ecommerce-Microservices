import { getAuth } from "@clerk/express";
import {Request,Response,NextFunction} from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const AuthenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req as any);
    if(!auth.userId) return res.status(401).json({ message: "Unauthenticated User",});
    
    req.userId = auth.userId;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err});
  }
};
