import faker from 'faker';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '../../src/entities/CategoryEntity';
import { SemesterEntity } from '../../src/entities/SemesterEntity';
import { SubjectEntity } from '../../src/entities/SubjectEntity';
import { TeacherEntity } from '../../src/entities/TeacherEntity';
import { SubjectTeacherEntity } from '../../src/entities/SubjectTeacherEntity';
import { Exam } from '../../src/protocols/examInterface';
import { TeacherInfo } from '../../src/protocols/infoInterface';
import { ExamEntity } from '../../src/entities/ExamEntity';

faker.locale = 'pt_BR';

interface IncorrectExam {
    name: number;
    category: string;
    semester: number;
    subject: (string | number)[];
    teacher: string;
    link: string;
}

interface Info {
    id: number;
    name: string;
}

interface AllInfo {
    category: Info;
    semester: Info;
    subject: Info;
    teacher: Info;
}

function createIncorrectExam(): IncorrectExam {
    return {
        name: faker.datatype.number(),
        category: faker.datatype.string(),
        semester: faker.datatype.float(),
        subject: faker.datatype.array(),
        teacher: faker.name.findName(),
        link: faker.datatype.string(),
    };
}

async function createInfo(): Promise<AllInfo> {
    const category = getRepository(CategoryEntity).create({
        name: faker.datatype.string(),
    });

    const semester = getRepository(SemesterEntity).create({
        name: faker.datatype.string(),
    });

    const subject = getRepository(SubjectEntity).create({
        name: faker.datatype.string(),
    });

    const teacher = getRepository(TeacherEntity).create({
        name: faker.datatype.string(),
    });

    await getRepository(CategoryEntity).save(category);
    await getRepository(SemesterEntity).save(semester);
    await getRepository(SubjectEntity).save(subject);
    await getRepository(TeacherEntity).save(teacher);

    return {
        category,
        semester,
        subject,
        teacher,
    };
}

async function getInfo(): Promise<Exam> {
    const { category, semester, subject, teacher } = await createInfo();

    const name = faker.datatype.string();
    const link = `https://${faker.random.alphaNumeric(30)}.pdf`;

    return {
        name,
        category: category.name,
        semester: semester.name,
        subject: subject.name,
        teacher: teacher.name,
        link,
    };
}

async function createExam(): Promise<Exam> {
    const info = await getInfo();
    const { name, link } = info;
    const { category, semester, subject, teacher } = await createInfo();

    await getRepository(ExamEntity).insert({
        name,
        category,
        semester,
        subject,
        teacher,
        link,
    });

    return {
        name,
        category: category.name,
        semester: semester.name,
        subject: subject.name,
        teacher: teacher.name,
        link,
    };
}

async function createTeacherAndSubject(): Promise<TeacherInfo> {
    const subject = getRepository(SubjectEntity).create({
        name: faker.random.alphaNumeric(30),
    });

    const teacher = getRepository(TeacherEntity).create({
        name: faker.random.alphaNumeric(30),
    });

    await getRepository(SubjectEntity).save(subject);
    await getRepository(TeacherEntity).save(teacher);

    await getRepository(SubjectTeacherEntity).insert({
        teacherId: teacher.id,
        subjectId: subject.id,
    });

    return {
        subject: subject.name,
        teachers: [teacher.name],
    };
}

function stringFactory(): string {
    return faker.datatype.string();
}

function alphaNumericFactory(): string {
    return faker.random.alphaNumeric(10);
}

export {
    createIncorrectExam,
    getInfo,
    createExam,
    createTeacherAndSubject,
    stringFactory,
    alphaNumericFactory,
};
