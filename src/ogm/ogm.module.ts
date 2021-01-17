import { DynamicModule, Module, Provider } from '@nestjs/common';
import Neode, { fromEnv } from 'neodegm';
import { createNeodeProviders } from './neode.providers';
@Module({
    providers: []
})
export class OgmModule {
    static fromEnv(entities: Function[] = [], database?: string): DynamicModule {
        require('dotenv').config()

        const providers = createNeodeProviders(entities, database)

        return {
            module: OgmModule,
            global: true,

            providers: [
                {
                    provide: Neode,
                    useFactory: (): Neode => fromEnv()
                } as Provider<any>,

                ...providers,
            ],
            exports: [
                Neode,
                ...providers,
            ]
        }
    }
}
