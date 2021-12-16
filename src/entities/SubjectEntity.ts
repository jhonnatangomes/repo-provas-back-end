import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn,
} from 'typeorm';
import { TeacherEntity } from './TeacherEntity';

@Entity('subjects')
export class SubjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => TeacherEntity, (teacher) => teacher.subjects)
    teachers: TeacherEntity[];
}
