import "reflect-metadata";
import {createConnection, Entity, getConnection, getManager, getRepository} from "typeorm";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Author } from "./entity/Author";
import {Photo} from "./entity/Photo";
import { Album } from "./entity/Album";

createConnection().then(async connection => {
    // 3. ManyToMany
    // const album = new Album();
    // album.name = "相册1"

    // const album2 = new Album();
    // album2.name = "相册2"

    // const photo = new Photo();
    // photo.name = "放飞";
    // photo.albums = [album, album2]

    // await connection.manager.save(album)
    // await connection.manager.save(album2)
    // await connection.manager.save(photo)
    
    // const record = await connection.getRepository(Photo).find({relations: ["albums"]})
 
    let photos = await connection
        .getRepository(Photo)
        .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        // .innerJoinAndSelect("photo.metadata", "metadata")
        .leftJoinAndSelect("photo.albums", "album")
        .where("(photo.name = :photoName OR photo.name = :bearName)")
        // .andWhere
        .orderBy("photo.id", "DESC")
        .skip(0)
        .take(10)
        .setParameters({ photoName: "放飞", bearName: "山水" })
        .getMany();
    console.log(photos)
    
}).catch(error => console.log(error));

/**
 *  // 1. OneToOne、cascade
 *  let photo = new Photo();
    photo.name = "yx";
    photo.phone = "99324081710";
    
    let metadata = new PhotoMetadata();
    metadata.weight = 140;
    metadata.photo = photo;
    
    // 每个实体都有自己的存储库，可以处理其实体的所有操作。当你经常处理实体时，Repositories 比 EntityManagers 更方便使用
    let metadataRepository = connection.getRepository(PhotoMetadata);
    let photoRepository = connection.getRepository(Photo);

    // save()返回Promise也可以使用.then
    // 保存：先保存photo，然后是metadata；如果使用了cascade属性，只保存开启了cascade属性的entity即可
    // await connection.manager.save(photo);  // 使用entity manager操作
    await metadataRepository.save(metadata); // 使用repository操作
    
    const onePhoto = await photoRepository.findOne(1);
    onePhoto.phone = "15035250351";
    await photoRepository.save(onePhoto); // 修改record；remove是删除record
    
    let [photNamed, count] = await photoRepository.findAndCount({name: "MINO"})

    let records = await photoRepository.find({relations: ["metadata"]})
    records = await photoRepository.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata", "xxxs").getMany()
    console.log("data: ", records);
 */

/**
 * // 2. OneToMany、ManyToOne
    const author = new Author();
    author.name = "摄影师";

    const photo = new Photo;
    photo.author = author;
    photo.name = "山水"

    const photo2 = new Photo;
    photo2.author = author;
    photo2.name = "宠物";

    const photoMetadata = new PhotoMetadata;
    photoMetadata.weight = 97;
    photoMetadata.photo = photo2;

    const authorRepository = await connection.getRepository(Author);
    const photoRepository = await connection.getRepository(Photo);
    const photoMetadataRepository = await connection.getRepository(PhotoMetadata);
    
    await authorRepository.save(author);
    await photoMetadataRepository.save(photoMetadata);
    await photoRepository.save(photo);

    const record = await authorRepository.find({relations: ["photos"]})
    */