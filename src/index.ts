import "reflect-metadata";
import {createConnection, Entity} from "typeorm";
import { UserMetadata } from "./entity/UserMetadata";
import {User} from "./entity/User";

createConnection().then(async connection => {

    const user = new User();
    user.name = "MINO";
    user.phone = "99324081710";
    
    const metadata = new UserMetadata();
    metadata.weight = 140;
    metadata.user = user;
    
    // 每个实体都有自己的存储库，可以处理其实体的所有操作。当你经常处理实体时，Repositories 比 EntityManagers 更方便使用
    let metadataRepository = connection.getRepository(UserMetadata);
    let userRepository = connection.getRepository(User);

    // save()返回Promise也可以使用.then
    // 保存：先保存user，然后是metadata；
    await connection.manager.save(user);  // 使用entity manager操作
    await metadataRepository.save(metadata); // 使用repository操作
    
    /************just query*************/

    const oneUser = await userRepository.findOne(1);
    oneUser.phone = "15035250351";
    await userRepository.save(oneUser); // 修改record；remove是删除record
    
    let [records, count] = await userRepository.findAndCount({name: "MINO"})

    records = await userRepository.find({relations: ["metadata"]})
    records = await userRepository.createQueryBuilder("user").innerJoinAndSelect("user.metadata", "xxxs").getMany()
    console.log("data: ", records);

}).catch(error => console.log(error));