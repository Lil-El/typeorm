import {Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class UserMetadata{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    weight: number;

    @OneToOne(() => User, User => User.metadata)
    @JoinColumn() // 关系的拥有方：关系的拥有方包含数据库中具有外键的列。
    user: User;
}