console.log('This is the background page.');
console.log('Put the background scripts here.');

// chrome.commands.onCommand.addListener(command => {
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     const currentTab = tabs[0];
//     if (command === "copy-all") {
//       chrome.tabs.sendMessage(currentTab.id, { action: "copy-all" });
//     }
//   });
// });

async function getCurrentTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}

chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy-all') {
    getCurrentTabId().then((tabId) => {
      console.log(tabId, `tabId`);
      chrome.tabs.sendMessage(tabId, { action: 'copy all' }, (code) => {
        console.log(code);
      });
    });
  }
  // отправляем в контент скрипт
});

chrome.commands.onCommand.addListener((command) => {
  try {
    if (command === 'copy-all') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab) {
          chrome.tabs.sendMessage(currentTab.id, { action: 'copy-all' });
        }
      });
    }
  } catch (error) {
    console.error('Ошибка в фоновом скрипте:', error);
  }
});
