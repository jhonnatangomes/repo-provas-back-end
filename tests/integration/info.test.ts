import app, { init } from '../../src/app';
import supertest from 'supertest';
import { getConnection, getRepository } from 'typeorm';

import { deleteTables } from '../utils/deleteTables';
import { getInfo, createTeacherAndSubject } from '../factories/examFactory';
import { SendExam } from '../../src/protocols/examInterface';
import { TeacherInfo } from '../../src/protocols/infoInterface';

const agent = supertest(app);

beforeAll(async () => {
    await init();
});

afterAll(async () => {
    await deleteTables();
    await getConnection().close();
});

describe('get /info', () => {
    let exam: SendExam;
    beforeAll(async () => {
        await deleteTables();
        exam = await getInfo();
    });

    it('returns 200 and an object with database info', async () => {
        const result = await agent.get('/info');
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('categories');
        expect(result.body).toHaveProperty('semesters');
        expect(result.body).toHaveProperty('subjects');
        expect(result.body.categories[0]).toEqual(exam.category);
        expect(result.body.semesters[0]).toEqual(exam.semester);
        expect(result.body.subjects[0]).toEqual(exam.subject);
    });
});

describe('get /info/professores', () => {
    let teacherAndSubject: TeacherInfo;
    beforeAll(async () => {
        await deleteTables();
        teacherAndSubject = await createTeacherAndSubject();
    });

    it('returns 400 when no subject is provided', async () => {
        const result = await agent.get('/info/professores');
        expect(result.status).toEqual(400);
    });

    it('returns 200 and the list of teachers for given subject', async () => {
        const result = await agent.get(
            `/info/professores?disciplina=${teacherAndSubject.subject}`
        );
        expect(result.status).toEqual(200);
        expect(result.body).toEqual(teacherAndSubject);
    });
});
