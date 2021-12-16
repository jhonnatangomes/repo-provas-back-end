interface Info {
    id: number;
    name: string;
}

interface InfoSent {
    categories: Info[];
    semesters: Info[];
    subjects: Info[];
}

interface TeacherInfo {
    teacher_id: number;
    teacher_name: string;
    subject_id: number;
    subject_name: string;
}

export { Info, InfoSent, TeacherInfo };
