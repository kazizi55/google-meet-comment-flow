// FIXME
export {};

let prevThread: Node;

const CLASS_OBJ = {
  thread: "z38b6",
  message: "oIy2qc",
  isLoading: "gYckH",
} as const;

const observer = new MutationObserver(() => {
  try {
    const thread = document.getElementsByClassName(CLASS_OBJ.thread)[0];

    if (prevThread !== undefined && thread.isEqualNode(prevThread)) return;
    if (thread.getElementsByClassName(CLASS_OBJ.isLoading).length === 1) return;

    prevThread = thread.cloneNode(true);

    const messages = thread.getElementsByClassName(CLASS_OBJ.message);
    const message = messages[messages.length - 1].innerHTML;

    const screen = document.body;
    const screenHeight = screen.offsetHeight;
    const screenWidth = screen.offsetWidth;

    const comment = document.createElement("span");

    comment.textContent = message;
    document.body.appendChild(comment);

    const letterSize = screenHeight * 0.05 * 1;
    comment.setAttribute("class", "comment");

    const footerHeight = 88;
    const topPosition = Math.floor(
      (screenHeight - letterSize - footerHeight) * Math.random()
    );
    const commentStyle = {
      left: `${screenWidth}px`,
      top: `${topPosition}px`,
      fontSize: `${letterSize}px`,
    };

    comment.style["left"] = commentStyle["left"];
    comment.style["top"] = commentStyle["top"];
    comment.style["fontSize"] = commentStyle["fontSize"];
    comment.style["color"] = "white";
    comment.style["position"] = "absolute";
    comment.style["zIndex"] = "2147483647";
    comment.style["whiteSpace"] = "nowrap";
    comment.style["lineHeight"] = "initial";

    comment.animate(
      {
        left: `${-comment.offsetWidth}px`,
      },
      {
        duration: 6000,
        easing: "linear",
      }
    );
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
