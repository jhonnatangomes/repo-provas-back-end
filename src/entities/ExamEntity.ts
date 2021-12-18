import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { SemesterEntity } from './SemesterEntity';
import { SubjectEntity } from './SubjectEntity';
import { TeacherEntity } from './TeacherEntity';

@Entity('exams')
export class ExamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => SubjectEntity, { eager: true })
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;

    @ManyToOne(() => TeacherEntity, { eager: true })
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @ManyToOne(() => SemesterEntity, { eager: true })
    @JoinColumn({ name: 'semester_id' })
    semester: SemesterEntity;

    @Column()
    link: string;

    getExam() {
        return {
            name: this.name,
            category: this.category.name,
            subject: this.subject.name,
            teacher: this.teacher.name,
            semester: this.semester.name,
            link: this.link,
        };
    }
}
