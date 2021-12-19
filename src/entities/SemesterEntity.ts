/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { groupBySubject } from '../helpers/groupByCategory';
import { ExamEntity } from './ExamEntity';

@Entity('semesters')
export class SemesterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ExamEntity, (exam) => exam.semester)
    exams: ExamEntity[];

    getExams() {
        return {
            id: this.id,
            semester: this.name,
            exams: groupBySubject(this.exams),
        };
    }
}
