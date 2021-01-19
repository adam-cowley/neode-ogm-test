import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import Neode, { TransactionalService } from "neodegm";

@Injectable()
export class NeodeInterceptor implements NestInterceptor {

    constructor(private readonly neode: Neode) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()
        let transaction: TransactionalService = request.method === "GET"
            ? this.neode.openReadTransaction()
            : this.neode.openWriteTransaction()


        // Bind to Request
        context.switchToHttp().getRequest().transaction = transaction

        return next.handle()
            .pipe(
                tap(() => {
                    transaction.commit()
                }),
                catchError(e => {
                    transaction.rollback()
                    throw e
                })
            )

    }

}