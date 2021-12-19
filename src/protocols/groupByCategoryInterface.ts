interface Exam {
    name: string;
    subject?: string;
    link: string;
    teacher?: string;
}

interface ExamsByCategory {
    category: string;
    exams: Exam[];
}

interface ExamsByTeacher {
    teacher: string;
    info: ExamsByCategory[];
}

interface ExamsBySubject {
    subject: string;
    info: ExamsByCategory[];
}

export { ExamsByTeacher, ExamsBySubject };
