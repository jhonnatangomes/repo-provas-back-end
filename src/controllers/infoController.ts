import { NextFunction, Request, Response } from 'express';
import * as infoService from '../services/infoService';

async function getInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await infoService.getInfo();
        return res.send(result);
    } catch (error) {
        return next(error);
    }
}

async function getTeachers(req: Request, res: Response, next: NextFunction) {
    try {
        const { subject } = req.query;
        const result = await infoService.getTeachers(subject.toString());
        return res.send(result);
    } catch (error) {
        return next(error);
    }
}

export { getInfo, getTeachers };
