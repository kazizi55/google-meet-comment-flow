let prevThread: Node;

const CLASS_OBJ = {
  thread: "z38b6",
  message: "oIy2qc",
  isLoading: "gYckH",
} as const;

const observer = new MutationObserver(() => {
  try {
    const thread = document.getElementsByClassName(CLASS_OBJ.thread)[0];

    if (
      !thread ||
      thread.isEqualNode(prevThread) ||
      thread.getElementsByClassName(CLASS_OBJ.isLoading).length === 1
    )
      return;

    prevThread = thread.cloneNode(true);

    const messages = thread.getElementsByClassName(CLASS_OBJ.message);

    if (messages.length === 0) return;

    const message = messages[messages.length - 1].innerHTML;

    chrome.runtime.sendMessage({
      method: "setItem",
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
