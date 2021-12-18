import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { TeacherEntity } from './TeacherEntity';

@Entity('subjects')
export class SubjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => TeacherEntity, (teacher) => teacher.subjects)
    teachers: TeacherEntity[];

    getTeachers() {
        return {
            subject: this.name,
            teachers: this.teachers.map((el) => el.name),
        };
    }
}
