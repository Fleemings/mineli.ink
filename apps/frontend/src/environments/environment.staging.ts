// Used for the Cloudflare Pages "dev" deployment (built with `--configuration staging`),
// talking to the DigitalOcean App Platform dev backend. Replace the placeholder host
// below with that app's real URL (or, better, a stable custom subdomain such as
// https://api-dev.mineli.ink mapped to it in DigitalOcean App Platform).
export const environment = {
  production: false,
  apiUrl: 'https://api-dev.mineli.ink/api',
  openApiUrl: 'https://api-dev.mineli.ink/api/openapi.json',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableMockData: false,
  // Same placeholder-only behavior as production (see environment.production.ts).
  maintenanceMode: true,
  social: {
    instagramUrl: 'https://www.instagram.com/mineli.ink/'
  }
};
