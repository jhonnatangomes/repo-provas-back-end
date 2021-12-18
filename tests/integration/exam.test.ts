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

    it('returns 200 and a list of exams grouped by categories', async () => {
        const exam = await createExam();

        const teacher = await getRepository(TeacherEntity).findOne({
            name: exam.teacher,
        });

        const result = await agent.get(`/provas/professores/${teacher.id}`);
        expect(result.status).toEqual(200);
        expect(result.body[0].category).toEqual(exam.category);
        expect(result.body[0].exams[0].teacher.id).toEqual(teacher.id);
        expect(result.body[0].exams[0].teacher.name).toEqual(exam.teacher);
    });
});
