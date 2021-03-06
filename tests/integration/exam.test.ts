import app, { init } from '../../src/app';
import supertest from 'supertest';
import { getConnection, getRepository } from 'typeorm';

import {
    alphaNumericFactory,
    createExam,
    createIncorrectExam,
    getInfo,
    stringFactory,
} from '../factories/examFactory';
import { ExamEntity } from '../../src/entities/ExamEntity';
import { deleteTables } from '../utils/deleteTables';
import { TeacherEntity } from '../../src/entities/TeacherEntity';
import { SubjectEntity } from '../../src/entities/SubjectEntity';
import { SemesterEntity } from '../../src/entities/SemesterEntity';

const agent = supertest(app);

beforeAll(async () => {
    await init();
});

afterAll(async () => {
    await deleteTables();
    await getConnection().close();
});

describe('post /provas', () => {
    afterEach(async () => {
        await deleteTables();
    });

    it('returns 400 for incorrect body sent', async () => {
        const result = await agent.post('/provas').send(createIncorrectExam());
        expect(result.status).toEqual(400);
    });

    it("returns 404 when category doesn't exist", async () => {
        const exam = await getInfo();
        const result = await agent.post('/provas').send({
            ...exam,
            category: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when semester doesn't exist", async () => {
        const exam = await getInfo();
        const result = await agent.post('/provas').send({
            ...exam,
            semester: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when subject doesn't exist", async () => {
        const exam = await getInfo();
        const result = await agent.post('/provas').send({
            ...exam,
            subject: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when teacher doesn't exist", async () => {
        const exam = await getInfo();
        const result = await agent.post('/provas').send({
            ...exam,
            teacher: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it('returns 200 and inserts an exam in database', async () => {
        const exam = await getInfo();
        const result = await agent.post('/provas').send(exam);
        const examInDb = await getRepository(ExamEntity).find({
            where: { name: exam.name },
            relations: ['category', 'subject', 'teacher', 'semester'],
        });

        expect(result.status).toEqual(200);
        expect(result.body).toEqual(examInDb[0].getExam());
    });
});

describe('get /provas/professores', () => {
    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 200 and a list of teachers with their amount of exams', async () => {
        const exam = await createExam();
        const exam2 = await createExam();

        const result = await agent.get('/provas/professores');
        expect(result.status).toEqual(200);
        expect(result.body[0].name).toEqual(exam.teacher);
        expect(result.body[0].amount).toEqual(1);
        expect(result.body[1].name).toEqual(exam2.teacher);
        expect(result.body[1].amount).toEqual(1);
    });
});

describe('get /provas/professores/:id', () => {
    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 400 if id given is not a number', async () => {
        const result = await agent.get(
            `/provas/professores/${alphaNumericFactory()}`
        );
        expect(result.status).toEqual(400);
    });

    it('returns 404 for when no exams are found', async () => {
        const result = await agent.get('/provas/professores/1');
        expect(result.status).toEqual(404);
    });

    it('returns 200 and a list of exams grouped by categories', async () => {
        const exam = await createExam();

        const teacher = await getRepository(TeacherEntity).findOne({
            name: exam.teacher,
        });

        const result = await agent.get(`/provas/professores/${teacher.id}`);
        expect(result.status).toEqual(200);
        expect(result.body.teacher).toEqual(exam.teacher);
        expect(result.body.info[0].category).toEqual(exam.category);
        expect(result.body.info[0].exams[0].name).toEqual(exam.name);
        expect(result.body.info[0].exams[0].subject).toEqual(exam.subject);
        expect(result.body.info[0].exams[0].link).toEqual(exam.link);
    });
});

describe('get /provas/disciplinas', () => {
    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 200 and a list of subjects with their amount of exams grouped by semesters', async () => {
        const exam = await createExam();
        const exam2 = await createExam();

        const result = await agent.get('/provas/disciplinas');
        expect(result.status).toEqual(200);
        expect(result.body[0].semester).toEqual(exam.semester);
        expect(result.body[0].exams[0].subject).toEqual(exam.subject);
        expect(result.body[0].exams[0].amount).toEqual(1);
        expect(result.body[1].semester).toEqual(exam2.semester);
        expect(result.body[1].exams[0].subject).toEqual(exam2.subject);
        expect(result.body[1].exams[0].amount).toEqual(1);
    });
});

describe('get /provas/disciplinas/:semesterId/:subjectId', () => {
    beforeAll(async () => {
        await deleteTables();
    });

    it('returns 400 if semester id is not a number', async () => {
        const result = await agent.get(
            `/provas/disciplinas/${alphaNumericFactory()}/1`
        );
        expect(result.status).toEqual(400);
    });

    it('returns 400 if subject id is not a number', async () => {
        const result = await agent.get(
            `/provas/disciplinas/1/${alphaNumericFactory()}`
        );
        expect(result.status).toEqual(400);
    });

    it('returns 404 for when no exams are found', async () => {
        const result = await agent.get('/provas/disciplinas/1/1');
        expect(result.status).toEqual(404);
    });

    it('returns 200 and a list of exams grouped by categories', async () => {
        const exam = await createExam();

        const semester = await getRepository(SemesterEntity).findOne({
            name: exam.semester,
        });

        const subject = await getRepository(SubjectEntity).findOne({
            name: exam.subject,
        });

        const result = await agent.get(
            `/provas/disciplinas/${semester.id}/${subject.id}`
        );
        expect(result.status).toEqual(200);
        expect(result.body.subject).toEqual(exam.subject);
        expect(result.body.info[0].category).toEqual(exam.category);
        expect(result.body.info[0].exams[0].name).toEqual(exam.name);
        expect(result.body.info[0].exams[0].teacher).toEqual(exam.teacher);
        expect(result.body.info[0].exams[0].link).toEqual(exam.link);
    });
});
