import { TransactionalService } from 'neodegm'
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface FindEntityParams {
  entity: Function;
  param: string;
  // database?: string
}

export const FindEntity = createParamDecorator(
    async (data: FindEntityParams, ctx: ExecutionContext) => {
      const { entity, param } = data

      const request = ctx.switchToHttp().getRequest();
      const id = request.params[ param ]

      const tx: TransactionalService = request.transaction

      return await tx.find(entity, id)
    },
  );