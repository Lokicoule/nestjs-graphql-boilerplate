import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const COLOR_RED = '\x1b[31m';
const COLOR_GREEN = '\x1b[32m';
const COLOR_YELLOW = '\x1b[33m';
const COLOR_RESET = '\x1b[0m';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo<GraphQLResolveInfo>();
    const rawArgs = JSON.stringify(ctx.getArgs());
    const operation = info.operation.operation.toUpperCase();
    const before = Date.now();
    return next.handle().pipe(
      tap(() => {
        const after = Date.now();
        const duration = after - before;
        const color =
          duration > 1000
            ? COLOR_RED
            : duration > 500
            ? COLOR_YELLOW
            : COLOR_GREEN;
        this.logger.log(
          `${color}${operation} ${info.fieldName} [Args: ${rawArgs}] ${duration}ms${COLOR_RESET}`,
        );
      }),
    );
  }
}
