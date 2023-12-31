const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  // res.render("index");
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1vmH_w51HmnMhx1OW4suFWrO3CT21jgqorKNZ1zl9LE8";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    // range: "Sheet1",
    // range: "1",
  });
  console.log(getRows.data);
});

app.post("/", async (req, res) => {
  const { request, name } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1qBvrpEJugsnto-LT5VaazXCzKfVHPubrDbLO4baVaV8";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[request, name]],
    },
  });

  res.send("Successfully submitted! Thank you!");
});

app.delete("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1qBvrpEJugsnto-LT5VaazXCzKfVHPubrDbLO4baVaV8";

  // Specify the sheetId and the start index and end index of the column you want to delete
  const sheetId = 0; // assuming it's the first sheet, change it accordingly
  const startIndex = 1; // assuming you want to delete the second column, change it accordingly
  const endIndex = 2; // assuming you want to delete up to the second column, change it accordingly

  // Build the request to delete the specified range of columns
  const deleteRequest = {
    deleteDimension: {
      range: {
        sheetId,
        dimension: "COLUMNS",
        startIndex,
        endIndex,
      },
    },
  };

  // Execute the batchUpdate request
  await googleSheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [deleteRequest],
    },
  });

  res.send("Column deleted successfully!");
});

app.listen(1337, (req, res) => console.log("running on 1337"));
