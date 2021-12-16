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

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => SubjectEntity)
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;

    @ManyToOne(() => TeacherEntity)
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @ManyToOne(() => SemesterEntity)
    @JoinColumn({ name: 'semester_id' })
    semester: SemesterEntity;

    @Column()
    link: string;

    getExam() {
        return {
            id: this.id,
            name: this.name,
            category: this.category.name,
            subject: this.subject.name,
            teacher: this.teacher.name,
            semester: this.semester.name,
            link: this.link,
        };
    }

    getExamWithoutId() {
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
