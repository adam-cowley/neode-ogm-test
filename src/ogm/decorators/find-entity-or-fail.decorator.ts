import { TransactionalService } from 'neodegm'
import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

interface FindEntityParams {
  entity: Function;
  param: string;
  // database?: string
}

export const FindEntityOrFail = createParamDecorator(
    async (data: FindEntityParams, ctx: ExecutionContext) => {
      const { entity, param } = data

      const request = ctx.switchToHttp().getRequest();
      const id = request.params[ param ]

      const tx: TransactionalService = request.transaction

      const output = await tx.find(entity, id)

      if ( !output )  {
        throw new NotFoundException
      }

      return output
    },
  );