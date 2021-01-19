import { Body, Controller, Get, Inject, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import Neode, { Repository } from 'neodegm';
import { Neo4jErrorFilter } from 'nest-neo4j/dist';
import { AppService } from './app.service';
import { AuthUser } from './auth/decorators/user.decorator';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { UserRepository } from './auth/repository/user.repository';
import { User } from './auth/user/user.entity';
import { FindEntity } from './neode/decorators/find-entity.decorator';
import { GetRepository } from './neode/decorators/get-repository.decorator';
import { NeodeInterceptor } from './neode/interceptors/neode.interceptor';
import { NeodeService } from './neode/neode.service';

@Controller()
@UsePipes(ValidationPipe)
@UseInterceptors(NeodeInterceptor)
@UseFilters(Neo4jErrorFilter)
export class AppController {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly neodeService: NeodeService
  ) {}

  @Get()
  async getHello() {
    const repo: UserRepository = this.neodeService.getRepository(User)

    console.log(repo);

    return repo.find('test')

    // return this.userRepository.find('test')
  }

  @Get('/:userId')
  async get(
    @FindEntity({ entity: User, param: 'userId' }) user: any,
  ) {
      return user
  }


  @Post('/')
  async postUser(
    @GetRepository({entity: User})
    userRepository: Repository<User>,
    @Body()
    userDto: CreateUserDto
  ) {
    // TODO: Move to service (or repo method)
    const user = User.create(userDto.email, userDto.password, userDto.firstName, userDto.lastName)

    return userRepository.save(user)
  }

}
