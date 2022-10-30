let prevThread: Node;

const SELECTOR_OBJ = {
  thread:
    "#ow3 > div.T4LgNb > div > div:nth-child(12) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.z38b6",
  message:
    "#ow3 > div.T4LgNb > div > div:nth-child(12) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.z38b6 > div > div.Zmm6We > div",
  isLoading:
    "#ow3 > div.T4LgNb > div > div:nth-child(12) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.z38b6 > div > div.Zmm6We > div.gYckH",
} as const;

const observer = new MutationObserver(() => {
  try {
    const thread = document.querySelector(SELECTOR_OBJ.thread);

    if (
      !thread ||
      thread.isEqualNode(prevThread) ||
      thread.querySelector(SELECTOR_OBJ.isLoading)
    )
      return;

    prevThread = thread.cloneNode(true);

    const messages = thread.querySelectorAll(SELECTOR_OBJ.message);

    if (messages.length === 0) return;

    const message = messages[messages.length - 1].innerHTML;

    chrome.runtime.sendMessage({
      method: "setComment",
      value: message,
    });
  } catch (e) {
    console.error(e);
  }
});

document.addEventListener("DOMContentLoaded", () =>
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
  })
);
