let prevThread: Node;

const SELECTOR_BASE =
  "#ow3 > div.T4LgNb > div > div[jsmodel='BA3Upd d5LS6d'] > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.z38b6";

const SELECTOR_OBJ = {
  thread: SELECTOR_BASE,
  message: `${SELECTOR_BASE}> div > div.Zmm6We > div`,
} as const;

const CLASS_OBJ = {
  isLoading: "gYckH",
} as const;

const observer = new MutationObserver(async () => {
  try {
    const isEnabledStreaming = await chrome.runtime.sendMessage({
      method: "getIsEnabledStreaming",
    });

    if (!isEnabledStreaming) return;

    const thread = document.querySelector(SELECTOR_OBJ.thread);

    if (!thread || thread.isEqualNode(prevThread)) return;

    prevThread = thread.cloneNode(true);

    const messageNodes = thread.querySelectorAll(SELECTOR_OBJ.message);

    if (messageNodes.length === 0) return;

    const messageNode = messageNodes[messageNodes.length - 1];

    if (messageNode.classList.contains(CLASS_OBJ.isLoading)) return;

    const message = messageNode.innerHTML;

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
    subtree: true,
    childList: true,
  })
);
