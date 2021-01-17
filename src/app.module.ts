import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Neode from 'neodegm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user/user.entity';
import { OgmModule } from './ogm/ogm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OgmModule.fromEnv([ User ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
