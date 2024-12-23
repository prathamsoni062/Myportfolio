import { environment } from '../../../../../environments/environment';

export class ApiConfigModel {
  module: keyof typeof environment.apiEndPoints; // Restrict module to valid keys
  pathTemplate: string;
  method: ApiMethod;
  isRetryAllowed?: boolean;
  useHttpCookies?: boolean;
  shouldUseStub? = false;
  stubPath? = '';
  handleSuccessInComponent?: boolean; // Add this property
  handleErrorInComponent?: boolean;  // Add this property
  isBlocking?: boolean;             // Add this property
  isSilent?: boolean;  

  constructor(config: ApiConfigModel) {
    if (config.module in environment.apiEndPoints) {
      this.module = config.module;
      this.pathTemplate = config.pathTemplate;
      this.method = config.method;
      this.isRetryAllowed = config.isRetryAllowed || false;
      this.useHttpCookies = config.useHttpCookies || false;
      this.shouldUseStub = config.shouldUseStub || false;
      this.stubPath = config.stubPath || '';
    } else {
      throw new Error(`Invalid module name: ${config.module}`);
    }
  }
}

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
