import { injectComment } from "./injectComment";

const StorageKeys = {
  Comment: "comment",
  Color: "color",
  FontSize: "fontSize",
  IsEnabledStreaming: "isEnabledStreaming",
} as const;

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.method) {
    case "setComment":
      chrome.storage.local.set({
        comment: request.value,
      });
      return true;
    case "deleteComment":
      chrome.storage.local.remove([StorageKeys.Comment]);
      return true;
    case "injectCommentToFocusedTab":
      chrome.storage.local.get([StorageKeys.Comment]).then((res) => {
        chrome.tabs.getCurrent((tab) => {
          if (!tab?.id || !res[StorageKeys.Comment]) return;

          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: injectComment,
            args: [res[StorageKeys.Comment]],
          });
        });
      });
      return true;
          });
        });
      });
      return true;
    default:
      console.log("no method");
      return true;
  }
});
