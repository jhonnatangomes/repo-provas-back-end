/* eslint-disable indent */
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

    @OneToMany(() => ExamEntity, (exam) => exam.teacher)
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

    getExamAmounts() {
        return { id: this.id, name: this.name, amount: this.exams.length };
    }
}
