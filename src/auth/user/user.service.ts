import { BadRequestException, Injectable } from "@nestjs/common";
import Neode, { Repository } from "neodegm";
import { InjectRepository } from "../../ogm/decorators/inject-repository.decorator";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { EncryptionService } from "../encryption/encryption.service";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        private readonly neode: Neode,
        private readonly encryptionService: EncryptionService
    ) {}

    find(email: any): Promise<User | undefined> {
        // console.log(this.userRepository);

        return this.neode.getFirst<User>(User, { email })
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            // Encrypt Password
            const password = await this.encryptionService.hash(userDto.password)

            const user = User.create(userDto.email, password, userDto.firstName, userDto.lastName)

            return this.neode.save(user)
        }
        catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async update(id: string, properties: UpdateUserDto): Promise<User> {
        const user = await this.neode.find<User>(User, id)

        user.setEmail(properties.email)
        user.setFirstName(properties.firstName)
        user.setLastName(properties.lastName)

        return this.neode.save(user)
    }
}