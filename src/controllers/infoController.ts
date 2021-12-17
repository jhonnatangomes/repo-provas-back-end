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
        const { disciplina } = req.query;
        if (!disciplina) {
            return res.status(400).send('subject required');
        }
        const result = await infoService.getTeachers(disciplina.toString());
        return res.send(result);
    } catch (error) {
        return next(error);
    }
}

export { getInfo, getTeachers };
