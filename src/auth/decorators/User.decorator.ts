import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User as UserEntity } from "../user/user.entity";

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserEntity => {
      const request: Request = ctx.switchToHttp().getRequest();

      console.log(request.method)

      return (request as Record<string, any>).user;
    },
  );