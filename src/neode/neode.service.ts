import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import Neode, { Repository } from 'neodegm';
import TransactionalService from 'neodegm/dist/transaction/transactional.service';

@Injectable({ scope: Scope.REQUEST})
export class NeodeService {

    constructor(
        @Inject(REQUEST) private readonly request: any,
        private readonly neode: Neode
    ) {}

    getRepository<T extends Repository<any>>(entity: Function, database?: string): T {
        let tx: TransactionalService = this.request.transaction

        if ( !tx ) {
            console.warn(`There is no transaction set against the request, so chances are the transaction used by the \`${entity}\` repository will not be committed.  Have you added the \`NeodeInterceptor\` to your controller or request?`)
            tx = this.request.transaction = this.neode.openTransaction(database)
        }

        return tx.getRepository(entity, database) as T
    }

}
