import { overflowNotify } from '../notify/overflowNotify';
import { saveDataToGoogleSheets } from '../../../utils/shared';

export const handler = (preEls) => {
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
};
