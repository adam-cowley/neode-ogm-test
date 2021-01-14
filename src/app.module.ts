import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OgmModule } from './ogm/ogm.module';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
    OgmModule.fromEnv(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {

  // TODO: install schema once it's built
  onModuleInit() {}

}
