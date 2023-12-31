const preEls = document.querySelectorAll("pre");
[...preEls].forEach(preEl => {
  const root = document.createElement("div");
  root.style.position = "relative";
  const shadowRoot = root.attachShadow({ mode: "open" });

  const url = chrome.runtime.getURL("/css/content-script.css");
  shadowRoot.innerHTML = `<link rel="stylesheet" href=${url} />`;
  // обворачиваем в шадов дом елемент (чтобы стили сайта не применялись к нашей кнопки)
  const copyBtn = document.createElement("button");
  copyBtn.innerText = "Copy";
  copyBtn.type = "button";
  copyBtn.className = "copy";

  shadowRoot.prepend(copyBtn);

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
  saveBtn.type = "button";
  saveBtn.className = "save";

  shadowRoot.prepend(saveBtn);

  preEl.prepend(root);

  // preEl.prepend(copyBtn);
  // если без шадов дома и нам подойдут стили сайта

  const codeEl = preEl.querySelector("code");

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeEl.innerText);
      notify("copy");
    } catch (error) {
      console.log(error);
    }
  });
  const titleEl = document.querySelector(".question-hyperlink");

  saveBtn.addEventListener("click", async () => {
    try {
      const code = codeEl.innerText;
      const title = titleEl.innerText;
      const link = window.location.href;
      // console.log({ code, title, link });
      notify("save");
    } catch (error) {
      console.log(error);
    }
  });
});

function notify(type) {
  const scriptEl = document.createElement("script");
  let url;
  switch (type) {
    case "save":
      url = chrome.runtime.getURL("/js/notify/execute_save.js");
      break;

    default:
      url = chrome.runtime.getURL("/js/notify/execute_copy.js");
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
    .map(pr => {
      return pr.querySelector("code").innerText;
    })
    .join("");
}

chrome.runtime.onMessage.addListener(async (request, info, sendResponse) => {
  console.log(`sendResponse`, sendResponse);
  if (request.action === "copy all") {
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
