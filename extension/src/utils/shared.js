import { notyf } from '../pages/Content';
import secrets from 'secrets';

const { serverUrl } = secrets;

function getSpreadsheetUrl() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['google-sheets-url'], (result) => {
      const spreadsheetId = result['google-sheets-url'];
      if (spreadsheetId) {
        console.log(`spreadsheetId in fn`, spreadsheetId);
        resolve(spreadsheetId);
      } else {
        reject(new Error('Spreadsheet ID not found in storage'));
      }
    });
  });
}
function extractSheetIdFromUrl(url) {
  const match = url.match(/\/spreadsheets\/d\/([^/]+)/);

  return match ? match[1] : null;
}

export function notify(type, msg) {
  if (type === 'error') {
    notyf.error({
      duration: 3000,
      dismissible: true,
      message: msg,
      ripple: false,
    });
  } else {
    notyf.success({
      duration: 3000,
      dismissible: true,
      message: msg,
      ripple: false,
    });
  }
}

export async function saveDataToGoogleSheets(title, code, link, formattedDate) {
  try {
    let spreadsheetId = await getSpreadsheetUrl();
    console.log(
      `extractSheetIdFromUrl(spreadsheetId)`,
      extractSheetIdFromUrl(spreadsheetId)
    );
    const values = [title, code, link, formattedDate];

    const requestBody = {
      id: extractSheetIdFromUrl(spreadsheetId),
      values,
    };

    const response = await fetch(`${serverUrl}/google-sheets/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok || !response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    notify('error', error.message);
    throw error;
  }
}
