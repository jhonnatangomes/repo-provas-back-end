import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('semesters')
export class SemesterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
