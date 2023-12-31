const { google } = require("googleapis");

const createAuthorizedClient = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    return { googleSheets, client, auth };
  } catch (error) {
    throw error;
  }
};

const getGoogleSheet = async (spreadsheetId, range) => {
  try {
    const { googleSheets } = await createAuthorizedClient();

    const result = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return result.data;
  } catch (error) {
    throw error;
  }
};

const addGoogleSheet = async (spreadsheetId, range, data) => {
  try {
    const { googleSheets, auth } = await createAuthorizedClient();

    const result = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[...data]],
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getGoogleSheet, addGoogleSheet };
