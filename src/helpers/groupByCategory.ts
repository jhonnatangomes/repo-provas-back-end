import { ExamEntity } from '../entities/ExamEntity';
import { AmountOfExamsBySubject, Exam } from '../protocols/examInterface';
import {
    ExamsBySubject,
    ExamsByTeacher,
} from '../protocols/groupByCategoryInterface';

function groupTeacherExamsByCategory(exams: Exam[]): ExamsByTeacher {
    const result: ExamsByTeacher = {
        teacher: exams[0].teacher,
        info: [],
    };

    exams.forEach((exam) => {
        const lastElement = result.info[result.info.length - 1];
        if (lastElement?.category === exam.category) {
            lastElement.exams.push({
                name: exam.name,
                subject: exam.subject,
                link: exam.link,
            });
        } else {
            result.info.push({
                category: exam.category,
                exams: [
                    {
                        name: exam.name,
                        subject: exam.subject,
                        link: exam.link,
                    },
                ],
            });
        }
    });

    return result;
}

function groupSubjectExamsByCategory(exams: Exam[]): ExamsBySubject {
    const result: ExamsBySubject = {
        subject: exams[0].subject,
        info: [],
    };

    exams.forEach((exam) => {
        const lastElement = result.info[result.info.length - 1];
        if (lastElement?.category === exam.category) {
            lastElement.exams.push({
                name: exam.name,
                teacher: exam.teacher,
                link: exam.link,
            });
        } else {
            result.info.push({
                category: exam.category,
                exams: [
                    {
                        name: exam.name,
                        teacher: exam.teacher,
                        link: exam.link,
                    },
                ],
            });
        }
    });

    return result;
}

function groupBySubject(exams: ExamEntity[]): AmountOfExamsBySubject[] {
    const result: AmountOfExamsBySubject[] = [];

    exams.sort((a, b) => {
        if (a.subject.name > b.subject.name) {
            return 1;
        }
        if (a.subject.name < b.subject.name) {
            return -1;
        }
        return 0;
    });

    exams.forEach((exam) => {
        const lastElement = result[result.length - 1];
        if (lastElement?.subject === exam.subject.name) {
            lastElement.amount += 1;
        } else {
            result.push({
                id: exam.subject.id,
                subject: exam.subject.name,
                amount: 1,
            });
        }
    });

    result.sort((a, b) => b.amount - a.amount);

    return result;
}

export {
    groupTeacherExamsByCategory,
    groupSubjectExamsByCategory,
    groupBySubject,
};
