/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExamEntity } from './ExamEntity';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ExamEntity, (exam) => exam.category)
    exams: ExamEntity[];

    getExamsByTeacherId(teacherId: number) {
        return {
            category: this.name,
            exams: this.exams.filter((el) => el.teacher.id === teacherId),
        };
    }
}
