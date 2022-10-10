const streamComment = () => {
  chrome.runtime.sendMessage({ method: "injectCommentToAllTabs" });
};

chrome.storage.onChanged.addListener(streamComment);
