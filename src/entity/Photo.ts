import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, ManyToOne, ManyToMany} from "typeorm";
import { Album } from "./Album";
import { Author } from "./Author";
import { PhotoMetadata } from "./PhotoMetadata";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn() // 使该列成为主键
    id: number;

    @Column("text")
    name: string;

    @ManyToOne(() => Author, author => author.photos)
    author: Author; // photo和author，Photo是关系的拥有方，拥有方总是ManyToOne

    @Column({
        length: 11,
        nullable: true
    })
    date: string;

    @ManyToMany(() => Album, album => album.photos)
    @JoinTable()
    albums: Album[]

    @OneToOne(() => PhotoMetadata, PhotoMetadata => PhotoMetadata.photo)
    metadata: PhotoMetadata;
}
