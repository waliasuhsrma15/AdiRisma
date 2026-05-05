import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getSheetsInstance() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export async function appendRSVP(data: any) {
  const sheets = await getSheetsInstance();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'RSVP!A:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.attendance,
        data.guestCount,
        data.message,
        data.invitedAs
      ]],
    },
  });
}

export async function getRSVPs() {
  const sheets = await getSheetsInstance();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'RSVP!A:F',
  });

  const rows = response.data.values || [];
  const headers = rows.shift();

  return rows.map(row => ({
    timestamp: row[0],
    name: row[1],
    attendance: row[2],
    guestCount: row[3],
    message: row[4],
    invitedAs: row[5]
  })).reverse();
}

export async function getBroadcastList() {
  const sheets = await getSheetsInstance();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Broadcast!A:C',
  });

  const rows = response.data.values || [];
  rows.shift(); // headers

  return rows.map(row => ({
    name: row[0],
    phone: row[1],
    status: row[2]
  }));
}
