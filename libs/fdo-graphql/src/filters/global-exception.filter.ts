import { TechnicalException } from '@lib/fdo-domain';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { GraphQLResolveInfo, GraphQLError } from 'graphql';
import { Error } from 'mongoose';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: Error, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);
    const info = ctx.getInfo<GraphQLResolveInfo>();
    const rawArgs = JSON.stringify(ctx.getArgs());
    this.log(exception, info, rawArgs);

    return this.transformException(exception);
  }

  private transformException(exception: Error) {
    if (exception instanceof GraphQLError) {
      return exception;
    }

    return new TechnicalException(exception.message);
  }

  private log(exception: Error, info: GraphQLResolveInfo, rawArgs: string) {
    const operation = info.operation.operation.toUpperCase();
    this.logger.error(
      `${operation} ${info.fieldName} [Args: ${rawArgs}] ${exception.message}`,
    );
  }
}
