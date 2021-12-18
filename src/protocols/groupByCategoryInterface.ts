interface GroupedExam {
    name: string;
    subject: string;
    link: string;
}

interface CategoryGroup {
    category: string;
    exams: GroupedExam[];
}

interface CategoryGroupWithTeacher {
    teacher: string;
    info: CategoryGroup[];
}

export { CategoryGroupWithTeacher };
