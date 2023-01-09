let prevThread: Node;

let prevPopup: Node;

const CHAT_SELECTOR_BASE =
  "#ow3 > div.T4LgNb > div > div[jsmodel='BA3Upd d5LS6d'] > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b";

const CHAT_SELECTOR_OBJ = {
  container: CHAT_SELECTOR_BASE,
  thread: `${CHAT_SELECTOR_BASE} > div.hWX4r > div > div.z38b6`,
  message: `${CHAT_SELECTOR_BASE} > div.hWX4r > div > div.z38b6 > div > div.Zmm6We > div`,
} as const;

const CHAT_CLASS_OBJ = {
  isLoading: "gYckH",
  isHidden: "qdulke",
} as const;

const POPUP_MESSAGE_SELECTOR =
  "#ow3 > div.T4LgNb > div > div[jsmodel='BA3Upd d5LS6d'] > div.crqnQb > div.J0M6X.nulMpf.Didmac.sOkDId > div.hEr73c.nTlZFe.P9KVBf > div.bY2KB.eISbSc > div[jsname='JDWQFb'] > button.L4MuL > div.ZuRxkd > div.cOEZgf.XkylE > div.LpG93b.xtO4Tc";

const extractMessageFromPopup = (popup: Element | null): string | undefined => {
  if (!popup || popup.isEqualNode(prevPopup)) return;
  prevPopup = popup.cloneNode(true);

  return popup.innerHTML;
};

const extractMessageFromThread = (
  thread: Element | null
): string | undefined => {
  if (!thread || thread.isEqualNode(prevThread)) return;

  prevThread = thread.cloneNode(true);

  const messageNodes = thread.querySelectorAll(CHAT_SELECTOR_OBJ.message);

  if (messageNodes.length === 0) return;

  const messageNode = messageNodes[messageNodes.length - 1];

  if (messageNode.classList.contains(CHAT_CLASS_OBJ.isLoading)) return;

  return messageNode.innerHTML;
};

const observer = new MutationObserver(async () => {
  try {
    const isEnabledStreaming = await chrome.runtime.sendMessage({
      method: "getIsEnabledStreaming",
    });

    if (!isEnabledStreaming) return;

    const popup = document.querySelector(POPUP_MESSAGE_SELECTOR);
    const container = document.querySelector(CHAT_SELECTOR_OBJ.container);
    const thread = document.querySelector(CHAT_SELECTOR_OBJ.thread);

    const message =
      container && !container.classList.contains(CHAT_CLASS_OBJ.isHidden)
        ? extractMessageFromThread(thread)
        : extractMessageFromPopup(popup);

    if (!message) return;

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
