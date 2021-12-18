import { getRepository, ILike } from 'typeorm';
import { CategoryEntity } from '../entities/CategoryEntity';
import { SemesterEntity } from '../entities/SemesterEntity';
import { SubjectEntity } from '../entities/SubjectEntity';
import { InfoSent } from '../protocols/infoInterface';

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

async function getTeachers(subject: string) {
    const result = await getRepository(SubjectEntity).find({
        relations: ['teachers'],
        where: {
            name: ILike(`%${subject}%`),
        },
    });

    return result.map((subject) => subject.getTeachers());
}

export { getInfo, getTeachers };
