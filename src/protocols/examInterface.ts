interface SendExam {
    name: string;
    category: string;
    semester: string;
    subject: string;
    teacher: string;
    link: string;
}

interface ExamFiltered {
    name: string;
    amount: number;
}

export { SendExam, ExamFiltered };
