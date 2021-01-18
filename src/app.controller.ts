import { Body, Controller, Get, Inject, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import Neode, { Repository } from 'neodegm';
import { Neo4jErrorFilter } from 'nest-neo4j/dist';
import { AppService } from './app.service';
import { AuthUser } from './auth/decorators/user.decorator';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { User } from './auth/user/user.entity';
import { FindEntity } from './ogm/decorators/find-entity.decorator';
import { GetRepository } from './ogm/decorators/get-repository.decorator';
import { InjectRepository } from './ogm/decorators/inject-repository.decorator';
import { NeodeInterceptor } from './ogm/interceptors/neode.interceptor';
import { TransactionManager } from './ogm/transaction.manager';

@Controller()
@UseInterceptors(NeodeInterceptor)
@UseFilters(Neo4jErrorFilter)
export class AppController {
  constructor(
    private neode: Neode,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly transactionManager: TransactionManager,
  ) {}

  @Get()
  async getHello() {
    return this.userRepository.find('test')
  }

  @Get('/:userId')
  async get(
    @FindEntity({ entity: User, param: 'userId' }) user: any,
  ) {
      return user
  }

  @UsePipes(ValidationPipe)
  @Post('/')
  async postUser(
    @GetRepository({entity: User})
    userRepository: Repository<User>,
    @Body()
    userDto: CreateUserDto
  ) {
    const user = User.create(userDto.email, userDto.password, userDto.firstName, userDto.lastName)

    return userRepository.merge(user)
  }

}
