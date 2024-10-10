chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendText",
    title: "Enviar texto",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendText") {
    sendTextToExtension(info.selectionText);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "send-text") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getSelectedText"}, (response) => {
        if (response && response.text) {
          sendTextToExtension(response.text);
        }
      });
    });
  }
});

function sendTextToExtension(text) {
  // Aquí implementaremos la lógica para enviar el texto a través de WebSocket
  console.log("Texto a enviar:", text);
}