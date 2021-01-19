import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
;
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user/user.entity';
import { NeodeModule } from './neode/neode.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NeodeModule.fromEnv([ User ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
