import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamEntity } from './ExamEntity';
import { SubjectEntity } from './SubjectEntity';

@Entity('teachers')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ExamEntity, (exam) => exam.teacher, { eager: true })
    exams: ExamEntity[];

    @ManyToMany(() => SubjectEntity, (subject) => subject.teachers)
    @JoinTable({
        name: 'teachers_subjects',
        joinColumn: {
            name: 'teacher_id',
        },
        inverseJoinColumn: {
            name: 'subject_id',
        },
    })
    subjects: SubjectEntity[];

    getExams() {
        return { name: this.name, amount: this.exams.length };
    }
}
