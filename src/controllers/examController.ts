import { NextFunction, Request, Response } from "express";
import validateExam from "../validations/validateExam";

async function sendExam(req: Request, res: Response, next: NextFunction) {
    try {
        const examValid = validateExam(req.body);
        if(!examValid.isValid) {
            return res.status(400).send(examValid.message);
        }

        return res.send('okay');
    } catch (error) {
        return next(error);
    }
}

export { sendExam };