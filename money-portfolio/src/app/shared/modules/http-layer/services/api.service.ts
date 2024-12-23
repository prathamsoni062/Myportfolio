import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { of, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { HttpRequestExtras } from '../interfaces/http-extras.interface';

import { ApiConfigModel } from '../models/api-config-model.model';

import { HttpService } from './http.service';

// import { LoaderService } from '../../../services/loader-service/loader.service';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpService: HttpService,

    // private loaderService: LoaderService,

    private snackBar: SnackbarService
  ) {}

  invoke(apiConfig: ApiConfigModel, params?: HttpRequestExtras) {
    // if (apiConfig.isBlocking) {
    // this.loaderService.toggleLoader(true);
    // }

    return this.httpService.createEndpointRequest(apiConfig, params).pipe(
      map((responseData: any) => {
        // if (apiConfig.isBlocking) {
        // this.loaderService.toggleLoader(false);
        // }
        console.log('API Response:', responseData);
        if (responseData.errorDetails) {
          throw responseData.errorDetails;
        } else {
          if (
            !apiConfig.handleSuccessInComponent &&
            (apiConfig.method == 'POST' || apiConfig.method == 'PUT') &&
            !apiConfig.isSilent
          ) {
            // this.snackBar.triggerSnackBar(
            //   'portal.genericMessages.successAlert'
            // );
          }

          return responseData;
        }
      }),

      catchError((error: HttpErrorResponse) => {
        // if (apiConfig.isBlocking) {
        // this.loaderService.toggleLoader(false);
        // } // if (!apiConfig.handleErrorInComponent) { //     this.snackBar.triggerSnackBar( //         'portal.genericMessages.somethingWentWrong' //     ); // }

        if (error.status === HttpStatusCode.InternalServerError) {
          return of(error.error.response);
        }

        return throwError(() => new Error(''));
      })
    );
  }
}
