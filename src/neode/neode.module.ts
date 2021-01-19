import { DynamicModule, Module, Provider } from '@nestjs/common';
import Neode, { fromEnv } from 'neodegm';
import { NeodeService } from './neode.service';
@Module({
    providers: [NeodeService]
})
export class NeodeModule {
    static fromEnv(entities: Function[] = [], database?: string): DynamicModule {
        require('dotenv').config()

        // const providers = createNeodeProviders(entities, database)

        return {
            module: NeodeModule,
            global: true,

            providers: [
                {
                    provide: Neode,
                    useFactory: (): Neode => fromEnv()
                } as Provider<any>,

                // ...providers,
            ],
            exports: [
                Neode,
                NeodeService,
                // ...providers,
            ]
        }
    }
}
