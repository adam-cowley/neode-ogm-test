import { DynamicModule, Module, Provider } from '@nestjs/common';
import Neode, { fromEnv } from 'neodegm';
import { OgmService } from './ogm.service';

@Module({
    providers: [OgmService]
})
export class OgmModule {
    static fromEnv(): DynamicModule {
        require('dotenv').config()

        return {
            module: OgmModule,
            global: true,

            providers: [
                {
                    provide: Neode,
                    useFactory: (): Neode => fromEnv()
                } as Provider<any>,
            ],
            exports: [
                Neode,
            ]
        }
    }
}
