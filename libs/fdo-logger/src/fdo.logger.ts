import { ConsoleLogger } from '@nestjs/common';

export class FdoLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    // Google cloud logging or other logging service
    console.error(message, stack, context);
  }
}
