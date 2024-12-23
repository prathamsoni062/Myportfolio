/**
 * 2023 Infosys Limited, Bangalore, India. All Rights Reserved.
 * Version: 1
 *
 * Except for any free or open source software components
 * embedded in this Infosys proprietary software program,
 * this Program is protected by copyright laws, international treaties
 * and other pending or existing intellectual property rights in India,
 * the United States and other countries. Except as expressly permitted,
 * any unauthorized reproduction, storage, transmission in any form or
 * by any means (including without limitation electronic, mechanical,
 * printing, photocopying, recording or otherwise), or any distribution
 * of this Program, or any portion of it, may result in severe civil and criminal
 * penalties, and will be prosecuted to the maximum extent possible under the law.
 */
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap } from 'rxjs/operators';
import RetryConfig from '../config/retry-policy.config';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Retry policy enables retry of the failed http request. Based on configuration -
 *  -  Number of max retries are defined
 *  - Wait period between each retries is defined. The wait period is exponentially increased
 *  - Retries are done only for specific error code
 *  - Retries are done for specific HTTP verbs
 */

const RetryPolicy = (httpMethod: string) => {
  return (source: Observable<HttpErrorResponse>) => {
    return source.pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error, index) => {
            if (
              RetryConfig.retryableStatusCodes[error.status] &&
              RetryConfig.retriableMethods[httpMethod] &&
              index < RetryConfig.maxRetries
            ) {
              return timer(RetryConfig.waitPeriod);
            } else {
              return throwError(() => error);
            }
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  };
};

export default RetryPolicy;
