interface Info {
    id: number;
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
        id: number;
        name: string;
    };
    subject: {
        id: number;
        name: string;
    };
}

export { Info, InfoSent, TeacherInfoQuery, TeacherInfo };
