import { throwError, timer } from 'rxjs';
import { TechnicalException } from '@lib/fdo-domain';

export function duplicateRetryStrategy(error: any) {
  if (error?.code === 11000) {
    return timer(0);
  }
  return throwError(() => new TechnicalException(error?.message));
}
