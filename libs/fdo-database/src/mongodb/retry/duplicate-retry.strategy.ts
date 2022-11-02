import { throwError, timer } from 'rxjs';

export function duplicateRetryStrategy(error: any) {
  if (error?.code === 11000) {
    return timer(0);
  }
  return throwError(() => error);
}
