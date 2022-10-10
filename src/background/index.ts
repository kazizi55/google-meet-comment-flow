chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.method) {
    case "setItem":
      chrome.storage.local.set({
        googleMeetCommentFlow: request.value,
      });
      return true;
    default:
      console.log("no method");
      return true;
  }
});
