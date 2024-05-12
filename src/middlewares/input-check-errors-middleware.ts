import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e: Result = validationResult(req);
    const errors = e.array()
    if (errors.length) {
        res.status(400).json({ errorsMessages: errors.map(e => ({ message: e.msg, field: e.path }))[0] })
        return
    }
    next()
}