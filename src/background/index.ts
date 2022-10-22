import { injectComment } from "./injectComment";

const TARGET_KEY = "googleMeetCommentFlow";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.method) {
    case "setItem":
      chrome.storage.local.set({
        googleMeetCommentFlow: request.value,
      });
      return true;
    case "deleteItem":
      chrome.storage.local.remove([TARGET_KEY]);
      return true;
    case "injectCommentToFocusedTab":
      const queryOptions = { active: true, lastFocusedWindow: true };

      chrome.storage.local.get([TARGET_KEY]).then((res) => {
        chrome.tabs.query(queryOptions, (tabs) => {
          if (!tabs[0]?.id || !res[TARGET_KEY]) return;

          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: injectComment,
            args: [res[TARGET_KEY]],
          });
        });
      });
      return true;
    default:
      console.log("no method");
      return true;
  }
});
