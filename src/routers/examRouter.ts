import { Router } from "express";

import * as examController from '../controllers/examController';

const router = Router();

router.post('', examController.sendExam);

export default router;