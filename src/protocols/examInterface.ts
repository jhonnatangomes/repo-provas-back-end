interface Exam {
    name: string;
    category: string;
    semester: string;
    subject: string;
    teacher: string;
    link: string;
}

interface AmountOfExamsByTeacher {
    id: number;
    name: string;
    amount: number;
}

interface AmountOfExamsBySubject {
    id: number;
    subject: string;
    amount: number;
}

interface AmountOfExamsBySemester {
    semester: string;
    exams: AmountOfExamsBySubject[];
}

export {
    Exam,
    AmountOfExamsByTeacher,
    AmountOfExamsBySubject,
    AmountOfExamsBySemester,
};
