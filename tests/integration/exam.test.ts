import app, { init } from '../../src/app';
import supertest from 'supertest';
import { getConnection, getRepository } from 'typeorm';

import {
    createExam,
    createIncorrectExam,
    stringFactory,
} from '../factories/examFactory';
import { ExamEntity } from '../../src/entities/ExamEntity';
import { deleteTables } from '../utils/deleteTables';

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
        const exam = await createExam();
        const result = await agent.post('/provas').send({
            ...exam,
            category: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when semester doesn't exist", async () => {
        const exam = await createExam();
        const result = await agent.post('/provas').send({
            ...exam,
            semester: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when subject doesn't exist", async () => {
        const exam = await createExam();
        const result = await agent.post('/provas').send({
            ...exam,
            subject: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it("returns 404 when teacher doesn't exist", async () => {
        const exam = await createExam();
        const result = await agent.post('/provas').send({
            ...exam,
            teacher: stringFactory(),
        });
        expect(result.status).toEqual(404);
    });

    it('returns 200 and inserts an exam in database', async () => {
        const exam = await createExam();
        const result = await agent.post('/provas').send(exam);
        const examInDb = await getRepository(ExamEntity).find({
            where: { name: exam.name },
            relations: ['category', 'subject', 'teacher', 'semester'],
        });

        expect(result.status).toEqual(200);
        expect(result.body).toEqual(examInDb[0].getExam());
    });
});
