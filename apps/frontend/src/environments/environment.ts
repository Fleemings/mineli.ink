export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  openApiUrl: 'http://localhost:3000/api/openapi.json',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableMockData: false,
  // When true, the app renders only the "temporary building" placeholder page
  // (see app.html/app.ts) instead of the full site. Kept false here so local
  // development continues to exercise the full app.
  maintenanceMode: false,
  social: {
    instagramUrl: 'https://www.instagram.com/mineli.ink/'
  }
};
