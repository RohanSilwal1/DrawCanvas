import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
export interface CustomJwtPayload extends JwtPayload {
    userId: string;
}
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export const middleware = (req: Request, res: Response, next: NextFunction) => {
    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (!JWT_SECRET) {
        return res.status(411).json({
            message: "JWT_SECRET is not defined"
        })
    }
    const token = req.headers.Authorization as string;
    if (!token) {
        return res.status(411).json({
            message: "Token missing from Authorization header"
        })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload
        req.userId = decoded.userId
        next();

    } catch (error) {
        return res.status(411).json({
            message: "Invalid token"
        })
    }

}