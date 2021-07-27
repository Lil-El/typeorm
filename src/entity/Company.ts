import {Column, PrimaryGeneratedColumn, Entity, OneToOne} from 'typeorm';
import { User } from './User';

@Entity()
export class Company{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @OneToOne(() => User, (User) => User.company)
    staff: User;
}