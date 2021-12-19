/* eslint-disable indent */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { ExamEntity } from './ExamEntity';
import { TeacherEntity } from './TeacherEntity';

@Entity('subjects')
export class SubjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ExamEntity, (exam) => exam.subject)
    exams: ExamEntity[];

    @ManyToMany(() => TeacherEntity, (teacher) => teacher.subjects)
    teachers: TeacherEntity[];

    getTeachers() {
        return {
            subject: this.name,
            teachers: this.teachers.map((el) => el.name),
        };
    }
}
