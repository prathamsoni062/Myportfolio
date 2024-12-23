import { HttpRetryPolicyConfigModel } from '../models/http-retry-policy-config.model';

const RetryConfig = new HttpRetryPolicyConfigModel({
  maxRetries: 3,
  waitPeriod: 3000,
  retryableStatusCodes: { 400: true, 401: true },
  retriableMethods: { POST: true },
});

export default RetryConfig;
