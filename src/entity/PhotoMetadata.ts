import {Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn} from 'typeorm';
import { Photo } from './Photo';

@Entity()
export class PhotoMetadata{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    weight: number;

    @OneToOne(() => Photo, Photo => Photo.metadata, {
        cascade: true // 允许保存当前Entity的时候，将该字段的实体对象保存到相应的表中
    })
    @JoinColumn() // 关系的拥有方：关系的拥有方包含数据库中具有外键的列。
    photo: Photo;
}