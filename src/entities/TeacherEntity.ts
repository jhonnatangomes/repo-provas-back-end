import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
