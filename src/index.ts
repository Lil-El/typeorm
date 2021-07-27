import "reflect-metadata";
import {createConnection, Entity} from "typeorm";
import { Company } from "./entity/Company";
import {User} from "./entity/User";

createConnection().then(async connection => {

    const company = new Company();
    company.name = "山东天元信息";
    
    const user = new User();
    user.name = "MINO";
    user.phone = "99324081710";
    user.company = company;
    
    // 每个实体都有自己的存储库，可以处理其实体的所有操作。当你经常处理实体时，Repositories 比 EntityManagers 更方便使用
    let companyRepository = connection.getRepository(Company);
    let userRepository = connection.getRepository(User);

    // save()返回Promise也可以使用.then
    // 保存：先保存company，然后是user；
    await companyRepository.save(company); // 使用repository操作
    await connection.manager.save(user);  // 使用entity manager操作
    
    const oneUser = await userRepository.findOne(1);
    oneUser.phone = "15035250351";
    await userRepository.save(oneUser); // 修改record；remove是删除record
    
    const [records, count] = await userRepository.findAndCount({name: "MINO"})
    console.log("data: ", records);
    console.log("count: ", count);

}).catch(error => console.log(error));
