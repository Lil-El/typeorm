import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Company } from "./Company";

@Entity()
export class User {

    @PrimaryGeneratedColumn() // 使该列成为主键
    id: number;

    @Column("text")
    name: string;

    @Column({
        length: 11
    })
    phone: string;

    @OneToOne(() => Company, company => company.staff)
    @JoinColumn() // 关系的拥有方：关系的拥有方包含数据库中具有外键的列。
    company: Company;
}
