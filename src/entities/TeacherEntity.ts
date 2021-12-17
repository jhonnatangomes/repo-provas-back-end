import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity } from './SubjectEntity';

@Entity('teachers')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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
}
