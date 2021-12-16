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

export { getInfo };
