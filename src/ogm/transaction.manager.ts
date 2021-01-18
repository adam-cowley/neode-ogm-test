import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import Neode, { Repository } from "neodegm";
import { Transaction } from "nest-neo4j/dist";
import { getRepository } from "./neode.providers";

@Injectable({
    scope: Scope.REQUEST
})
export class TransactionManager {

    transactions: Map<Request, Transaction> = new Map()


    constructor(
        private readonly neode: Neode
    ) {}

    getRepository<Entity extends Function>(entity: Entity, database?: string) {
        return getRepository(this.neode, entity, database)
    }

    setTransactionForRequest(request: Request, transaction: Transaction) {
        this.transactions.set(request, transaction)
    }

    getTransactionForRequest(request: Request) {
        if ( !this.transactions.has(request) ) {

        }

        const tx = this.transactions.get(request)

    }


}