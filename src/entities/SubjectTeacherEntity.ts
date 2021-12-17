import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers_subjects')
export class SubjectTeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'teacher_id' })
    teacherId: number;

    @Column({ name: 'subject_id' })
    subjectId: number;
}
