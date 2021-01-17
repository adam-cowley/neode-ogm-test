import { Controller, Get, Param } from '@nestjs/common';
import Neode, { Repository } from 'neodegm';
import { AppService } from './app.service';
import { User } from './auth/user/user.entity';
import { FindEntity } from './ogm/decorators/find-entity.decorator';
import { InjectRepository } from './ogm/decorators/inject-repository.decorator';

@Controller()
export class AppController {
  constructor(
    private neode: Neode,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Get()
  async getHello() {
    // const repo = this.neode.getRepository(User)
console.log(this.userRepository);

    return this.userRepository.find('test')
  }

  @Get('/:id')
  async getId(
    @FindEntity()
    // @Param('id')
     id: User) {

      console.log(this.userRepository);
    return id
  }
}
