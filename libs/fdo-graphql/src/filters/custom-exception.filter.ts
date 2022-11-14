import { TechnicalException, UseCaseException } from '@lib/fdo-domain';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Catch(TechnicalException, UseCaseException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  public catch(
    exception: TechnicalException | UseCaseException,
    host: ArgumentsHost,
  ) {
    const ctx = GqlArgumentsHost.create(host);
    const info = ctx.getInfo<GraphQLResolveInfo>();
    const rawArgs = JSON.stringify(ctx.getArgs());
    this.log(exception, info, rawArgs);

    return this.transformException(exception);
  }

  private transformException(exception: TechnicalException | UseCaseException) {
    const status =
      exception instanceof TechnicalException
        ? HttpStatus.INTERNAL_SERVER_ERROR
        : HttpStatus.BAD_REQUEST;
    return new HttpException(
      {
        message: exception.message,
      },
      status,
    );
  }

  private log(
    exception: TechnicalException | UseCaseException,
    info: GraphQLResolveInfo,
    rawArgs: string,
  ) {
    const operation = info.operation.operation.toUpperCase();
    this.logger.error(
      `${operation} ${info.fieldName} [Args: ${rawArgs}] ${exception.message} ${exception.stack}`,
    );
  }
}
