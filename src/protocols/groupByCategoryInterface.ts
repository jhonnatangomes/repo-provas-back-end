interface GroupedExam {
    name: string;
    subject?: string;
    link: string;
    teacher?: string;
}

interface CategoryGroup {
    category: string;
    exams: GroupedExam[];
}

interface CategoryGroupWithTeacher {
    teacher: string;
    info: CategoryGroup[];
}

interface CategoryGroupWithSubject {
    subject: string;
    info: CategoryGroup[];
}

export { CategoryGroupWithTeacher, CategoryGroupWithSubject };
