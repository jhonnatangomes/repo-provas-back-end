import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subjects')
export class SubjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
