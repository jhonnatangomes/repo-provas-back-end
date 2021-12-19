import { Router } from 'express';

import * as examController from '../controllers/examController';

const router = Router();

router.post('', examController.sendExam);
router.get('/professores', examController.getExams);
router.get('/professores/:teaId', examController.getExamsByColumnId);
router.get('/disciplinas', examController.getExams);
router.get('/disciplinas/:semId/:subId', examController.getExamsByColumnId);

export default router;
