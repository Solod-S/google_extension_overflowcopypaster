![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with Google Scripting API](https://img.shields.io/badge/Runs%20with%20Chrome_Scripting_API-000.svg?style=flat-square&logo=Google&labelColor=DF3A2A&logoColor=E8AF01)](https://developer.chrome.com/docs/extensions/reference/api/scripting)
[![runs with reactnative](https://img.shields.io/badge/Runs%20with%20React-000.svg?style=flat-square&logo=React&labelColor=f3f3f3&logoColor=61DAFB)](https://uk.legacy.reactjs.org/)
[![runs with nodeJs](https://img.shields.io/badge/Runs%20with%20Node.Js-000.svg?style=flat-square&logo=nodedotjs&labelColor=f3f3f3&logoColor=#3C823B)](https://nodejs.org/ru)
[![runs with express](https://img.shields.io/badge/Runs%20with%20Express-000.svg?style=flat-square&logo=Express&labelColor=f3f3f3&logoColor=7D7D7D)](https://expressjs.com/ru/)
[![runs with google-spreadsheet](https://img.shields.io/badge/Runs%20with%20Google_Spreadsheet-000.svg?style=flat-square&logo=googlesheets&labelColor=f3f3f3&logoColor=#34A853)](https://www.npmjs.com/package/googleapis)

![Stackoverflow saver](./redmi_assets/poster.jpg)

# Stackoverflow saver

**_Built using Google Chrome Scripting API, NodeJs, Express & Google Spreedsheets_**.

This application is designed to help you efficiently save code snippets,
titles and links from Stack Overflow directly to your Google Sheets.

## Features and Fuctionality

![Stackoverflow saver](./redmi_assets/Stackoverflow-Copypaster.gif)

- Add copy button to DOM elements (copy code to clipboard)
- Add save button to DOM elements (save code, title link and date to Google Sheets)

## Load extension to chrome

1. Go to `chrome://extensions/` and click Load Unpacked
2. Load `build` folder

## Start server

1. Go to `extension` folder
2. Add your credentials.json (Google Spreedsheets Credentials)
3. Run start command

```
npx nodemon server.js
```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
