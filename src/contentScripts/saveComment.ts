let prevThread: Node;

let prevPopupThread: Node;

const CHAT_SELECTOR_BASE =
  "#ow3 > div.T4LgNb > div > div[jsmodel='BA3Upd'] > div.crqnQb > div.R3Gmyc.qwU8Me > div:nth-child(2) > div.WUFI9b";

const CHAT_SELECTOR_OBJ = {
  container: CHAT_SELECTOR_BASE,
  thread: `${CHAT_SELECTOR_BASE} > div.hWX4r > div >div.hwhNhe >  div.z38b6`,
  message: `${CHAT_SELECTOR_BASE} > div.hWX4r > div >div.hwhNhe > div.z38b6 > div > div.Zmm6We > div`,
} as const;

const CHAT_CLASS_OBJ = {
  isHidden: "qdulke",
} as const;

const POPUP_SELECTOR_BASE =
  "#ow3 > div.T4LgNb > div > div[jsmodel='BA3Upd'] > div.crqnQb > div.fJsklc.nulMpf.Didmac.sOkDId";

const POPUP_SELECTOR_OBJ = {
  container: POPUP_SELECTOR_BASE,
  thread: `${POPUP_SELECTOR_BASE} > div.mIw6Bf.nTlZFe.P9KVBf`,
  message: `${POPUP_SELECTOR_BASE} > div.mIw6Bf.nTlZFe.P9KVBf > div.BQRwGe > div > div > button > div.ZuRxkd > div > div > div.LpG93b.xtO4Tc`,
} as const;

const extractMessageFromPopupThread = (
  popupThread: Element | null
): string | undefined => {
  if (!popupThread || popupThread.isEqualNode(prevPopupThread)) return;

  prevPopupThread = popupThread.cloneNode(true);

  const messageNodes = popupThread.querySelectorAll(POPUP_SELECTOR_OBJ.message);

  if (messageNodes.length === 0) return;

  const messageNode = messageNodes[messageNodes.length - 1];

  return messageNode.innerHTML;
};

const extractMessageFromThread = (
  thread: Element | null
): string | undefined => {
  if (!thread || thread.isEqualNode(prevThread)) return;

  prevThread = thread.cloneNode(true);

  const messageNodes = thread.querySelectorAll(CHAT_SELECTOR_OBJ.message);

  if (messageNodes.length === 0) return;

  const messageNode = messageNodes[messageNodes.length - 1];

  return messageNode.innerHTML;
};

const observer = new MutationObserver(async (mutations: MutationRecord[]) => {
  try {
    const addedNode = mutations[0].addedNodes?.[0];

    if (addedNode?.nodeType !== Node.ELEMENT_NODE) return;

    const isEnabledStreaming = await chrome.runtime.sendMessage({
      method: "getIsEnabledStreaming",
    });

    if (!isEnabledStreaming) return;

    const popupThread = document.querySelector(POPUP_SELECTOR_OBJ.thread);

    const container = document.querySelector(CHAT_SELECTOR_OBJ.container);
    const thread = document.querySelector(CHAT_SELECTOR_OBJ.thread);

    const message =
      container && !container.classList.contains(CHAT_CLASS_OBJ.isHidden)
        ? extractMessageFromThread(thread)
        : extractMessageFromPopupThread(popupThread);

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
