import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common"
import { tap, Observable } from "rxjs"

export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP')
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest()
        const { method, url, query, body } = req
        const now = Date.now()
        this.logger.log(`-> [${method}] ${url} query=${JSON.stringify(query)}`)
        return next.handle().pipe(
            tap(() => {
                if (body) this.logger.log(`<- ${method} ${url} - ${Date.now() - now}ms body=${JSON.stringify(body)}`)
            })
        )
    }
}