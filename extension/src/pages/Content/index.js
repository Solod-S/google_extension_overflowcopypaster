import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { handler } from './modules/handler';
import { overflowNotify } from './notify/overflowNotify';
import faq from '../../assets/img/faq.jpg';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

export let notyf = new Notyf();
const preEls = document.querySelectorAll('pre');

handler(preEls);

function getAllCode() {
  return [...preEls]
    .map((pr) => {
      return pr.querySelector('code').innerText;
    })
    .join('');
}

chrome.runtime.onMessage.addListener(async (request, info, sendResponse) => {
  console.log(`request.action`, request.action);

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
