import { printLine } from './modules/print';
import secrets from 'secrets';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const { serverUrl } = secrets;

function extractSheetIdFromUrl(url) {
  const match = url.match(/\/spreadsheets\/d\/([^/]+)/);

  return match ? match[1] : null;
}

const preEls = document.querySelectorAll('pre');
[...preEls].forEach((preEl) => {
  const root = document.createElement('div');
  root.style.position = 'relative';
  const shadowRoot = root.attachShadow({ mode: 'open' });

  const url = chrome.runtime.getURL('./content.styles.css');
  shadowRoot.innerHTML = `<link rel="stylesheet" href=${url} />`;
  // обворачиваем в шадов дом елемент (чтобы стили сайта не применялись к нашей кнопки)
  const copyBtn = document.createElement('button');
  copyBtn.innerText = 'Copy';
  copyBtn.type = 'button';
  copyBtn.className = 'copy';

  shadowRoot.prepend(copyBtn);

  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.type = 'button';
  saveBtn.className = 'save';

  shadowRoot.prepend(saveBtn);

  preEl.prepend(root);

  // preEl.prepend(copyBtn);
  // если без шадов дома и нам подойдут стили сайта

  const codeEl = preEl.querySelector('code');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeEl.innerText);
      notify('copy');
    } catch (error) {
      console.log(error);
    }
  });
  const titleEl = document.querySelector('.question-hyperlink');

  saveBtn.addEventListener('click', async () => {
    try {
      const code = codeEl.innerText;
      const title = titleEl.innerText;
      const link = window.location.href;
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}.${
        currentDate.getMonth() + 1
      }.${currentDate.getFullYear()}`;

      let spreadsheetId;

      chrome.storage.local.get(['google-sheets-url'], async (result) => {
        console.log(result['google-sheets-url'], `result`);
        spreadsheetId = await result['google-sheets-url'];
      });

      console.log(spreadsheetId, `spreadsheetId`);

      const values = [title, code, link, formattedDate];

      const requestBody = {
        id: spreadsheetId,
        values,
      };

      const response = await fetch(`${serverUrl}/google-sheets/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      notify('copy');
    } catch (error) {
      console.log(error);
    }
  });
});

function notify(type) {
  const scriptEl = document.createElement('script');
  let url;
  switch (type) {
    case 'save':
      url = chrome.runtime.getURL('execute_save.js');
      break;

    default:
      url = chrome.runtime.getURL('execute_copy.js');
      break;
  }

  scriptEl.src = url;
  document.body.appendChild(scriptEl);
  //  Добавляем скрипт в дом дерево

  scriptEl.onload = () => {
    scriptEl.remove();
  };
  // как загрузился убираем его (чистим)
}

function getAllCode() {
  return [...preEls]
    .map((pr) => {
      return pr.querySelector('code').innerText;
    })
    .join('');
}

chrome.runtime.onMessage.addListener(async (request, info, sendResponse) => {
  console.log(`sendResponse`, sendResponse);
  if (request.action === 'copy all') {
    const allCode = getAllCode();
    sendResponse(allCode);
    navigator.clipboard.writeText(allCode).then(() => {
      notify();
      // sendResponse(allCode);
    });
    return true;
    // если асинхроные действия возвращаем тру
  }
});
