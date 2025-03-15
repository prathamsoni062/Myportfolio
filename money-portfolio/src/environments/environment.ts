export const environment = {
    production: false,
    msalConfig: {
      redirectUri: 'http://localhost:4000/app-home',
      clientId: '966ea833-9bfb-4592-86b4-81ab5134ee0c',
      tenantId: 'ae8337a7-1228-4822-822a-a3c3e7d7eeca',
      scopes: ['api://55776430-4ced-48fe-8215-20687ca9511f/Data.Read'],
      signOutUrl: 'http://localhost:4000/app-home',
    },
    'server-version': '1.0.0',
    'client-version': '1.0.0',
    logOnServer: true,
    logOnConsole: true,
    apiEndPoints: {
      profile:
        'https://app-dev-launchpad-service-gaa9gqcsgedpc8er.westus-01.azurewebsites.net',
      logger:
        'https://app-dev-launchpad-service-gaa9gqcsgedpc8er.westus-01.azurewebsites.net',
      telemetry:
        'https://app-dev-launchpad-service-gaa9gqcsgedpc8er.westus-01.azurewebsites.net',
      featureFlag:
        'https://app-dev-launchpad-service-gaa9gqcsgedpc8er.westus-01.azurewebsites.net',
      faqModule:
        'https://app-dev-launchpad-service-gaa9gqcsgedpc8er.westus-01.azurewebsites.net',
      // base: 'http://localhost:5001/api',
      base: 'https://portfolio-backend-171s.onrender.com/api',
    },
    appInsights: {
      instrumentationKey: '',
    },
    app_identifier_strg_str: 'uuid version 4',
  };
  
  export type Environment = typeof environment;
  