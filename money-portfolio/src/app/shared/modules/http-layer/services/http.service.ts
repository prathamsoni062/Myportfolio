import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import {
  HttpRequestExtras,
  UrlParams,
} from '../interfaces/http-extras.interface';

import RetryPolicy from './retry-policy';

import { ApiConfigModel } from '../models/api-config-model.model';

import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  createEndpointRequest(apiConfig: ApiConfigModel, params?: HttpRequestExtras) {
    if (apiConfig) {
      const mappedUrl = this.getFullEndpointUrl(
        apiConfig,
        params?.urlParameters
      );

      const optioanlHeaders = this.setOptionalHeadersAndParams(
        apiConfig,
        params?.queryParams
      );

      let serviceMethod: Observable<any>;

      if (apiConfig.shouldUseStub) {
        return this.httpClient.get(`${apiConfig.stubPath}`);
      }

      switch (apiConfig.method) {
        case 'GET':
          serviceMethod = this.get(mappedUrl, optioanlHeaders);

          break;

        case 'PUT':
          serviceMethod = this.put(
            mappedUrl,
            params?.requestBody,
            optioanlHeaders
          );

          break;

        case 'POST':
          serviceMethod = this.post(
            mappedUrl,
            params?.requestBody,
            optioanlHeaders
          );

          break;

        case 'DELETE':
          serviceMethod = this.delete(mappedUrl, optioanlHeaders);

          break;
      }

      return apiConfig.isRetryAllowed
        ? serviceMethod.pipe(RetryPolicy(apiConfig.method))
        : serviceMethod;
    }

    return throwError(() => new Error('Invalid API config'));
  } /**

   * Function to make HTTP GET request

   * @param param Accept HTTP Service parameter

   */

  private get(url: string, optionalHeaders: OptionalHeaders): Observable<any> {
    return this.httpClient.get(url, optionalHeaders);
  } /**

   * Function to make HTTP POST request

   * @param param - Accept HTTP Service parameter

   */

  private post(
    url: string,
    requestBody: any,
    optionalHeaders: OptionalHeaders
  ): Observable<any> {
    //this.logger.entering(`entering HTTPService.post ${JSON.stringify(url)}`);

    return this.httpClient.post(url, requestBody, optionalHeaders);
  } /**

   * Function to make HTTP PUT request

   * @param param - Accept HTTP Service Parameter

   */

  private put(
    url: string,
    requestBody: any,
    optionalHeaders: OptionalHeaders
  ): Observable<any> {
    return this.httpClient.put(url, requestBody, optionalHeaders);
  } /**

   * Function to make HTTP DELETE request

   * @param param Accept HTTP Service parameter

   */

  private delete(
    url: string,
    optionalHeaders: OptionalHeaders
  ): Observable<any> {
    return this.httpClient.delete(url, optionalHeaders);
  }

  private getFullEndpointUrl(
    apiConfig: ApiConfigModel,
    params?: UrlParams
  ): string {
    const urlWithParams = this.setUrlParams(apiConfig.pathTemplate, params);

    return `${environment.apiEndPoints[apiConfig.module]}/${urlWithParams}`;
  } /**

   * Function replaces placeholders from URL and returns the updated url

   * @param url - URL to be parsed

   * @param parameters - parameters, placeholders to be replaced with

   */

  private setUrlParams(url: string, parameters?: UrlParams): string {
    if (!parameters) {
      return url;
    }

    let parsedUrl = url;

    for (const key in parameters) {
      if (Object.prototype.hasOwnProperty.call(parameters, key)) {
        parsedUrl = parsedUrl.replace(`{${key}}`, `${parameters[key]}`);
      }
    }

    return parsedUrl;
  }

  private setOptionalHeadersAndParams(
    apiConfig: ApiConfigModel,
    params?: UrlParams
  ): OptionalHeaders {
    return { withCredentials: apiConfig.useHttpCookies, params };
  }
}

type OptionalHeaders = {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
};
