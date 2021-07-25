import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
