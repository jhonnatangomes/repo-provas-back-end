interface Info {
    name: string;
}

interface InfoSent {
    categories: Info[];
    semesters: Info[];
    subjects: Info[];
}

interface TeacherInfo {
    subject: string;
    teachers: string[];
}

export { Info, InfoSent, TeacherInfo };
