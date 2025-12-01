import { google } from 'googleapis';

export const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    client_email: import.meta.env.GOOGLE_SA_EMAIL,
    private_key: import.meta.env.GOOGLE_SA_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
