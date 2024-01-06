export function overflowNotify(type) {
  console.log(`type`, type);
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
