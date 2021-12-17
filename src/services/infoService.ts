import { getRepository } from 'typeorm';
import { CategoryEntity } from '../entities/CategoryEntity';
import { SemesterEntity } from '../entities/SemesterEntity';
import { SubjectEntity } from '../entities/SubjectEntity';
import { TeacherEntity } from '../entities/TeacherEntity';
import {
    InfoSent,
    TeacherInfo,
    TeacherInfoQuery,
} from '../protocols/infoInterface';

async function getInfo(): Promise<InfoSent> {
    const categories = await getRepository(CategoryEntity).find();
    const semesters = await getRepository(SemesterEntity).find();
    const subjects = await getRepository(SubjectEntity).find();

    return {
        categories: categories.map((el) => ({ name: el.name })),
        semesters: semesters.map((el) => ({ name: el.name })),
        subjects: subjects.map((el) => ({ name: el.name })),
    };
}

async function getTeachers(subject: string): Promise<TeacherInfo[]> {
    const result: TeacherInfoQuery[] = await getRepository(TeacherEntity)
        .createQueryBuilder('teachers')
        .innerJoinAndSelect('teachers.subjects', 'subjects')
        .where('subjects.name ILIKE :subject', { subject: `%${subject}%` })
        .execute();

    return result.map((el) => ({
        teacher: {
            name: el.teachers_name,
        },
        subject: {
            name: el.subjects_name,
        },
    }));
}

export { getInfo, getTeachers };
