import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { UserMetadata } from "./UserMetadata";

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

    @OneToOne(() => UserMetadata, userMetadata => userMetadata.user)
    metadata: UserMetadata;
}
