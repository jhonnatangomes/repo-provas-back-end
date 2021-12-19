interface Exam {
    name: string;
    category: string;
    semester: string;
    subject: string;
    teacher: string;
    link: string;
}

interface ExamByTeacher {
    name: string;
    amount: number;
}

interface ExamBySubject {
    id: number;
    subject: string;
    amount: number;
}

interface ExamsBySemesters {
    semester: string;
    exams: ExamBySubject[];
}

export { Exam, ExamByTeacher, ExamBySubject, ExamsBySemesters };
