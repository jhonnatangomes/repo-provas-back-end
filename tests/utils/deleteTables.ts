import { getConnection } from 'typeorm';
import { CategoryEntity } from '../../src/entities/CategoryEntity';
import { ExamEntity } from '../../src/entities/ExamEntity';
import { SemesterEntity } from '../../src/entities/SemesterEntity';
import { SubjectEntity } from '../../src/entities/SubjectEntity';
import { SubjectTeacherEntity } from '../../src/entities/SubjectTeacherEntity';
import { TeacherEntity } from '../../src/entities/TeacherEntity';

async function deleteTables() {
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SubjectTeacherEntity)
        .execute();

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ExamEntity)
        .execute();

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(CategoryEntity)
        .execute();

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SemesterEntity)
        .execute();

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SubjectEntity)
        .execute();

    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TeacherEntity)
        .execute();
}

export { deleteTables };
