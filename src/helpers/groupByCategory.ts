import { ExamEntity } from '../entities/ExamEntity';
import { ExamBySubject, SendExam } from '../protocols/examInterface';
import { CategoryGroupWithTeacher } from '../protocols/groupByCategoryInterface';

function groupByTeacher(exams: SendExam[]) {
    const result: CategoryGroupWithTeacher = {
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

function groupByExam(exams: ExamEntity[]) {
    const result: ExamBySubject[] = [];

    exams.sort((a, b) => {
        if (a.subject.name > b.subject.name) {
            return 1;
        } else if (a.subject.name < b.subject.name) {
            return -1;
        } else {
            return 0;
        }
    });

    exams.forEach((exam) => {
        const lastElement = result[result.length - 1];
        if (lastElement?.subject === exam.subject.name) {
            lastElement.amount += 1;
        } else {
            result.push({
                subject: exam.subject.name,
                amount: 1,
            });
        }
    });

    return result;
}

export { groupByTeacher, groupByExam };
