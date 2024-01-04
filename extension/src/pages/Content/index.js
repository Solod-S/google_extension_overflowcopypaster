import { saveDataToGoogleSheets } from '../../utils/shared';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

export let notyf = new Notyf();

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

  const codeEl = preEl.querySelector('code');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeEl.innerText);
      overflowNotify('copy');
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

      await saveDataToGoogleSheets(title, code, link, formattedDate);

      overflowNotify('save');
    } catch (error) {
      console.log(error);
    }
  });
});

function overflowNotify(type) {
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
      overflowNotify();
      // sendResponse(allCode);
    });
    return true;
    // если асинхроные действия возвращаем тру
  }
});
