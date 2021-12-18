import { ExamFiltered, SendExam } from '../protocols/examInterface';
import { getRepository } from 'typeorm';
import { ExamEntity } from '../entities/ExamEntity';
import { CategoryEntity } from '../entities/CategoryEntity';
import { SemesterEntity } from '../entities/SemesterEntity';
import { SubjectEntity } from '../entities/SubjectEntity';
import { TeacherEntity } from '../entities/TeacherEntity';
import { APIError } from '../errors/APIError';

async function sendExam(exam: SendExam): Promise<SendExam> {
    const { name, category, semester, subject, teacher, link } = exam;
    const categoryResult = await getRepository(CategoryEntity).find({
        name: category,
    });

    if (categoryResult.length === 0) {
        throw new APIError("category doesn't exist", 'NotFound');
    }

    const semesterResult = await getRepository(SemesterEntity).find({
        name: semester,
    });

    if (semesterResult.length === 0) {
        throw new APIError("semester doesn't exist", 'NotFound');
    }

    const subjectResult = await getRepository(SubjectEntity).find({
        name: subject,
    });

    if (subjectResult.length === 0) {
        throw new APIError("subject doesn't exist", 'NotFound');
    }

    const teacherResult = await getRepository(TeacherEntity).find({
        name: teacher,
    });

    if (teacherResult.length === 0) {
        throw new APIError("teacher doesn't exist", 'NotFound');
    }

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

async function getExams(filter: string): Promise<ExamFiltered[]> {
    let result;
    if (filter === 'professores') {
        result = await getRepository(TeacherEntity).find({});
    }

    result.sort((a, b) => b.getExams().amount - a.getExams().amount);

    return result.map((el) => el.getExams()).filter((el) => el.amount !== 0);
}

export { sendExam, getExams };
