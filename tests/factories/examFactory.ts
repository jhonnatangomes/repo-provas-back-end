import faker from 'faker';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '../../src/entities/CategoryEntity';
import { SemesterEntity } from '../../src/entities/SemesterEntity';
import { SubjectEntity } from '../../src/entities/SubjectEntity';
import { TeacherEntity } from '../../src/entities/TeacherEntity';
import { SubjectTeacherEntity } from '../../src/entities/SubjectTeacherEntity';
import { SendExam } from '../../src/protocols/examInterface';
import { TeacherInfo } from '../../src/protocols/infoInterface';
faker.locale = 'pt_BR';

function createIncorrectExam() {
    return {
        name: faker.datatype.number(),
        category: faker.datatype.string(),
        semester: faker.datatype.float(),
        subject: faker.datatype.array(),
        teacher: faker.name.findName(),
        link: faker.datatype.string(),
    };
}

async function createExam(): Promise<SendExam> {
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
        name: faker.datatype.string(),
        category: category.name,
        semester: semester.name,
        subject: subject.name,
        teacher: teacher.name,
        link: `https://${faker.random.alphaNumeric(30)}.pdf`,
    };
}

async function createTeacherAndSubject(): Promise<TeacherInfo> {
    const subject = getRepository(SubjectEntity).create({
        name: faker.datatype.string(),
    });

    const teacher = getRepository(TeacherEntity).create({
        name: faker.datatype.string(),
    });

    await getRepository(SubjectEntity).save(subject);
    await getRepository(TeacherEntity).save(teacher);

    await getRepository(SubjectTeacherEntity).insert({
        teacherId: teacher.id,
        subjectId: subject.id,
    });

    return {
        teacher: {
            id: teacher.id,
            name: teacher.name,
        },
        subject: {
            id: subject.id,
            name: subject.name,
        },
    };
}

export { createIncorrectExam, createExam, createTeacherAndSubject };
