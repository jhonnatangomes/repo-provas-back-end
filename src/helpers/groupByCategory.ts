import { SendExam } from '../protocols/examInterface';
import { CategoryGroupWithTeacher } from '../protocols/groupByCategoryInterface';

function groupByCategory(exams: SendExam[]) {
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

export { groupByCategory };
