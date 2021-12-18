import { getRepository, ILike } from 'typeorm';
import { CategoryEntity } from '../entities/CategoryEntity';
import { SemesterEntity } from '../entities/SemesterEntity';
import { SubjectEntity } from '../entities/SubjectEntity';
import { Info, TeacherInfo } from '../protocols/infoInterface';

async function getInfo(): Promise<Info> {
    const categories = await getRepository(CategoryEntity).find();
    const semesters = await getRepository(SemesterEntity).find();
    const subjects = await getRepository(SubjectEntity).find();

    return {
        categories: categories.map((el) => el.name),
        semesters: semesters.map((el) => el.name),
        subjects: subjects.map((el) => el.name),
    };
}

async function getTeachers(subject: string): Promise<TeacherInfo> {
    const result = await getRepository(SubjectEntity).find({
        relations: ['teachers'],
        where: {
            name: ILike(`%${subject}%`),
        },
    });

    return result[0].getTeachers();
}

export { getInfo, getTeachers };
