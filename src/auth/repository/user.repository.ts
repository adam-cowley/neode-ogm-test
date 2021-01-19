import { Repository } from "neodegm";
import EntityRepository from "src/neode/decorators/entity-repository.decorator";
import { User } from "../user/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {


}