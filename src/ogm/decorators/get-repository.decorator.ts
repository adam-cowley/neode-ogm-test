import { TransactionalService } from 'neodegm'
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface GetRepositoryParams {
    entity: Function;
    database?: string
}

export const GetRepository =  createParamDecorator(
    async (data: GetRepositoryParams, ctx: ExecutionContext) => {
        const { entity, database } = data

        const request = ctx.switchToHttp().getRequest();

        const tx: TransactionalService = request.transaction

        return tx.getRepository(entity, database)
    },
);