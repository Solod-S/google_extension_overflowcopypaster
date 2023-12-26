const preEls = document.querySelectorAll("pre");
[...preEls].forEach(preEl => {
  const root = document.createElement("div");
  root.style.position = "relative";
  const shadowRoot = root.attachShadow({ mode: "open" });

  const url = chrome.runtime.getURL("/css/content-script.css");
  shadowRoot.innerHTML = `<link rel="stylesheet" href=${url} />`;
  // обворачиваем в шадов дом елемент (чтобы стили сайта не применялись к нашей кнопки)
  const btn = document.createElement("button");
  btn.innerText = "Copy";
  btn.type = "button";

  shadowRoot.prepend(btn);
  preEl.prepend(root);

  // preEl.prepend(btn);
  // если без шадов дома и нам подойдут стили сайта

  const codeEl = preEl.querySelector("code");

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeEl.innerText);
      notify();
    } catch (error) {
      console.log(error);
    }
  });
});

function notify() {
  const scriptEl = document.createElement("script");
  const url = chrome.runtime.getURL("/js/execute.js");
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
