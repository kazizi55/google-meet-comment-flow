import { injectComment } from "./injectComment";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.method) {
    case "setItem":
      chrome.storage.local.set({
        googleMeetCommentFlow: request.value,
      });
      return true;
    case "injectCommentToAllTabs":
      chrome.storage.local.get(["googleMeetCommentFlow"]).then((res) => {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            if (!tab.id) return;

            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: injectComment,
              args: [res["googleMeetCommentFlow"]],
            });
          });
        });
      });
      return true;
    default:
      console.log("no method");
      return true;
  }
});
