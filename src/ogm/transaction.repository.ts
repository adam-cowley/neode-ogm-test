import { Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { REQUEST_CONTEXT_ID } from "@nestjs/core/router/request/request-constants";
import Neode, { Repository } from "neodegm";

@Injectable({
    scope: Scope.REQUEST
})
export class TransactionRepository<Entity> extends Repository<Entity> {

    constructor(
        neode: Neode,
        entity: Entity,
    ) {
        super(neode, entity)
    }

}