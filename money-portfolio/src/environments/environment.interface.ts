export interface Environment {
    production: boolean;
    apiEndPoints: Record<string, string>;
    msalConfig: Record<string, string>;
    // server-version: string;
    // logOnServer: boolean;
    // logOnConsole: boolean;
appInsights : Record<string, string>;
    // Add other properties as needed
  }