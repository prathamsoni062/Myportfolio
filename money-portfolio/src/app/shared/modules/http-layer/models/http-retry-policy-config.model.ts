export class HttpRetryPolicyConfigModel {
  maxRetries: number;
  waitPeriod: number;
  retryableStatusCodes: { [key: number]: boolean };
  retriableMethods: { [key: string]: boolean };
  constructor(config: HttpRetryPolicyConfigModel) {
    this.maxRetries = 3;
    this.waitPeriod = 3000;
    this.retryableStatusCodes = { 400: true };
    this.retriableMethods = { POST: true };
    if (config) {
      this.maxRetries = config.maxRetries || 3;
      this.waitPeriod = config.waitPeriod || 3000;
      this.retryableStatusCodes = config.retryableStatusCodes;
      this.retriableMethods = config.retriableMethods || { GET: true };
    }
  }
}
