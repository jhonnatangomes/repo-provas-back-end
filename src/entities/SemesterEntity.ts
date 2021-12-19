import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { groupByExam } from '../helpers/groupByCategory';
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
            semester: this.name,
            exams: groupByExam(this.exams),
        };
    }
}
