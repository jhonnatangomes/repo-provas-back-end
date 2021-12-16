interface Info {
    id: number;
    name: string;
}

interface InfoSent {
    categories: Info[];
    semesters: Info[];
    subjects: Info[];
}

export { InfoSent };
