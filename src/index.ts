import "reflect-metadata";
import {createConnection, Entity} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    // 使用EntityManager操作应用的实体
    const user = new User();
    user.name = "MINO";
    user.phone = "99324081710";
    
    // 向table: User 添加 record
    // save()返回Promise也可以使用.then
    // await connection.manager.save(user); 
    let userRecords = await connection.manager.find(User);

   
    // 每个实体都有自己的存储库，可以处理其实体的所有操作。当你经常处理实体时，Repositories 比 EntityManagers 更方便使用
    let userRepository = connection.getRepository(User);
    // await userRepository.save(user);
    userRecords = await userRepository.find();
    
    const oneUser = await userRepository.findOne(1);
    oneUser.phone = "15035250351";
    await userRepository.save(oneUser); // 修改record；remove是删除record
    
    const [records, count] = await userRepository.findAndCount({name: "MINO"})
    console.log("data: ", records);
    console.log("count: ", count);
    
    // TODO: 创建一对一的关系：https://typeorm.biunav.com/zh/#%E5%88%9B%E5%BB%BA%E4%B8%80%E5%AF%B9%E4%B8%80%E7%9A%84%E5%85%B3%E7%B3%BB

}).catch(error => console.log(error));
