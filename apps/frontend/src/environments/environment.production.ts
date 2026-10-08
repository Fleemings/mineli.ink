export const environment = {
  production: true,
  apiUrl: 'https://api.minelisilva.com/api',
  openApiUrl: 'https://api.minelisilva.com/api/openapi.json',
  apiTimeout: 60000,
  logLevel: 'warn',
  enableMockData: false,
  // Content for the full site isn't ready yet - ship only the "temporary building"
  // placeholder page. Flip to false once the real content/flow is ready to go live,
  // no code removal needed.
  maintenanceMode: true,
  social: {
    instagramUrl: 'https://www.instagram.com/mineli.ink/'
  }
};
