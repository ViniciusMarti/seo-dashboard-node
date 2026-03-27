import { google } from 'googleapis';
import { analyticsdata_v1beta } from 'googleapis/build/src/apis/analyticsdata/v1beta';
import { searchconsole_v1 } from 'googleapis/build/src/apis/searchconsole/v1';

export class GoogleApiService {
  private auth;

  constructor(accessToken?: string, refreshToken?: string) {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_PATH) {
      this.auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_PATH,
        scopes: [
          'https://www.googleapis.com/auth/analytics.readonly',
          'https://www.googleapis.com/auth/webmasters.readonly',
        ],
      });
    } else {
      this.auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      this.auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }

  async getGA4Data(propertyId: string, startDate: string, endDate: string) {
    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: this.auth });
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'engagementRate' },
          { name: 'totalRevenue' },
        ],
        dimensions: [{ name: 'date' }],
      },
    });
    return response.data;
  }

  async getGSCData(siteUrl: string, startDate: string, endDate: string) {
    const searchConsole = google.searchconsole({ version: 'v1', auth: this.auth });
    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date', 'query', 'page'],
        rowLimit: 1000,
      },
    });
    return response.data;
  }
}
