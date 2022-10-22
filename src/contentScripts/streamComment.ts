const streamComment = () => {
  chrome.runtime.sendMessage({ method: "injectCommentToFocusedTab" });
};

chrome.storage.onChanged.addListener(streamComment);
