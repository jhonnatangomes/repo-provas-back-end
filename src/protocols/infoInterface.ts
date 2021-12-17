interface Info {
    name: string;
}

interface InfoSent {
    categories: Info[];
    semesters: Info[];
    subjects: Info[];
}

interface TeacherInfoQuery {
    teachers_id: number;
    teachers_name: string;
    subjects_id: number;
    subjects_name: string;
}

interface TeacherInfo {
    teacher: {
        name: string;
    };
    subject: {
        name: string;
    };
}

export { Info, InfoSent, TeacherInfoQuery, TeacherInfo };
