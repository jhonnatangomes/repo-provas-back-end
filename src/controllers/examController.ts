import { NextFunction, Request, Response } from 'express';
import validateExam from '../validations/validateExam';
import * as examService from '../services/examService';

async function sendExam(req: Request, res: Response, next: NextFunction) {
    try {
        const examValid = validateExam(req.body);
        if (!examValid.isValid) {
            return res.status(400).send(examValid.message);
        }

        const result = await examService.sendExam(req.body);

        return res.send(result);
    } catch (error) {
        if (error.type === 'NotFound') {
            return res.status(404).send(error.message);
        }
        return next(error);
    }
}

async function getExams(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.url.split('/')[1];
        const result = await examService.getExams(filter);
        return res.send(result);
    } catch (error) {
        return next(error);
    }
}

export { sendExam, getExams };
