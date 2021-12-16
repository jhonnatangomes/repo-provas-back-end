import { SendExam } from '../protocols/examInterface';
import { getRepository } from 'typeorm';
import { ExamEntity } from '../entities/ExamEntity';
import { APIError } from '../errors/APIError';
import { CategoryEntity } from '../entities/CategoryEntity';
import { SemesterEntity } from '../entities/SemesterEntity';
import { SubjectEntity } from '../entities/SubjectEntity';
import { TeacherEntity } from '../entities/TeacherEntity';

async function sendExam(exam: SendExam): Promise<SendExam> {
    const { name, category, semester, subject, teacher, link } = exam;
    const categoryResult = await getRepository(CategoryEntity).find({
        name: category,
    });

    const semesterResult = await getRepository(SemesterEntity).find({
        name: semester,
    });

    const subjectResult = await getRepository(SubjectEntity).find({
        name: subject,
    });

    const teacherResult = await getRepository(TeacherEntity).find({
        name: teacher,
    });

    const result = getRepository(ExamEntity).create({
        name,
        category: categoryResult[0],
        semester: semesterResult[0],
        subject: subjectResult[0],
        teacher: teacherResult[0],
        link,
    });

    await getRepository(ExamEntity).save(result);

    return result.getExam();
}

export { sendExam };
