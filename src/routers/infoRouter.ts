import { Router } from 'express';
import * as infoController from '../controllers/infoController';

const router = Router();

router.get('', infoController.getInfo);

export default router;
